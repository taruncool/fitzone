import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TlevelPage } from './tlevel.page';

const routes: Routes = [
  {
    path: '',
    component: TlevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TlevelPageRoutingModule {}
