import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewmealPage } from './viewmeal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewmealPageRoutingModule {}
