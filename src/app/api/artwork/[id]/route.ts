import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, {
  params: {
    id
  }
}: { 
  params: { 
    id: string 
  }
}) {
  // DO DB STUFF HERE
  return NextResponse.json({
    data: {
      id
    }
  })
}

export function POST(req: NextRequest) {
}