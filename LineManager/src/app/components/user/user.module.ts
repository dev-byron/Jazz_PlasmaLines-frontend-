import { NgModule } from '@angular/core';
import { NbCardModule,  NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    ThemeModule,
  ],
  declarations: [
    UsersComponent,
    UserCreateComponent
  ],
})
export class UserModule { }
