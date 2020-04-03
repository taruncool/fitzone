import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupverifyPage } from './signupverify.page';

const routes: Routes = [
  {
    path: '',
    component: SignupverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupverifyPageRoutingModule {}
