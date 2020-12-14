import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BmicalculatorPage } from './bmicalculator.page';

const routes: Routes = [
  {
    path: '',
    component: BmicalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BmicalculatorPageRoutingModule {}
