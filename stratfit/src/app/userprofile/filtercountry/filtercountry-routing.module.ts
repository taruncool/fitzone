import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltercountryPage } from './filtercountry.page';

const routes: Routes = [
  {
    path: '',
    component: FiltercountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltercountryPageRoutingModule {}
