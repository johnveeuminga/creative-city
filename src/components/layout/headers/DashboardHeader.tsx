import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";

export default function DashboardHeader() {
  return(
    <header className="dashboard-header">
      <div className="header-left">
        <p>
          <Link href='/'>
            Creative City
          </Link>
        </p> 
      </div>
      <div className="header-right">
        <div className="user-avatar d-flex">
          <UserAvatar 
            className='avatar'
            user={{ name: 'Creative City' }}/>
          <span>Creative City</span>
        </div>
      </div>
    </header>
  )
}