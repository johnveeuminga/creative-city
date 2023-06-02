import UserAvatar from "@/components/UserAvatar";

export default function DashboardHeader() {
  return(
    <header className="dashboard-header">
      <div className="header-left">
        <p>Creative City</p> 
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