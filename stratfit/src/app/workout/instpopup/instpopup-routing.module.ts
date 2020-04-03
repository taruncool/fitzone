import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstpopupPage } from './instpopup.page';

const routes: Routes = [
  {
    path: '',
    component: InstpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstpopupPageRoutingModule {}
