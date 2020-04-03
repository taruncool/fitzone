import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachprofilePage } from './coachprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CoachprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachprofilePageRoutingModule {}
