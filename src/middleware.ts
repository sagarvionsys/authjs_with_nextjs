export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoutes = ["/dashboard", "/settings"];
const isPublicRoutes = ["/login", "/register"];
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  //   not logged in and trying to access protected routes, then redirect to login page
  if (!token && isProtectedRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   logged in and trying to access public routes, then redirect to dashboard page
  if (token && isPublicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/settings", "/login", "/register"],
};
