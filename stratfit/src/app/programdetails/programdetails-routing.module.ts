import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramdetailsPage } from './programdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramdetailsPage
  },
  {
    path: 'planpreview',
    loadChildren: () => import('./planpreview/planpreview.module').then( m => m.PlanpreviewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramdetailsPageRoutingModule {}
