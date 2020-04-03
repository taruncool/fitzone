import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayworkoutPage } from './todayworkout.page';

const routes: Routes = [
  {
    path: '',
    component: TodayworkoutPage
  },
  {
    path: 'tmaxpreview',
    loadChildren: () => import('./tmaxpreview/tmaxpreview.module').then( m => m.TmaxpreviewPageModule)
  },
  {
    path: 'excpreview',
    loadChildren: () => import('./excpreview/excpreview.module').then( m => m.ExcpreviewPageModule)
  },
  {
    path: 'addweightbmi',
    loadChildren: () => import('./addweightbmi/addweightbmi.module').then( m => m.AddweightbmiPageModule)
  },
  {
    path: 'morereps',
    loadChildren: () => import('./morereps/morereps.module').then( m => m.MorerepsPageModule)
  },
  {
    path: 'morerepscomplex',
    loadChildren: () => import('./morerepscomplex/morerepscomplex.module').then( m => m.MorerepscomplexPageModule)
  },
  {
    path: 'progressbar',
    loadChildren: () => import('./progressbar/progressbar.module').then( m => m.ProgressbarPageModule)
  },
  {
    path: 'sessionsummary',
    loadChildren: () => import('./sessionsummary/sessionsummary.module').then( m => m.SessionsummaryPageModule)
  },
  {
    path: 'showexercise',
    loadChildren: () => import('./showexercise/showexercise.module').then( m => m.ShowexercisePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayworkoutPageRoutingModule {}
