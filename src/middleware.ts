import { NextRequest, NextResponse } from "next/server";
import { decodeToken, isAuthenticated } from "./lib/server/auth";

export async function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/api')) {
    const reqHeaders = new Headers(request.headers);
    reqHeaders.set('Access-Control-Allow-Origin', '*');
    reqHeaders.set('Access-Control-Allow-Methods', '*');
    reqHeaders.set('Access-Control-Allow-Headers', '*');

    const response = NextResponse.next({
      headers: reqHeaders,
    });

    return response;
  } else if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authenticated = await isAuthenticated(request)

    if(authenticated)
      return NextResponse.redirect("/")
  }

  return NextResponse.next();
}