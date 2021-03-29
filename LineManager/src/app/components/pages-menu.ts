import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Configurador de lineas',
    icon: 'home-outline',
    link: '/manager/dashboard',
    home: true,
    hidden: false
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/manager/users',
    hidden: false
  },
  {
    title: 'Salir',
    icon: 'corner-down-left-outline',
    link: '../auth',
    hidden: false
  },
];
