import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietprofilePage } from './dietprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DietprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietprofilePageRoutingModule {}
