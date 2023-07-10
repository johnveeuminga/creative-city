import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest, { params: { id } }: { params: { id: string }}) {
  const artist = await prisma.artist.findUnique({
    where: { id: Number(id) },
  }) 

  return NextResponse.json(artist)
}