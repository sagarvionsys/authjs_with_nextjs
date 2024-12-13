import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    image: {
      type: String,
      default: "",
    },
    authProviderId: {
      type: String,
      default: "",
    },
    authProviderName: {
      type: String,
      enum: ["google", "github", "credentials"],
      default: "credentials",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
