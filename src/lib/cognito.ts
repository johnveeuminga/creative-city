import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoJwtVerifierSingleUserPool, CognitoVerifyProperties } from "aws-jwt-verify/cognito-verifier";
import { JwkWithKid, Jwks } from "aws-jwt-verify/jwk";

const userPoolId = process.env.COGNITO_USER_POOL_ID;
const clientId = process.env.COGNITO_CLIENT_ID;



if(!userPoolId || !clientId)
  throw("COGNITO ENV VARIABLES MISSING")

interface CognitoJwtVerifierSingleUserPoolProps extends Partial<CognitoVerifyProperties> {
  userPoolId: string,
  tokenUse: null,
  clientId: string,
}

let verifier: CognitoJwtVerifierSingleUserPool<CognitoJwtVerifierSingleUserPoolProps>;

if (process.env.NODE_ENV === "production") {
  verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: null,
      clientId,
    }, 
    )
} else {
  let globalWithVerifier = global as typeof globalThis & {
    verifier: CognitoJwtVerifierSingleUserPool<CognitoJwtVerifierSingleUserPoolProps>;
  };
  if (!globalWithVerifier.verifier) {
    globalWithVerifier.verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: null,
      clientId,
    }, 
    );
  }

  verifier = globalWithVerifier.verifier;
}

export default verifier;