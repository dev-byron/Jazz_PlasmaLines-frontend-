import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../shared/theme.module';
import { ManagerComponent } from './manager.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    ManagerRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule
  ],
  declarations: [
    ManagerComponent,
    UsersComponent
  ],
})
export class ManagerModule {
}
