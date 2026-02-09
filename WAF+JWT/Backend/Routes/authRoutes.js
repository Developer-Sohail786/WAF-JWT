import express from "express";
import { registerUser, loginUser } from "../Controllers/authControl.js";
import { handleRefreshToken } from "../Controllers/refrshTokenController.js";
import { handleLogout } from "../Controllers/logoutControl.js";

const router = express.Router();

// test route
router.get("/test", (req, res) => {
  res.send("Auth route working ✅");
});

router.post(
  "/register",
  (req, res, next) => {
    console.log("Register route hit ✅");
    next();
  },
  registerUser
);

router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.delete("/logout", handleLogout);

export default router;
