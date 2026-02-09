import jwt from "jsonwebtoken";
import user from "../models/user.js";
import bcrypt from "bcrypt";
// Ensure this import path is correct based on your file structure
import { createToken } from "./authControl.js";

// helper function, compares raw token with hashed version
const compareTokens = async (rawToken, hashedToken) => {
  // looping through all refresh tokens
  for (const tokenRecord of hashedToken) {
    // using bcrypt to check if they matches
    const match = await bcrypt.compare(rawToken, tokenRecord.token);
    if (match) {
      return {
        match: true,
        tokenRecord,
      };
    }
  }
  return { match: false, tokenRecord: null };
};

// refreshTokens
export const handleRefreshToken = async (req, res) => {
  // ⭐ FIX: Get the refresh token from the request BODY (sent by frontend interceptor)
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "No refresh token provided in request body." });
  }

  console.log("refresh token received from request body", refreshToken);

  // NOTE: Removed all res.clearCookie and res.cookie logic to align with
  // the frontend's use of localStorage for refresh token transport.

  try {
    // 1. Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const foundUser = await user.findById(decoded.userId);
    if (!foundUser) {
      return res
        .status(403)
        .json({ message: "User not found or something went wrong" });
    } // 2. Compare unhashed refresh token with DB's hashed token

    const matchResult = await compareTokens(
      refreshToken,
      foundUser.refreshTokens
    );
    // token theft detected then wipe all tokens for security
    if (!matchResult.match) {
      console.log(
        "mismatched tokens, wiping all refresh tokens for the user",
        foundUser._id
      );
      foundUser.refreshTokens = [];
      await foundUser.save();
      return res.status(403).json({ message: "Refresh token invalidated" });
    }

    // --- SUCCESS PATH: Atomic Deletion and Addition ---

    // 3. ATOMIC DELETION ($pull): Instantly removes the used token hash from the database.
    await user.findOneAndUpdate(
      { _id: foundUser._id },
      { $pull: { refreshTokens: { token: matchResult.tokenRecord.token } } },
      { new: true }
    ); // 4. Generate NEW access and refresh token

    const payload = { userId: foundUser._id };
    // generating new access tokens
    const newAccessToken = createToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRY
    );
    const newRefreshToken = createToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRY
    );
    // 5. Hash and save the new refresh token in the DB
    const saltRounds = 10;
    const hashedNewRefreshToken = await bcrypt.hash(
      newRefreshToken,
      saltRounds
    );
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // ATOMIC ADDITION ($push): Instantly adds the new token hash to the database.
    await user.findByIdAndUpdate(foundUser._id, {
      $push: {
        refreshTokens: {
          token: hashedNewRefreshToken,
          expiresAt: refreshTokenExpiry,
        },
      },
    });
    // 6. Send the new access token back to the user
    res.status(200).json({
      message: "Token refreshed sucessfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken, // Send the new refresh token back so the frontend can update localStorage
    });
  } catch (error) {
    console.log("refresh token error:", error.message);
    return res.status(403).json({ message: "invalid refresh token." });
  }
};
