import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlancompletedPage } from './plancompleted.page';

const routes: Routes = [
  {
    path: '',
    component: PlancompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlancompletedPageRoutingModule {}
