import { 
  ApolloClient, 
  ApolloLink, 
  HttpLink, 
  InMemoryCache, 
  NormalizedCacheObject, 
  concat,
} from "@apollo/client";
import { cookies } from "next/headers";
import React from "react";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = cookies().get('idToken');
  if(token && token.value) {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token.value}` : "",
      },
    });
  }
  return forward(operation);
});

export function registerApolloClient() {
  const getClient = React.cache(makeClient)

  return {
    getClient
  }
}

function makeClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, new HttpLink({
      uri: "https://lpnq5n3ynzehbl5qy7kes4zeoe.appsync-api.ap-southeast-1.amazonaws.com/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    })),
  });
}


export const { getClient } = registerApolloClient();