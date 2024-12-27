/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { FaGithub } from "react-icons/fa";
import useLoginUser from "@/features/useLoginUser";
import { oAuthLogin } from "@/actions/user";
import { FieldValues, useForm } from "react-hook-form";
import InputErrorField from "@/components/InputErrorField";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/validationSchema";

const LoginPage = () => {
  const { loginUser, loginUserPending } = useLoginUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const loginUserHandle = (data: FieldValues) => {
    loginUser(data);
    reset();
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-[20rem] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold py-3">Welcome to Login Page</h1>
        <form onSubmit={handleSubmit(loginUserHandle)}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="Enter your email address"
              type="email"
              name="email"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
            <InputErrorField error={errors?.email} />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </Label>
            <Input
              id="password"
              {...register("password")}
              placeholder="**********"
              type="password"
              name="password"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
            <InputErrorField error={errors?.password} />
          </div>

          <Button
            disabled={isSubmitting || loginUserPending}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loginUserPending ? "Loading..." : "Login"}
          </Button>
        </form>
        <p className="py-2 text-sm">
          Don&lsquo;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        <div className="social_link_btn flex flex-col gap-2">
          {/* google btn */}
          <div>
            <form action={() => oAuthLogin("google")}>
              <button className="gap-2 justify-center w-full items-center flex hover:bg-gray-200  bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white ">
                <FaGoogle size={25} />
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
          {/* github btn */}
          <div>
            <form action={() => oAuthLogin("github")}>
              <button
                type="submit"
                className=" gap-2 justify-center w-full items-center flex hover:bg-gray-200   bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white "
              >
                <FaGithub size={25} />
                <span>Continue with GitHub</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
