'use client'

import { MenuItem, isActive } from "@/lib/client/menu-items"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';


export default function SidebarMenu({
  menuItems = []
}: {
  menuItems: MenuItem[]
}) {
  const route = usePathname();

  return (
    <ul className="dashboard-sidebar__menu">
    { menuItems.map(item => (
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
    ))}
  </ul>
  )
}