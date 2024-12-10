"use server";

import { signIn, signOut } from "@/auth";
import dbConnect from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";

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

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    console.log(user);
  } catch (error) {
    console.log("error while registering user", error);
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
    console.log("user logged successfully");
  } catch (error) {
    const Error = error as CredentialsSignin;
    console.log(Error.cause);
  }
};

const logoutUser = async () => {
  await signOut();
};
export { registerUser, login, logoutUser };
