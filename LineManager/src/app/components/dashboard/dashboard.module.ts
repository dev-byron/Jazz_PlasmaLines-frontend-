import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule, NbButtonModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard.component';
import { CreateComponent } from './configuration/create/create.component';
import { FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';
import { ImageManageModalComponent } from '../utils/modals/image-manager/image-manager-modal.component';

@NgModule({
  imports: [
    TreeviewModule.forRoot(),
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbRadioModule,
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    ConfigurationComponent,
    CreateComponent
  ],
})
export class DashboardModule { }
