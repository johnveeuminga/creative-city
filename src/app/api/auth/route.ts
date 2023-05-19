import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({

  });

  return NextResponse.json(users, {
    status: 200,
  });
}
export async function POST() {}
export async function DELETE() {}