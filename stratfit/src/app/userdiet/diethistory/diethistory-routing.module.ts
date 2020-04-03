import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiethistoryPage } from './diethistory.page';

const routes: Routes = [
  {
    path: '',
    component: DiethistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiethistoryPageRoutingModule {}
