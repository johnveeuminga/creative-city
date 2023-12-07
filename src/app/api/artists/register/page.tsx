import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try{
    const artist = await prisma.artist.create({
      data: req.body,
    })

    return NextResponse.json({ artist })
  } catch(err) {
    return NextResponse.json({ message: "Something went wrong"}, { status: 500 })
  }
}