import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoIdTokenPayload, CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import { cookies } from "next/dist/client/components/headers";
import verifier from "../cognito";

interface User {
  name: string,
  username: string,
  email: string,
  groups?: string[]
}

// TODO: Typesafe this route with a user object.
export async function getServerSession(): Promise<{
  user: User | null,
  isAuthenticated: boolean,
  error?: any,
}> {
  const token = cookies().get('idToken') ?? ''

  const ret = {
    user: null,
    isAuthenticated: false,
    error: null, 
  }

  if(!token) {
    return {
      ...ret,
      error: {
        status: 401,
        message: "No Token Specified"
      }
    }
  }

  try {
    const decodeTokenReq = decodeToken(token.value, "id")
    const tokenDecoded = await decodeTokenReq

    const res = {
      user: {
        name: tokenDecoded["name"],
        username: tokenDecoded["username"],
        email: tokenDecoded["email"],
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

type JWTDecodeResponse = CognitoIdTokenPayload & {
  name: string,
  username: string,
  email: string,
  groups: string
};


// interface JWTDecodeResponse extends CognitoIdTokenPayload, JsonObject {
//   // "cognito:groups": Array<string>
// }

export async function decodeToken(token: string, tokenUse: "id" | "access" = "id"): Promise<JWTDecodeResponse> {
  if(!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_CLIENT_ID)
    throw("No user pool ID or user pool ID configured")

  try {
    const payload = await verifier.verify(token) as JWTDecodeResponse;


    return payload
  } catch(err) {
    console.log(err);
    throw("Token is not valid")
  }
}

export async function decodeToken2(token: string) { 
  const jwk = await fetch("https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_XNxfV9r2F/.well-known/jwks.json");
  const res = await jwk.json()    
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