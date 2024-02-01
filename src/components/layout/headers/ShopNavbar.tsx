import Image from "next/image"
import Link from "next/link"
import React from "react"
import ShopHeaderSignInButton from "../ShopHeaderSignInButton"
import Logo from "@/components/Logo"

export default async function ShopNavbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link 
          className="navbar-brand"
          href={"/"}>
            <Logo />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/artworks">Arts & Crafts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/auctions">Auctions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">Blog</Link>
            </li>
          </ul>
          <div className="actions ms-3">
            <React.Suspense fallback={<p>Loading</p>}>
              <ShopHeaderSignInButton />
            </React.Suspense>
          </div>
        </div>
      </div>
    </nav>
  )
}