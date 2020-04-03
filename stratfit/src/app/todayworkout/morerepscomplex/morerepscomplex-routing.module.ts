import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorerepscomplexPage } from './morerepscomplex.page';

const routes: Routes = [
  {
    path: '',
    component: MorerepscomplexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorerepscomplexPageRoutingModule {}
