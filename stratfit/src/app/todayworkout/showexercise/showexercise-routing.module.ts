import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowexercisePage } from './showexercise.page';

const routes: Routes = [
  {
    path: '',
    component: ShowexercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowexercisePageRoutingModule {}
