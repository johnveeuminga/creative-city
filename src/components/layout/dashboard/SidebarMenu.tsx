import { MenuItem, getMenuItems } from "@/lib/client/menu-items"
import SidebarMenuItems from "./SidebarMenuItems";
import { getServerSession } from "@/lib/server/auth";


export default async function SidebarMenu() {
  const session = await getServerSession("Sidebar Menu");
  const menuItems = getMenuItems(session?.user?.groups ?? []);

  return (
    <SidebarMenuItems items={menuItems}></SidebarMenuItems>
  )
}