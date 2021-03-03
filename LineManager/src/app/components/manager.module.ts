import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../shared/theme.module';
import { ManagerComponent } from './manager.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UserModule } from './user/user.module';
import { ImageManageModalComponent } from './utils/modals/image-manager/image-manager-modal.component';
import { DeleteConfirmationModalComponent } from './utils/modals/delete-confirmation/delete-confirmation-modal.component';

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
    NbDialogModule.forChild(),
  ],
  declarations: [
    ManagerComponent,
    ImageManageModalComponent,
    DeleteConfirmationModalComponent
  ],
})
export class ManagerModule {
}
