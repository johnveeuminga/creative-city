import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  } : {
    params: { id: string }
  }
) {
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(params.id),
    }
  });

  return NextResponse.json(user, {
    status: 200,
  });
}