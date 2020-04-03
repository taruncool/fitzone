import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressloginPage } from './progresslogin.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressloginPageRoutingModule {}
