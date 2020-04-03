import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanpreviewPage } from './planpreview.page';

const routes: Routes = [
  {
    path: '',
    component: PlanpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanpreviewPageRoutingModule {}
