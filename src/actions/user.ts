"use server";

import { signIn, signOut } from "@/auth";
import dbConnect from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

// register for user
const registerUser = async (formData: FormData) => {
  try {
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!userName || !email || !password)
      throw new Error("All fields are required");

    await dbConnect();

    const isUserExists = await User.findOne({ email });
    if (isUserExists) throw new Error("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return { message: "User registered successfully", status: 200 };
  } catch (error: any) {
    console.error("Error while registering user", error);
    throw new Error(error.message || "Internal Server Error");
  }
};

// login for user
const login = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) throw new Error("Email and password are required");

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email,
      password,
    });

    return { message: "User logged successfully", status: 200 };
  } catch (error: any) {
    // const error = err as CredentialsSignin;
    throw new Error(error?.cause?.err || "Internal Server Error");
  }
};

// logout for user
const logoutUser = async () => {
  await signOut({ redirectTo: "/login" });
};

// handle oAuth login
const oAuthLogin = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};

export { registerUser, login, logoutUser, oAuthLogin };
