import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; // FIX: Check if header is missing OR does NOT start with "Bearer " (with space)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided or malformed." });
  } // FIX: Extract the token by splitting on the space character (" ")
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    // Token is invalid, expired, or corrupted
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;
