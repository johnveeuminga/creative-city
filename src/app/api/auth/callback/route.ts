import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if(!code)
    return NextResponse.json('No code specified', {
      status: 400
    });

  try {
    const res: AuthCallbackResponse = await getTokenFromCode(code);

    // todo: cognitoId, search @ Users table if not create()

    let response = NextResponse.redirect(process.env.APP_URL ?? "");
    response.cookies.set(
      'authToken', 
      res.access_token, 
      {
        httpOnly: true,
      }
    );
    response.cookies.set(
      'refreshToken', 
      res.refresh_token,
      {
        httpOnly: true,
      }
    );
    response.cookies.set(
      'idToken',
      res.id_token,
    )

    return response;
  } catch (error) {
    console.log(error, 'here')
    return NextResponse.json('Error', {
      status: 500,
    });
  }
}

async function getTokenFromCode(code: string): Promise<AuthCallbackResponse> {
  const authString = `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`;

  const req = await fetch(`${process.env.COGNITO_BASE_URL}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(authString).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: process.env.COGNITO_CLIENT_ID ?? '',
      redirect_uri: process.env.COGNITO_REDIRECT_URL ?? '',
    }),
  });

  const {
    access_token,
    refresh_token,
    id_token,
  } = await req.json();

  return {
    access_token,
    refresh_token,
    id_token,
  }
}

interface AuthCallbackResponse {
  access_token: string,
  refresh_token: string,
  id_token: string,
}