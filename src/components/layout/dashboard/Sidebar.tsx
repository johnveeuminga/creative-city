import UserAvatar from "@/components/UserAvatar";
import { getMenuItems, menuItems } from "@/lib/client/menu-items";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { getServerSession } from "@/lib/server/auth";

export default async function DashboardSidebar() { 
  const session = await getServerSession();

  const menuItems = getMenuItems(session.user.groups);

  return (
     <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__content">
        <div className="dashboard-sidebar__header">
          <div className="dashboard-sidebar__user">
            <UserAvatar 
              size="90"
              className="dashboard-sidebar__avatar"
              user={session.user} />
            <div className="dashboard-sidebar__user-information">
              <p className="dashboard-sidebar__user-name">{session.user.name}</p>
            </div>
          </div>
          <div className="dashboard-sidebar__menu-container">
            <SidebarMenu 
              menuItems={menuItems} />
          </div>
        </div>
      </div>
     </aside> 
  )
}