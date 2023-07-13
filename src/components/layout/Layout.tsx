import React, { Fragment, useEffect } from "react";
import ShopHeader from "./headers/ShopHeader";
import ShopFooter from "./ShopFooter";

const Layout = ({ children, header } : {
  children?: any,
  header?: any,
}) => {
  // useEffect(() => {
  //   animation();
  //   niceSelect();
  //   activeNavMenu();
  //   window.addEventListener("scroll", stickyNav);
  // }, []);


  return (
    <Fragment>
      {/* <ImageView />
      <MobileMenu />
      <Header2 />
      {children} 
      <Footer />
      <ScrollTop /> */}
      <ShopHeader />
        <div className="shop-content">
          { children }
        </div> 
      <ShopFooter />
    </Fragment>
  );
};

export default Layout;
