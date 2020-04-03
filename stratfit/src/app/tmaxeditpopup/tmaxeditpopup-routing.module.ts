import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmaxeditpopupPage } from './tmaxeditpopup.page';

const routes: Routes = [
  {
    path: '',
    component: TmaxeditpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmaxeditpopupPageRoutingModule {}
