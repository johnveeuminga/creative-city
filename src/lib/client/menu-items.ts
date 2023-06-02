export const menuItems: MenuItem[] = [
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
]


export const UserMenuItems: {
  role: string,
  items: MenuItem[],
} = {
  role: 'user',
  items: [
    {
      name: 'My Purchases',
      icon: 'ti-receipt',
    },
    {
      name: 'My Biddings',
      icon: 'ti-money',
    },
  ]
}

export const ArtistMenuItems: {
  role: string,
  items: MenuItem[],
} = {
  role: 'artist',
  items: [
    {
      name: 'My Purchases',
      icon: 'ti-receipt',
    },
    {
      name: 'My Biddings',
      icon: 'ti-money',
      priority: 10,
    },
    {
      name: 'My Artworks',
      icon: 'ti-gallery',
      href: '/dashboard/artist/artworks',
      priority: 12
    },
  ]
}

export const AdminMenuItems: {
  role: string,
  items: MenuItem[],
} = {
  role: 'artist',
  items: [
    {
      name: 'My Purchases',
      icon: 'ti-receipt',
    },
    {
      name: 'My Biddings',
      icon: 'ti-money',
      priority: 13,
    },
    {
      name: 'My Artworks',
      icon: 'ti-gallery',
      priority: 12
    },
  ]
}

export function getMenuItems(roles: Array<string> = []): MenuItem[] {
  let items: Array<MenuItem> = []

  roles.forEach(role => {
    switch(role) {
      case 'artist':
        items = [
          ...items,
          ...ArtistMenuItems.items,
        ]
        break;
      case 'admin':
        items = [
          ...items,
          ...AdminMenuItems.items,
        ]
        break;
      default:
        items = [
          ...items,
          ...UserMenuItems.items,
        ]
    }
  });

  function compare( a: MenuItem, b: MenuItem ) {
    const prioA = a.priority ?? 0;
    const prioB = b.priority ?? 0;
    let ret = 0;

    if ( prioA < prioB ){
      ret = 1;
    }
    if ( prioA > prioB ){
      ret = -1;
    }
    return ret;
  }

  const ordered = items.sort(compare);

  return [
    {
      name: 'Dashboard',
      icon: 'ti-dashboard',
      href: '/dashboard'
    },
    ...ordered,
    {
      name: 'Logout',
      icon: 'ti-power-off',
      href: '/api/auth/logout',
    }
  ]
}

export interface MenuItem {
  name: string;
  link?: string;
  icon?: string;
  href?: string;
  priority?: number;
}

