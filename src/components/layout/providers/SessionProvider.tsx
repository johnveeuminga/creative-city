'use client'

import { SessionContext } from "@/lib/client/auth";
import React, { useEffect, useState } from "react"

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser(){
      const req = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`);

      const res = await req.json();

      setUser(res);
    }

    // getUser();
  }, []);

  return (
    <SessionContext.Provider value={{
      user
    }}>
      { children }
    </SessionContext.Provider>
  )
}
