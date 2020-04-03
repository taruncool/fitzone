import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerpopupPage } from './timerpopup.page';

const routes: Routes = [
  {
    path: '',
    component: TimerpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerpopupPageRoutingModule {}
