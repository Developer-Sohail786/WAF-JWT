import user from "../models/user.js";

// This function assumes the verifyToken middleware has successfully
// attached the decoded userId to req.user.
export const getUserInfo = async (req, res) => {
    try {
        // req.user contains the ID set by authMiddle.js (the verified user ID)
        // .select("-password -refreshTokens") ensures sensitive data is never sent
        const foundUser = await user.findById(req.user).select("-password -refreshTokens"); 
        
        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send back a clean user object (username, email, id)
        // The frontend (Dashboard.jsx) expects response.data.user
        res.status(200).json({ 
            message: "User data retrieved successfully.",
            user: {
                id: foundUser._id,
                username: foundUser.name,
                email: foundUser.email
            }
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Internal server error during data retrieval." });
    }
};
