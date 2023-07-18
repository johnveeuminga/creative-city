import { cookies } from "next/headers";
import prisma from "../prisma";
import { decodeToken } from "./cognito";

export interface User {
  id: string;
  name: string,
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
    const tokenDecoded = await decodeToken(token.value, "id")
    const user = await prisma.user.findFirst({
      where: {
        cognitoId: tokenDecoded.sub,
      }
    })

    if(!user)
      throw new Error("User not found")
      
    const res  = {
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
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

export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const idToken = req.cookies.get('idToken')

  if(!idToken || !idToken.value)
    return false

  try {
    await decodeToken(idToken.value, "id")

    return true
  } catch {
    return false
  }
}