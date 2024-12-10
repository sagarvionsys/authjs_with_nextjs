/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import bcrypt from "bcryptjs";
import dbConnect from "./db";
import { User } from "@/models/user.model";

export const validateUser = async (credentials: any) => {
  try {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    await dbConnect();
    const user = await User.findOne({ email }).select("+password +role");
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }
    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return {
      _id: user?._id || "",
      image: user?.image || "",
      name: user?.userName || "",
      email: user?.email || "",
      role: user?.role || "",
    };
  } catch (error: any) {
    throw new Error(error.message || "Authentication failed");
  }
};
