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
  {
    menuName: 'Category Management',
    url: '/dashboard/category/',
    icon: 'category',
    list: [
      {
        menuName: 'Add',
        url: '/dashboard/category/add',
        icon: 'add',
        list: [],
      },
    ],
  },
  {
    menuName: 'Brand Management',
    url: '/dashboard/brand/',
    icon: 'workspace_premium',
    list: [
      {
        menuName: 'Add',
        url: '/dashboard/brand/add',
        icon: 'add',
        list: [],
      },
    ],
  },
];
