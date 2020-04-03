import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmaxpreviewPage } from './tmaxpreview.page';

const routes: Routes = [
  {
    path: '',
    component: TmaxpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmaxpreviewPageRoutingModule {}
