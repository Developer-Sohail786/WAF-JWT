import express from "express";

import verifyToken from "../Middleware/authMiddle.js"; // Secure the route

import { getUserInfo } from "../Controllers/userController.js"; // The controller function

const router = express.Router();

router.get("/me", verifyToken, getUserInfo);

export default router;
