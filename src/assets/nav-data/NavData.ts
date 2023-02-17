import { MenuDTO } from "../../app/core/dashboard/components/left-side-nav-bar/inner-components/models/MenuDTO";

export const NavData: MenuDTO[] = [
  {
    menuName: 'Dashboard',
    url: '/dashboard/',
    icon: 'dashboard',
    list: []
  },
  {
    menuName: 'Farmer Profile',
    url: '/dashboard/farmer',
    icon: 'agriculture',
    list: [
      {
        menuName: 'Add New',
        url: '/dashboard/farmer/add',
        icon: 'add',
        list: []
      },
      {
        menuName: 'View All',
        url: '/dashboard/farmer/all',
        icon: 'visibility',
        list: []
      },
    ]
  },
  {
    menuName: 'Users',
    url: '/dashboard/user/',
    icon: 'person',
    list: [
      {
        menuName: 'Add New',
        url: '/dashboard/user/add',
        icon: 'add',
        list: []
      },
      {
        menuName: 'View All',
        url: '/dashboard/user/all',
        icon: 'visibility',
        list: []
      },

    ]
  },
  {
    menuName: 'Unit',
    url: '/dashboard/unit',
    icon: 'ad_units',
    list: [
      {
        menuName: 'F-Unit',
        url: '/dashboard/unit/f-unit/add',
        icon: 'apartment',
        list: []
      },
      {
        menuName: 'B-Unit',
        url: '/dashboard/unit/b-unit/add',
        icon: 'apartment',
        list: []
      },
    ]
  },
  {
    menuName: 'Crops',
    url: '/dashboard/crop',
    icon: 'spa',
    list: [
      {
        menuName: 'Add Crops',
        url: '/dashboard/crop/add',
        icon: 'add',
        list: []
      },
      {
        menuName: 'All Crops',
        url: '/dashboard/crop/all',
        icon: 'visibility',
        list: []
      },
    ]
  },
  {
    menuName: 'Purchasing',
    url: '/dashboard/purchasing/',
    icon: 'shopping_cart_checkout',
    list: [
      {
        menuName: 'Create Purchasing Note',
        url: '/dashboard/purchasing/add',
        icon: 'attach_money',
        list: []
      },
      {
        menuName: 'Purchasing Notes',
        url: '/dashboard/purchasing/all',
        icon: 'checklist',
        list: []
      },
      {
        menuName: 'Purchasing Summary Report',
        url: '/dashboard/purchasing/report',
        icon: 'summarize',
        list: []
      },
    ]
  },
  {
    menuName: 'Check List',
    url: '/dashboard/',
    icon: 'check',
    list: [
      {
        menuName: 'Add Check List',
        url: '/dashboard/check-list/add',
        icon: 'add',
        list: []
      }
    ]
  },

];
