import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FitnessinputPage } from './fitnessinput.page';

const routes: Routes = [
  {
    path: '',
    component: FitnessinputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FitnessinputPageRoutingModule {}
