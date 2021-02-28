import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagerComponent } from './manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsersComponent } from './user/users.component';
import { CreateComponent } from './dashboard/configuration/create/create.component';
import { UserCreateComponent } from './user/user-create/user-create.component';


const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'create',
            component: UserCreateComponent,
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
