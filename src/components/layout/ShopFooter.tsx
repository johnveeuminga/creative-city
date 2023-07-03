import Image from "next/image";
import Link from "next/link";
import { MdMail } from "react-icons/md"

export default function ShopFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <Image 
              width={385}
              height={143}
              src="bcc.svg" 
              alt="Baguio Creative City"/>
          </div>
          <div className="col-md-4 col-12">
            <p className="fw-bold text-primary">Menu</p>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>Auctions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>Artworks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={"/"}>Blog</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12">
            <p className="fw-bold text-primary">Contact Us</p>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center">
                  <MdMail className="text-white me-2" />
                  bccfa@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}