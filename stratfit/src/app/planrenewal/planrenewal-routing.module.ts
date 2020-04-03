import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanrenewalPage } from './planrenewal.page';

const routes: Routes = [
  {
    path: '',
    component: PlanrenewalPage
  },
  {
    path: 'plancompleted',
    loadChildren: () => import('./plancompleted/plancompleted.module').then( m => m.PlancompletedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanrenewalPageRoutingModule {}
