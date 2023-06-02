import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import { cookies } from "next/dist/client/components/headers";

// TODO: Typesafe this route with a user object.
export async function getServerSession() {
  const token = cookies().get('authToken') ?? ''

  const ret = {
    user: null,
    isAuthenticated: false,
  }

  if(!token)
    return ret

  try {
    const userInfoReq =  fetch(`${process.env.COGNITO_BASE_URL}/oauth2/userInfo`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    const decodeTokenReq = decodeToken(token.value, "access")

    const [userInfoRes, tokenDecoded] = await Promise.all([userInfoReq, decodeTokenReq])
    const userInfo = await userInfoRes.json();

    const res = {
      user: {
        ...userInfo,
        groups: tokenDecoded['cognito:groups'] ?? [],
      }, 
      isAuthenticated: true,
    }

    return res
  } catch(err) {
    const res = {
      user: null,
      isAuthenticated: false,
    }

    return res
  }
}

export async function decodeToken(token: string, tokenUse: "id" | "access" = "id"): Promise<CognitoJwtPayload> {
  if(!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_CLIENT_ID)
    throw("No user pool ID or user pool ID configured")

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse,
    clientId: process.env.COGNITO_CLIENT_ID,
  })

  try {
    const payload = await verifier.verify(token);

    return payload
  } catch {
    throw("Token is not valid")
  }
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