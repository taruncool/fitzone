import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FatlevelPage } from './fatlevel.page';

const routes: Routes = [
  {
    path: '',
    component: FatlevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FatlevelPageRoutingModule {}
