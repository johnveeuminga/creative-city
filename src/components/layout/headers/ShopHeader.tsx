import Image from "next/image";
import Link from "next/link";
import { MdPersonOutline } from "react-icons/md";

export default function ShopHeader() {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link 
            className="navbar-brand"
            href={"/"}>
            <Image 
              width={203}
              height={75}
              src="/bcc.svg"
              alt="logo" 
            />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" href="auctions">Artworks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="auctions">Auctions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="auctions">Blog</Link>
              </li>
            </ul>
            <div className="ms-5 actions">
              <button className="btn btn-lg btn-tertiary d-flex align-items-center">
                <MdPersonOutline 
                  fontSize={26}
                  className="me-3"/>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}