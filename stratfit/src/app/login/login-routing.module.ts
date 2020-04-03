import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'forgotpswd',
    loadChildren: () => import('./forgotpswd/forgotpswd.module').then( m => m.ForgotpswdPageModule)
  },
  {
    path: 'progresslogin',
    loadChildren: () => import('./progresslogin/progresslogin.module').then( m => m.ProgressloginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
