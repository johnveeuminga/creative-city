import React, { Fragment } from "react";
import ImageView from "../ImageView";
import { activeNavMenu, animation, niceSelect, stickyNav } from "../../lib/utils";
import Footer from "./Footer";
import Header from "./headers/Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";
import Header2 from "./headers/Header2";
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
      { children }
      <ShopFooter />
    </Fragment>
  );
};

export default Layout;
