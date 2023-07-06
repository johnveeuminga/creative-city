import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./lib/server/auth";

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
    const cookieToken = request.cookies.get('idToken');

    if(!cookieToken || !cookieToken.value)
      return NextResponse.redirect(process.env.APP_URL ?? "/")

    try {
      await decodeToken(cookieToken.value)

      return NextResponse.next();
    } catch(err) {
      const response = NextResponse.redirect(process.env.APP_URL ?? "/");
      response.cookies.set('authToken', '');
      response.cookies.set('refreshToken', '');
      response.cookies.set('idToken', '');
      return response;
    }
  }
}