import SessionProvider from "@/app/layout/providers/SessionProvider";
import React from "react";

export const SessionContext = React.createContext({
  user: null,
})

export function useSession() {
  const value = React.useContext(SessionContext);

  return value;
}