import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  image: { type: String },
  authProviderId: { type: String },
});
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
