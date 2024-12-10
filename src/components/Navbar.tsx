"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { logoutUser } from "@/actions/user";

const Header = () => {
  const pathName = usePathname();
  const isActive = (path: string) =>
    pathName === path
      ? "text-blue-500 font-semibold"
      : "text-gray-600 hover:text-gray-400 focus:outline-none";

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <Link
          href="#"
          className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
          aria-label="Brand"
        >
          Brand
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {/* login and register link here */}
          <div className="Auth_Links flex flex-row items-center gap-5">
            <Link
              href="/login"
              className={`font-medium focus:outline-none ${isActive("/login")}`}
              aria-current="page"
            >
              login
            </Link>
            <Link
              href="/register"
              className={`font-medium focus:outline-none ${isActive(
                "/register"
              )}`}
            >
              register
            </Link>
          </div>
          {/* dashboard links are here */}
          <div className="Private_Link flex flex-row items-center gap-5">
            <Link
              href="/dashboard"
              className={`font-medium focus:outline-none ${isActive(
                "/dashboard"
              )}`}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={`font-medium focus:outline-none ${isActive(
                "/settings"
              )}`}
            >
              settings
            </Link>
            <form action={logoutUser}>
              <Button type="submit" variant={"ghost"}>
                logout
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
