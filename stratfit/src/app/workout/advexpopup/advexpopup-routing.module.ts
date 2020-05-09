import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvexpopupPage } from './advexpopup.page';

const routes: Routes = [
  {
    path: '',
    component: AdvexpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvexpopupPageRoutingModule {}
