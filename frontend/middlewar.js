import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// This function can be marked async if using await inside
export function middleware(request) {
  let cookie = request.cookies.get("chat_token");

  const decodeCookie = cookie?.value ? jwtDecode(cookie?.value) : {};
  console.log("Token", cookie, decodeCookie);

  console.log(request.nextUrl);
  if (request.nextUrl.pathname.endsWith(".css")) {
    return;
  }

  if (
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/signup" &&
    request.nextUrl.pathname !== "/email-otp"
  ) {
    console.log("any url");
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (cookie && !decodeCookie?.emailVerified) {
      return NextResponse.redirect(new URL("/email-otp", request.url));
    }
   
  }

  if (request.nextUrl.pathname === "/login") {
    console.log("hey")
    if (cookie && !decodeCookie?.emailVerified) {
      return NextResponse.redirect(new URL("/email-otp", request.url));
    } else if (cookie && decodeCookie?.emailVerified) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  } else if (request.nextUrl.pathname === "/email-otp") {
    console.log("hete");
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (cookie && decodeCookie?.emailVerified) {
      return NextResponse.redirect(new URL("/", request.url));
    }
   
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
