import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'slides',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../slides/slides.module').then(m => m.SlidesPageModule)
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../store/store.module').then(m => m.StorePageModule)
          }
        ]
      },
      {
        path: 'coachprofile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../coachprofile/coachprofile.module').then(m => m.CoachprofilePageModule)
          }
        ]
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../analytics/analytics.module').then(m => m.AnalyticsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/slides',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/slides',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
