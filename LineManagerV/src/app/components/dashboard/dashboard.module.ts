import { NgModule } from '@angular/core';
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    ConfigurationComponent
  ],
})
export class DashboardModule { }
