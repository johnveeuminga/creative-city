import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = NextResponse.redirect(process.env.APP_URL ?? "");

  response.cookies.set('authToken', '');
  response.cookies.set('refreshToken', '');
  response.cookies.set('idToken', '');

  return response;
}