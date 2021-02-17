import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Lines Manager',
    icon: 'home-outline',
    link: '/manager/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/manager/users'
  },
  {
    title: 'Exit',
    icon: 'corner-down-left-outline',
    link: '../auth'
  },
];
