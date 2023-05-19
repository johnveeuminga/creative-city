import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.startsWith('/api')) {
    const reqHeaders = new Headers(request.headers);
    // reqHeaders.set('X-SAmple', 'sample',);
    reqHeaders.set('Access-Control-Allow-Methods', '*');
    reqHeaders.set('Access-Control-Allow-Headers', '*');

    const response = NextResponse.next({
      headers: reqHeaders,
    });

    return response;
  }
}