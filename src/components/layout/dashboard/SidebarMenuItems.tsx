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

  const MenuDivider = ({ label, className = '' } : { label: string, className?: string }) => (
    <li className={className}>
      { label }
    </li>
  )

  return(
    <ul>
      { items.map(item => (
        item.type === 'divider' ? 
          <MenuDivider 
            className='dashboard-sidebar__menu-item dashboard-sidebar__menu-item--divider'
            key={item.name} label={item.name} />  : 
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