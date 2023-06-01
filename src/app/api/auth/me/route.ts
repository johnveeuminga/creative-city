import { decodeToken, getServerSession } from '@/lib/server/auth';
import { cookies } from 'next/dist/client/components/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const user = await getServerSession();

    if(!user?.isAuthenticated) {
      throw('Unauthorized')
    }

    return NextResponse.json(user)
  } catch(err) {
    console.log(err)
    return NextResponse.json('Unauthorized', { status: 401 })
  }
}