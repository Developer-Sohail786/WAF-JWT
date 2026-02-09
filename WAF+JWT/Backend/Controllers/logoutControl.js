import user from "../models/user.js";

export const handleLogout = async (req, res) => {
    // 1. Check for the refresh token cookie
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.sendStatus(204); 
    }

    const refreshToken = cookies.refreshToken;

    // --- FIX IS HERE: Finding the user whose refresh token is in the DB ---
    const userToLogout = await user.findOne({
        "refreshTokens.token": refreshToken // Find the user whose tokens array contains this exact (unhashed) token.
    });

    if (userToLogout) {
        // 3. Remove the token hash from the database using the atomic $pull operator
        await user.findOneAndUpdate(
            { _id: userToLogout._id },
            // $pull removes the entire object from the array that matches the refreshToken's value
            { $pull: { refreshTokens: { token: refreshToken } } }, 
            { new: true }
        );
    }
    
    // 4. Clear the cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        path: "/api/auth", 
    });

    // 5. Send success response (204 No Content is standard for successful deletion/clear)
    res.sendStatus(204);
};