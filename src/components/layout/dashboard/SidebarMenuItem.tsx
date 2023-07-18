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

  const isActive = (path: string, exact = false): boolean => {
    if(!path)
      return false

    return !exact ? route.includes(path) : route === path;
  }

  return(
    <li 
      key={item.name}
      className="dashboard-sidebar__menu-item fw-semibold ">
        {
          item.as == 'link' || ! item.as && 
            <Link 
              className={isActive(item.href ?? "", !! item.exactPathMatch) ? 'active' : ''}
              prefetch={item.prefetch ?? true}
              href={item.href ?? "#"}>
              {item.icon && <i className={`ti ${item.icon} me-2`}></i>}
              { item.name }
            </Link>
        }
        {
          item.as == 'a' && item.href &&
            <a 
              href={item.href}
              className={isActive(item.href ?? "", item.exactPathMatch) ? 'active' : ''}>
              {item.icon && <i className={`ti ${item.icon} me-2`}></i>}
              { item.name }
            </a>
        }
    </li>
  )
}