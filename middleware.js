export const runtime = "nodejs";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Only public route is /login
  const publicPaths = ["/login"];
  const protectedPaths = ["/dashboard", "/register"];

  const isPublic = publicPaths.some((route) => pathname.startsWith(route));
  const isProtected = protectedPaths.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ Handle root "/" route — redirect based on login status
  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // ✅ Not logged in and tries protected page
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Logged in and tries to go to /login again
  if (session && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Role-based access control
  if (session) {
    const role = session.user?.role;

    if (role === "EMPLOYEE") {
      // Restrict employee from settings or register
      if (
        pathname.startsWith("/dashboard/setting") ||
        pathname.startsWith("/register")
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  // ✅ Otherwise allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
