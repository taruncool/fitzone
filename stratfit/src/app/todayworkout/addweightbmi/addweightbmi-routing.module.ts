import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddweightbmiPage } from './addweightbmi.page';

const routes: Routes = [
  {
    path: '',
    component: AddweightbmiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddweightbmiPageRoutingModule {}
