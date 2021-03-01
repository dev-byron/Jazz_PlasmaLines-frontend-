import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../shared/theme.module';
import { ManagerComponent } from './manager.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    ManagerRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    UserModule,
    MiscellaneousModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ],
  declarations: [
    ManagerComponent
  ],
})
export class ManagerModule {
}
