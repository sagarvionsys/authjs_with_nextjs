import { auth } from "@/auth";

const routes = {
  protected: ["/dashboard", "/settings"],
  public: ["/login", "/register"],
};

export default auth((req) => {
  const { auth: isAuthenticated, nextUrl } = req;
  const { pathname, origin } = nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && routes.protected.includes(pathname)) {
    return Response.redirect(new URL("/login", origin));
  }
  // Redirect authenticated users trying to access public routes
  if (isAuthenticated && routes.public.includes(pathname)) {
    return Response.redirect(new URL("/dashboard", origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
