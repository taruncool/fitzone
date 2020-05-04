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
          import('../store/store.module').then(m => m.StorePageModule)
      },
      {
        path: 'community',
        loadChildren: () =>
          import('../community/community.module').then(m => m.CommunityPageModule)
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
        redirectTo: '/tabs/tabs/store',
        pathMatch: 'full'
      }
     
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/store',
    pathMatch: 'full'
  }
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
