'use client';

import React, { Fragment, useEffect, useState } from "react";
import ImageView from "../../components/ImageView";
import { activeNavMenu, animation, niceSelect, stickyNav } from "../../lib/utils";
import Footer from "./Footer";
import Header from "./headers/Header";
import MobileMenu from "./MobileMenu";
import ScrollTop from "./ScrollTop";

const Layout = ({ children, header } : {
  children?: any,
  header?: any,
}) => {
  useEffect(() => {
    animation();
    niceSelect();
    activeNavMenu();
    window.addEventListener("scroll", stickyNav);
  }, []);

  const [state, setState] = useState();

  return (
    <Fragment>
      <ImageView />
      <MobileMenu />
      <Header header={header} />
      {children} 
      <Footer />
      <ScrollTop />
    </Fragment>
  );
};

export default Layout;
