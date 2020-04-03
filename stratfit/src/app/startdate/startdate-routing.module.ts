import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartdatePage } from './startdate.page';

const routes: Routes = [
  {
    path: '',
    component: StartdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartdatePageRoutingModule {}
