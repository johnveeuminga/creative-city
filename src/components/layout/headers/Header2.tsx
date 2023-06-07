import Link from "next/link";
import React from "react";
import { About, Blog, Contact, Home, Listing, Pages } from "../Menu";
import { getServerSession } from "@/lib/server/auth";
import UserAvatar from "@/components/UserAvatar";

const Header2 = async () => {
  const session = await getServerSession("Header2");
  // const session = {
  //   user: {
  //     name: "John Vee Uminga",
  //     groups: [
  //       "artist",
  //     ]
  //   },
  //   isAuthenticated: true,
  // }
  return (
    <header className="header-area header-area-two d-none d-xl-block">
      <div className="header-navigation">
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="row align-items-center">
              <div className="col-lg-2 col-5">
                <div className="site-branding">
                  <Link href="/" className="brand-logo">
                    Creative City
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-2">
                <div className="nav-menu">
                  <div className="navbar-close">
                    <i className="ti-close"></i>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      <li className="menu-item has-children">
                        <Link href="/">
                          Home
                        </Link>
                        <ul className="sub-menu">
                          <Home />
                        </ul>
                        <span className="dd-trigger">
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <About />
                      <li className="menu-item has-children">
                        <a href="#">Listings</a>
                        <ul className="sub-menu">
                          <Listing />
                        </ul>
                        <span className="dd-trigger">
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <a href="#">Pages</a>
                        <ul className="sub-menu">
                          <Pages />
                        </ul>
                        <span className="dd-trigger">
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <li className="menu-item has-children">
                        <a href="#">Article</a>
                        <ul className="sub-menu">
                          <Blog />
                        </ul>
                        <span className="dd-trigger">
                          <i className="ti-arrow-down"></i>
                        </span>
                      </li>
                      <Contact />
                      { session.user  &&
                        <li className="nav-btn">
                          <Link href="/add-listing" className="main-btn icon-btn">
                            Add Listing
                          </Link>
                        </li>
                      }
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4 col-5">
                <div className="header-right-nav">
                  <ul className="d-flex align-items-center">
                    {
                      !session.user &&
                        <li className="user-btn">
                          <Link href="/api/auth/login" className="icon" prefetch={false}>
                            <i className="flaticon-avatar"></i>
                          </Link>
                        </li>
                    }
                    {
                      session.user &&
                        <li className="user-btn">
                          <Link href="/dashboard" className="avatar" prefetch={false}>
                            <UserAvatar 
                              size="54"
                              user={session.user}/>
                          </Link>
                        </li> 
                    }
                    <li className="hero-nav-btn">
                    { session.user  && session?.user?.groups?.indexOf('artist') !== -1 && 
                      <Link href="/add-listing" className="main-btn icon-btn">
                        Add Listing
                      </Link>
                    }
                    </li>
                    <li className="nav-toggle-btn">
                      <div className="navbar-toggler">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header2;
