import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmaxPage } from './tmax.page';

const routes: Routes = [
  {
    path: '',
    component: TmaxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmaxPageRoutingModule {}
