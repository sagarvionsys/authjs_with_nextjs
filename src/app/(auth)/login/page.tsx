/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { login } from "@/actions/user";
import { signIn } from "@/auth";
import useGetSession from "@/lib/useGetSession";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await useGetSession();
  if (session?.user) redirect("/dashboard");

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-[20rem] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold py-3">Welcome to Login Page</h1>
        <form action={login}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email address"
              type="email"
              name="email"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
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
              placeholder="**********"
              type="password"
              name="password"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <Button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
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
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <button className="gap-2 justify-center w-full items-center flex hover:bg-gray-200  bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white ">
                <FaGoogle size={25} />
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
          {/* github btn */}
          <div>
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/dashboard" });
              }}
            >
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
