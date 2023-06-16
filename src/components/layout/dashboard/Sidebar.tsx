import React, { Suspense } from "react";
import SidebarMenu from "./SidebarMenu";
import SidebarUserAvatar from "./SidebarUserAvatar";
import Link from "next/link";

export default async function DashboardSidebar() { 
  return (
     <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__header">
        <Link 
          className="dashboard-sidebar__logo"
          href={"/"}>
          Creative City
        </Link>
      </div>
      <div className="dashboard-sidebar__content">
        <div className="dashboard-sidebar__menu-container">
        <Suspense fallback={<p>Loading sidebar...</p>}>
          <SidebarMenu />
        </Suspense>
        </div>
      </div>
     </aside> 
  )
}