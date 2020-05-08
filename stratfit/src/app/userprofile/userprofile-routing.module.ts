import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofilePage } from './userprofile.page';

const routes: Routes = [
  {
    path: '',
    component: UserprofilePage
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'filtercountry',
    loadChildren: () => import('./filtercountry/filtercountry.module').then( m => m.FiltercountryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserprofilePageRoutingModule {}
