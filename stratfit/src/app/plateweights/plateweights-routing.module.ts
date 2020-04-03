import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlateweightsPage } from './plateweights.page';

const routes: Routes = [
  {
    path: '',
    component: PlateweightsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlateweightsPageRoutingModule {}
