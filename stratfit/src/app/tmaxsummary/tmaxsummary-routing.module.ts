import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmaxsummaryPage } from './tmaxsummary.page';

const routes: Routes = [
  {
    path: '',
    component: TmaxsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmaxsummaryPageRoutingModule {}
