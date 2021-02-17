import { NgModule } from '@angular/core';
import { NbCardModule,  NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ],
  declarations: [
    UsersComponent
  ],
})
export class UserModule { }
