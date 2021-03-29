import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['manager.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class ManagerComponent {
  menu = [];
  constructor(private tokenStorage: TokenStorageService) {
    this.menu = MENU_ITEMS;
    // users
    this.menu[1].hidden = !this.tokenStorage.isAdmin();
  }
  
}
