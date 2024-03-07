import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


// This function can be marked async if using await inside
export function middleware(request) {
  let cookie = request.cookies.get("chat_token");
 
  const decodeCookie = cookie?.value ? jwtDecode(cookie?.value) : {}
  console.log("Token", cookie,decodeCookie);

//   if(!cookie){
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   if(cookie && !decodeCookie?.emailVerified){
//     return NextResponse.redirect(new URL("/email-otp", request.url));
//   }
//   if(cookie && decodeCookie?.emailVerified){
//     return NextResponse.redirect(new URL("/signup", request.url));
//   }
  

 
  //   if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
  //     console.log("Redirecting to login");

  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
