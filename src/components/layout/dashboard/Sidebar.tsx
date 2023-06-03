import React, { Suspense } from "react";
import SidebarMenu from "./SidebarMenu";
import SidebarUserAvatar from "./SidebarUserAvatar";

export default async function DashboardSidebar() { 
  return (
     <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__content">
        <div className="dashboard-sidebar__header">
          <Suspense fallback={<p>Loading avatar...</p>}>
            <SidebarUserAvatar />
          </Suspense>
          <div className="dashboard-sidebar__menu-container">
          <Suspense fallback={<p>Loading sidebar...</p>}>
            <SidebarMenu />
          </Suspense>
          </div>
        </div>
      </div>
     </aside> 
  )
}