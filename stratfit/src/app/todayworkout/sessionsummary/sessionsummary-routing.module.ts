import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionsummaryPage } from './sessionsummary.page';

const routes: Routes = [
  {
    path: '',
    component: SessionsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsummaryPageRoutingModule {}
