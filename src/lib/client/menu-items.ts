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
      href: '/dashboard/artworks',
      priority: 12,
      prefetch: false,
    },
  ]
}

export const AdminMenuItems: {
  role: string,
  items: MenuItem[],
} = {
  role: 'admin',
  items: [
    {
      name: 'Artists',
      icon: 'ti-id-badge',
      priority: 20,
      prefetch: false,
    },
    {
      name: 'Auctions',
      icon: 'ti-money',
      href: '/dashboard/auctions',
      priority: 13,
    },
    {
      name: 'Artworks',
      icon: 'ti-gallery',
      href: '/dashboard/artworks',
      priority: 12
    },
  ]
}

export function getMenuItems(roles: Array<string> = []): MenuItem[] {
  let items: Array<MenuItem> = []

  if(roles.indexOf('admin') === -1) {
    roles.forEach(role => {
      switch(role) {
        case 'artist':
          items = [
            ...items,
            ...ArtistMenuItems.items,
          ]
          break;
        case 'user':
          items = [
            ...items,
            ...UserMenuItems.items,
          ]
          break;
      }
    });
  } else {
    items = [
      ...items,
      ...AdminMenuItems.items,
    ] 
  }

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
      name: 'Main',
      type: "divider",
    },
    {
      name: 'Dashboard',
      icon: 'ti-dashboard',
      href: '/dashboard',
      exactPathMatch: true,
    },
    {
      name: 'Apps',
      type: 'divider'
    },
    ...ordered,
    {
      name: 'Account',
      type: "divider",
    },
    {
      name: 'My Profile',
      icon: 'ti-user'
    },
    {
      name: 'Logout',
      icon: 'ti-power-off',
      href: '/api/auth/logout',

      prefetch: false,
    }
  ]
}

export interface MenuItem {
  name: string;
  link?: string;
  icon?: string;
  href?: string;
  priority?: number;
  prefetch?: boolean;
  type?: MenuType;
  as?: 'link' | 'a',
  exactPathMatch?: boolean;
}

type MenuType = "divider" | "link";
