'use client'

import { MenuItem } from "@/lib/client/menu-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMenuItems({
  items= []
}: {
  items: MenuItem[]
}) {
  const route = usePathname();

  return(
    <ul>
      { items.map(item => (
        <li 
          key={item.name}
          className="dashboard-sidebar__menu-item">
          <Link 
            className={item.href == route ? 'active' : ''}
            prefetch={item.prefetch ?? true}
            href={item.href ?? "#"}>
            {item.icon && <i className={`ti ${item.icon}`}></i>}
            { item.name }
          </Link>
        </li>
      ))}
    </ul>
  )
}