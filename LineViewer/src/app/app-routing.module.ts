import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VerifierComponent } from './components/verifier/verifier.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'verify',
    component: VerifierComponent,
  },
  {
    path: 'live/:code',
    component: DashboardComponent,
  },
  { path: '', redirectTo: 'verify', pathMatch: 'full' },
  { path: '**', redirectTo: 'verify' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
