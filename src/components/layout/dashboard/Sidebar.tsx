import UserAvatar from "@/components/UserAvatar";
import { getMenuItems, menuItems } from "@/lib/client/menu-items";
import React, { Suspense } from "react";
import SidebarMenu from "./SidebarMenu";
import { getServerSession } from "@/lib/server/auth";
import SidebarUserAvatar from "./SidebarUserAvatar";

export default async function DashboardSidebar() { 
  return (
     <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__content">
        <div className="dashboard-sidebar__header">
          <Suspense fallback={<p>Loading avatar...</p>}>
            {/* @ts-expect-error Server Component */}
            <SidebarUserAvatar />
          </Suspense>
          <div className="dashboard-sidebar__menu-container">
          <Suspense fallback={<p>Loading sidebar...</p>}>
            {/* @ts-expect-error Server Component */}
            <SidebarMenu />
          </Suspense>
          </div>
        </div>
      </div>
     </aside> 
  )
}