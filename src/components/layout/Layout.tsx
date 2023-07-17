import React, { Fragment, useEffect } from "react";
import ShopHeader from "./headers/ShopHeader";
import ShopFooter from "./ShopFooter";

const Layout = ({ children, header } : {
  children?: any,
  header?: any,
}) => {
  return (
    <Fragment>
      <ShopHeader />
      <div className="shop-content">
        { children }
      </div> 
      <ShopFooter />
    </Fragment>
  );
};

export default Layout;
