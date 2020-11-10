import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietprofilePage } from './dietprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DietprofilePage
  },
  {
    path: 'fatlevel',
    loadChildren: () => import('./fatlevel/fatlevel.module').then( m => m.FatlevelPageModule)
  },
  {
    path: 'mealtimings',
    loadChildren: () => import('./mealtimings/mealtimings.module').then( m => m.MealtimingsPageModule)
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietprofilePageRoutingModule {}
