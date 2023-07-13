'use client'

import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "@/lib/server/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdPersonOutline } from "react-icons/md";

export default function ShopHeader() {
  // const session = await getServerSession();
  const [navScrolled, setNavScrolled] = useState(false)

  const changeNavBg = () => {
    window.scrollY > 0 ? setNavScrolled(true) : setNavScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);

    return () => window.removeEventListener('scroll', changeNavBg)
  }, [])

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if(pathname !== "/")
      setNavScrolled(true)
  }, [pathname, searchParams])

  return (
    <div 
      className={`shop-header border-bottom${navScrolled ? ' bg-white scrolled': ''}`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link 
            className="navbar-brand"
            href={"/"}>
            <Image 
              className="logo"
              width={100}
              height={100}
              src="/assets/images/bcc.png"
              alt="logo" 
            />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" href="artworks">Arts & Crafts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="auctions">Auctions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="auctions">Blog</Link>
              </li>
            </ul>
            {/* <div className="ms-5 actions">
              {
                ! session.user && 
                  <a className="btn btn-outline-primary d-flex align-items-center" href={"/api/auth/login"}>
                    <MdPersonOutline 
                      fontSize={18}
                      className="me-2"/>
                      Sign In
                  </a>
              }
              {
                !! session.user &&
                  <Link 
                    href="/dashboard" 
                    className="avatar"
                    prefetch={false}>
                    <UserAvatar 
                      size="48"
                      user={session.user}/>
                  </Link>
              }
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  )
}