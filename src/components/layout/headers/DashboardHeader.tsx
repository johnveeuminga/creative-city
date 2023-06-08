import Link from "next/link";
import { Suspense } from "react";
import CurrentUserAvatar from "./CurrentUserAvatar";

export default async function DashboardHeader() {
  return(
    <header className="dashboard-header">

      <div className="header-left">
        {/* <h4>
          <Link href='/'>
            Creative City
          </Link>
        </h4>  */}
      </div>
      <div className="header-right">
        <div className="user-avatar d-flex">
          <Suspense fallback={<p>Loading...</p>}>
            <CurrentUserAvatar />
          </Suspense>
        </div>
      </div>
    </header>
  )
}