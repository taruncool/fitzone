import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
     
      {
        path: 'store',
        loadChildren: () =>
          import('../goal/goal.module').then(m => m.GoalPageModule)
      },
      {
        path: '/dietprofile',
        loadChildren: () =>
          import('../userdiet/dietprofile.module').then(m => m.DietprofilePageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('../analytics/analytics.module').then(m => m.AnalyticsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tabs/goal',
        pathMatch: 'full'
      }
     
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/goal',
    pathMatch: 'full'
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
