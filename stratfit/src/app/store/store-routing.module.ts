import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorePage } from './store.page';

const routes: Routes = [
  {
    path: '',
    component: StorePage
  },
  {
    path: 'goal',
    loadChildren: () => import('./goal/goal.module').then( m => m.GoalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorePageRoutingModule {}
