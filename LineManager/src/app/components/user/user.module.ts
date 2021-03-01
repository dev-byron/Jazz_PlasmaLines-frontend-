import { NgModule } from '@angular/core';
import { NbCardModule,  NbButtonModule, NbInputModule, NbRadioModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../../shared/theme.module';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbButtonModule,
    ThemeModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbRadioModule,
    NbCardModule,
    NbButtonModule,
  ],
  declarations: [
    UsersComponent,
    UserCreateComponent
  ],
})
export class UserModule { }
