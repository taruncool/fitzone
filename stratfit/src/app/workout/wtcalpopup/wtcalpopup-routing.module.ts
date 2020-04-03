import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WtcalpopupPage } from './wtcalpopup.page';

const routes: Routes = [
  {
    path: '',
    component: WtcalpopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WtcalpopupPageRoutingModule {}
