import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcpreviewPage } from './excpreview.page';

const routes: Routes = [
  {
    path: '',
    component: ExcpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcpreviewPageRoutingModule {}
