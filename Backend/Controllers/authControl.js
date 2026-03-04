import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // ✅ Correct file name
import { registerSchema, loginSchema } from "../Validation/authValidation.js";

// ✅ Helper function to create JWT tokens
export const createToken = (payload, secret, expiry) => {
  return jwt.sign(payload, secret, { expiresIn: expiry });
};

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  try {
    console.log("Register Body Received:", req.body);

    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save()
      .then(() => console.log(" User saved successfully"))
      .catch(err => console.log(" Error saving user:", err));

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// ✅ LOGIN USER
export const loginUser = async (req, res) => {
  try {
    console.log("Login Body Received:", req.body);

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // DEMO MODE: WAF OFF → accept payload & redirect
    if (process.env.WAF_ENABLED === "false") {
      console.log("WAF OFF — demo login bypass");

      const accessToken = createToken(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        "15m"
      );

      const refreshToken = createToken(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        "7d"
      );

      return res.status(200).json({
        message: "Demo login successful (WAF OFF)",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    // 🔒 NORMAL AUTH (when WAF is ON)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = createToken(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      "15m"
    );

    const refreshToken = createToken(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      "7d"
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successful ✅",
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
