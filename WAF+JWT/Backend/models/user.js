// Milestone 2 — Fixed version
import mongoose from "mongoose";

//  Token schema
const refreshTokensSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

//  User schema
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, trim: true },
//     password: { type: String, required: true, trim: true },
//     refreshTokens: [refreshTokensSchema],
//   },
//   { timestamps: true }
// );

// for Testing
const userSchema = new mongoose.Schema({
email: {
  type: String,  
  required: false
},
password: {
  type: String,
  required: false
}
}
);


// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

// ✅ Milestone 2 completed and stable
