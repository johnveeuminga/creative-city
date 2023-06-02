import { NextResponse } from "next/server";

export function GET() {
  // Do DB stuff here.
  return NextResponse.json({
    data: [
      {
        id: 1,
        name: '#1'
      },
      {
        id: 2,
        name: '#2'
      },
      {
        id: 3,
        name: '#3',
      },
      {
        id: 4,
        name: '#4',
      }
    ],
  });
}

export function POST() {}

export function PATCH() {}