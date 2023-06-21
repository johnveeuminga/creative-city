import { 
  ApolloClient, 
  HttpLink, 
  InMemoryCache, 
  NormalizedCacheObject, 
  concat,
} from "@apollo/client";
import React from "react";

export function registerApolloClient() {
  const getClient = React.cache(makeClient)

  return {
    getClient
  }
}

function makeClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://lpnq5n3ynzehbl5qy7kes4zeoe.appsync-api.ap-southeast-1.amazonaws.com/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
}


export const { getClient } = registerApolloClient();