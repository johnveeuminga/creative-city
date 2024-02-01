import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const artworks = await prisma.artwork.findMany();

  return NextResponse.json(artworks, { 
    status: 200
  });
}