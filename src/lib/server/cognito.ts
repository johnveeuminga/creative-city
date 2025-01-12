import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";

export type JWTDecodeResponse = CognitoIdTokenPayload & {
  name: string,
  username: string,
  email: string,
  groups: string
};


export async function decodeToken(token: string, tokenUse: "id" | "access" = "id"): Promise<JWTDecodeResponse> {
  if(!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_CLIENT_ID)
    throw("No user pool ID or user pool ID configured")

  
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if(!userPoolId || !clientId)
    throw("COGNITO ENV VARIABLES MISSING")

  const verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse,
      clientId,
    }, 
  )

  try {
    const payload = await verifier.verify(token) as JWTDecodeResponse;

    return payload
  } catch(err) {
    console.log(err);
    throw("Token is not valid")
  }
}