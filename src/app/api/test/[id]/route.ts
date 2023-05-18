import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  } : {
    params: { id: string }
  }
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(NextResponse.json({
        data: {
          id: params.id,
        }
      }, {
        status: 200,
      }))
    }, 3000);
  });
}