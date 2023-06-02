import React, { Fragment, useState } from "react";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";
import { getServerSession } from "@/lib/server/auth";
import { useSession } from "@/lib/client/auth";

function Header({ header }: any) {
  // const user = await getServerSession();

  const getHeader = () => {
    switch (header) {
      case 1:
        // @ts-expect-error Server Component
        return <Header1 />;
      case 2:
        return <Header2 />;
      case 3:
        return <Header3 />;

      default:
        // @ts-expect-error Server Component
        return <Header1 />;
    }
  };
  return <Fragment>{getHeader()}</Fragment>;
};
export default Header;
