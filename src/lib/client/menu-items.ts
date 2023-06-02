export const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: 'ti-dashboard',
    href: '/dashboard',
  },
  {
    name: 'My Artworks',
    icon: 'ti-gallery',
  },
  {
    name: 'My Purchases',
    icon: 'ti-receipt',
  },
  {
    name: 'My Biddings',
    icon: 'ti-money',
  },
  {
    name: 'Logout',
    icon: 'ti-power-off',
  }
]

export function isActive(
  href: string = '',
  segment: string | null = null, 
  baseName: string | null = null) {
  const parts = href.split("/");
  console.log(parts);
  if(baseName)
    return segment == href || baseName == href;

  return segment == href;
}

export interface MenuItem {
  name: string;
  link?: string;
  icon?: string;
  href?: string;
}

