import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppStartComponent } from './components/app-start/app-start.component';

export const routes: Routes = [
  { path: '',  component: AppStartComponent },
  { path: '**',   component: AppStartComponent },
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
