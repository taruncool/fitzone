import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealtimingsPage } from './mealtimings.page';

const routes: Routes = [
  {
    path: '',
    component: MealtimingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealtimingsPageRoutingModule {}
