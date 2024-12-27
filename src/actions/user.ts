"use server";

import { signIn, signOut } from "@/auth";
import dbConnect from "@/lib/db";
import { User } from "@/models/user.model";
import { loginSchema, registrationSchema } from "@/schema/validationSchema";
import bcrypt from "bcryptjs";
import { FieldValues } from "react-hook-form";

// register for user
const registerUser = async (formData: FieldValues) => {
  try {
    // API data validation
    const Result = registrationSchema.safeParse(formData);
    if (!Result.success) {
      const errorMessages = Result.error.issues
        .map((issue) => `${issue.message}`)
        .join("\n");
      throw new Error(errorMessages);
    }

    const { userName, email, password } = formData;
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
const login = async (formData: FieldValues) => {
  try {
    const Result = loginSchema.safeParse(formData);
    if (!Result.success) {
      const errorMessages = Result.error.issues
        .map((issue) => `${issue.message}`)
        .join("\n");
      throw new Error(errorMessages);
    }

    const { email, password } = formData;

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/dashboard",
      email,
      password,
    });

    return { message: "User logged successfully", status: 200 };
  } catch (error: any) {
    throw new Error(
      error?.cause?.err || error.message || "internal server error"
    );
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
