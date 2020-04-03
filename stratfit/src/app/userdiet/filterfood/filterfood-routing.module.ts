import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterfoodPage } from './filterfood.page';

const routes: Routes = [
  {
    path: '',
    component: FilterfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterfoodPageRoutingModule {}
