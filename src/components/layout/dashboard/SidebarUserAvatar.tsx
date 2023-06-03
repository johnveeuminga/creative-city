import UserAvatar from "@/components/UserAvatar";
import { getServerSession } from "@/lib/server/auth";

export default async function SidebarUserAvatar() {
  const session = await getServerSession();

  return (
    <div className="dashboard-sidebar__user">
    <UserAvatar 
      size="90"
      className="dashboard-sidebar__avatar"
      user={session.user} />
    <div className="dashboard-sidebar__user-information">
      <p className="dashboard-sidebar__user-name">{ session.user && session.user.name ? session.user.name : "" }</p>
    </div>
  </div>
  )
}