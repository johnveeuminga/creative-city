import { NextResponse } from "next/server"

export async function GET() {
  const cognitoRedirectUrl = process.env.COGNITO_REDIRECT_URL;
  const cognitoAppId = process.env.COGNITO_CLIENT_ID;
  const cognitoBaseUrl = process.env.COGNITO_BASE_URL;

  if(!cognitoRedirectUrl || !cognitoAppId || !cognitoBaseUrl)
    return NextResponse.json({
      message: 'Unable to find Cognito Redirect URL or Cognito APP Id in env'
    }, {
      status: 500
    });

  const accountsUrl = buildUrl(
    'login', 
    {
      cognitoAppId,
      cognitoBaseUrl,
      cognitoRedirectUrl,
    }
  )

  return NextResponse.redirect(accountsUrl);
}

export function buildUrl(endpoint: string, {
  cognitoRedirectUrl,
  cognitoAppId,
  cognitoBaseUrl,
}: {
  cognitoRedirectUrl: string,
  cognitoAppId: string,
  cognitoBaseUrl: string,
}): string {
  const redirect_uri = encodeURIComponent(cognitoRedirectUrl);

  return `${cognitoBaseUrl}/${endpoint}?response_type=code&client_id=${cognitoAppId}&redirect_uri=${redirect_uri}`;
}