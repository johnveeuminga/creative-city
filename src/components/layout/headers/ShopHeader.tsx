import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "@/lib/server/auth";
import Image from "next/image";
import Link from "next/link";
import { MdPersonOutline } from "react-icons/md";

export default async function ShopHeader() {
  const session = await getServerSession();

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link 
            className="navbar-brand"
            href={"/"}>
            <Image 
              width={261 / 4}
              height={316 / 4}
              src="/assets/images/bcc_logo.png"
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
              {
                ! session.user && 
                  <a className="btn btn-lg btn-tertiary d-flex align-items-center" href={"/api/auth/login"}>
                    <MdPersonOutline 
                      fontSize={26}
                      className="me-3"/>
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
                      size="54"
                      user={session.user}/>
                  </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}