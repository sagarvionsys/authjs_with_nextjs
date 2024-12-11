"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useRegisterUser from "@/features/useRegisterUser";

const RegisterPage = () => {
  const { registerUser, registerUserPending } = useRegisterUser();

  // handle register user
  const registerUserHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    registerUser(formData, {
      onSettled: () => {
        form.reset();
      },
    });
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-[20rem] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold py-3">
          Welcome to Register Page
        </h1>
        <form onSubmit={registerUserHandle}>
          <div className="mb-4">
            <Label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-800"
            >
              user name
            </Label>
            <Input
              id="userName"
              placeholder="Enter your User Name"
              type="text"
              name="userName"
              className="mt-1 w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
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
          <div className="flex items-center space-x-2 py-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>

          <Button
            disabled={registerUserPending}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {registerUserPending ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="py-2 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
