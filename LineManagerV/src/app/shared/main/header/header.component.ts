import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userMenu = [ { title: 'Perfil' }, { title: 'Cerrar Sesión' } ];

  constructor() {
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
