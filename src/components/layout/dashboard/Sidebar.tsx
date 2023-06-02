import UserAvatar from "@/components/UserAvatar";
import { menuItems } from "@/lib/client/menu-items";
import React from "react";
import SidebarMenu from "./SidebarMenu";

export default function DashboardSidebar() { 
  return (
     <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__content">
        <div className="dashboard-sidebar__header">
          <div className="dashboard-sidebar__user">
            <UserAvatar 
              size="90"
              className="dashboard-sidebar__avatar"
              user={{ name: "Creative City"}} />
            <div className="dashboard-sidebar__user-information">
              <p className="dashboard-sidebar__user-name">Creative City</p>
            </div>
          </div>
          <div className="dashboard-sidebar__menu-container">
            <SidebarMenu menuItems={menuItems} />
          
          </div>
        </div>
      </div>
     </aside> 
  )
}