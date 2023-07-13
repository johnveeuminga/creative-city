import { MenuItem } from "@/lib/client/menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarMenuItem from "./SidebarMenuItem";

export default function SidebarMenuItems({
  items= []
}: {
  items: MenuItem[]
}) {
  const MenuDivider = ({ label, className = '' } : { label: string, className?: string }) => (
    <li className={className}>
      <p className="mb-0 fw-bold">{ label }</p>
    </li>
  )

  return(
    <ul className="nav flex-column">
      { items.map(item => (
        item.type === 'divider' ? 
          <MenuDivider 
            className='dashboard-sidebar__menu-item dashboard-sidebar__menu-item--divider'
            key={item.name} label={item.name} />  : 
            <SidebarMenuItem 
              key={item.name}
              item={item} />
      ))}
    </ul>
  )
}