import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken');
  console.log(token)

  if(!token) 
    return NextResponse.json('Unauthorized', { status: 401 });

  try {
    const req = await fetch(`${process.env.COGNITO_BASE_URL}/oauth2/userInfo`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    const res = await req.json();
    console.log(res);

    return NextResponse.json(res);
  } catch(err) {
    console.log(err);
    return NextResponse.json('Unauthorized', { status: 401 })
  }
}