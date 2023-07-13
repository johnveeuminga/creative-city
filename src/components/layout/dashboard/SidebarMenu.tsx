import { MenuItem, getMenuItems } from "@/lib/client/menu-items"
import SidebarMenuItems from "./SidebarMenuItems";
import { getServerSession } from "@/lib/server/auth";
import prisma from "@/lib/prisma";


export default async function SidebarMenu() {
  const session = await getServerSession();
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          fromUserId: 2,
        },
        {
          toUserId: 2,
        }
      ]
    }
  })

  const menuItems = getMenuItems(session?.user?.groups ?? []);

  // TODO: REplace with true ID

  return (
    <SidebarMenuItems 
      items={menuItems} />
  )
}