import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmaxtestingPage } from './tmaxtesting.page';

const routes: Routes = [
  {
    path: '',
    component: TmaxtestingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmaxtestingPageRoutingModule {}
