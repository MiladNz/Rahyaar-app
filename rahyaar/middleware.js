import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const paymentSuccess = request.cookies.get("payment_success")?.value;

  const protectedRoutes = [
    "/user/profile",
    "/payment-success",
    "/tours/:path*/reserve",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.replace("/:path*", ""))
  );

  if (
    isProtected &&
    !accessToken &&
    !request.nextUrl.pathname.startsWith("/payment-success")
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith("/payment-success")) {
    if (!paymentSuccess) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const paymentData = JSON.parse(paymentSuccess);
      const paymentTime = new Date(paymentData.timestamp);
      const currentTime = new Date();
      const timeDiff = (currentTime - paymentTime) / (1000 * 60);

      if (timeDiff > 10) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("payment_success");
        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("payment_success");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/profile", "/payment-success", "/tours/:path*/reserve"],
};
