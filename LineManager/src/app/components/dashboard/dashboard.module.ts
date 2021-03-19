import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule, NbButtonModule, NbRadioModule, NbSelectModule, NbStepperModule, NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard.component';
import { CreateComponent } from './configuration/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';

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
    NbStepperModule,
    ReactiveFormsModule,
    NbAccordionModule 
  ],
  declarations: [
    DashboardComponent,
    ConfigurationComponent,
    CreateComponent
  ],
})
export class DashboardModule { }
