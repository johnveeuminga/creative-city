import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(request: Request) {
    return new Promise(async (resolve) => {
        const artworks = await prisma.artwork.findMany();
        return resolve(NextResponse.json(artworks, {
            status: 200,
        }))
    });
}