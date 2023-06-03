import React, { Fragment } from "react";
import ImageView from "../ImageView";
import { activeNavMenu, animation, niceSelect, stickyNav } from "../../lib/utils";
import Footer from "./Footer";
import Header from "./headers/Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";
import Header2 from "./headers/Header2";

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
      <ImageView />
      <MobileMenu />
      {/* @ts-expect-error Async Server Component */}
      <Header2 />
      {children} 
      <Footer />
      <ScrollTop />
    </Fragment>
  );
};

export default Layout;
