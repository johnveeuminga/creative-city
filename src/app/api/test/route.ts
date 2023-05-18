import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(NextResponse.json('Test', {
        status: 200,
      }))
    }, 3000);
  });
}