'use client'

import { MenuItem } from "@/lib/client/menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMenuItem({
  item
}: {
  item: MenuItem
}) {
  const route = usePathname();

  return(
    <li 
      key={item.name}
      className="dashboard-sidebar__menu-item">
      <Link 
        className={item.href == route ? 'active' : ''}
        href={item.href ?? "#"}>
        {item.icon && <i className={`ti ${item.icon}`}></i>}
        { item.name }
      </Link>
    </li>
  )
}