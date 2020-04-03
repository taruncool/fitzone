import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmealPage } from './addmeal.page';

const routes: Routes = [
  {
    path: '',
    component: AddmealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmealPageRoutingModule {}
