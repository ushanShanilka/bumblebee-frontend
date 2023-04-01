import { MenuDTO } from '../../app/core/dashnoard/left-side-nav-bar/inner-components/models/MenuDTO';

export const NavData: MenuDTO[] = [
  {
    menuName: 'Dashboard',
    url: '/dashboard/',
    icon: 'dashboard',
    list: [],
  },
  {
    menuName: 'User Management',
    url: '/dashboard/user-management/',
    icon: 'manage_accounts',
    list: [
      {
        menuName: 'View All',
        url: '/dashboard/user-management/add',
        icon: 'visibility',
        list: [],
      },
    ],
  },
  {
    menuName: 'Product Management',
    url: '/dashboard/product-management/',
    icon: 'inventory',
    list: [
      {
        menuName: 'View All',
        url: '/dashboard/product-management/all',
        icon: 'visibility',
        list: [],
      },
      {
        menuName: 'Add',
        url: '/dashboard/product-management/add',
        icon: 'add',
        list: [],
      },
    ],
  },
];
