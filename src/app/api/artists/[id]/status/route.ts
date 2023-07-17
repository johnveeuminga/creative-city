import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string }}) {
  const {
    status
  } = await req.json();

  try {
    const updatedArtist = await prisma.artist.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(updatedArtist);
  } catch (error) {
    return NextResponse.json("An error occurred while updating the artist status", { status: 500 });
  }
}