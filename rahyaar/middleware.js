import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const protectedRoutes = [
    "/user/profile",
    "/payment-success",
    "/tours/:path*/reserve",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.replace("/:path*", ""))
  );

  if (isProtected && !accessToken) {
    const url = new URL("/", request.url);
    url.searchParams.set("showLoginModal", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/profile", "/payment-success", "/tours/:path*/reserve"],
};
