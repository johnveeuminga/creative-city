import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "@/lib/server/auth";
import Link from "next/link";

export default async function DashboardHeader() {
  const session = await getServerSession();

  return(
    <header className="dashboard-header">

      <div className="header-left">
        <h4>
          <Link href='/'>
            Creative City
          </Link>
        </h4> 
      </div>
      <div className="header-right">
        <div className="user-avatar d-flex">
          <UserAvatar 
            className='avatar'
            user={ session.user }/>
          <span>{session.user.name}</span>
        </div>
      </div>
    </header>
  )
}