import Image from "next/image";
import Link from "next/link";
import { MdMail } from "react-icons/md"

export default function ShopFooter() {
  return (
    <footer className="footer bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <Image 
              width={204}
              height={204}
              src="/assets/images/bcc.png" 
              alt="Baguio Creative City"/>
          </div>
          <div className="col-md-4 col-12">
            <p className="fw-bold text-primary text-white">Menu</p>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link text-white" href={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href={"/"}>Auctions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href={"/"}>Artworks</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" href={"/"}>Blog</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12">
            <p className="fw-bold text-primary text-white">Contact Us</p>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link d-flex align-items-center text-white">
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