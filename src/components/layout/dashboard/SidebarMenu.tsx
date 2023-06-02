import { MenuItem, getMenuItems } from "@/lib/client/menu-items"
import SidebarMenuItem from "./SidebarMenuItem";
import { getServerSession } from "@/lib/server/auth";


export default async function SidebarMenu() {
  const session = await getServerSession();
  const menuItems = getMenuItems(session.user.groups);

  return (
    <ul className="dashboard-sidebar__menu">
    { menuItems.map(item => (
      <SidebarMenuItem item={item} />
    ))}
  </ul>
  )
}