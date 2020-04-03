import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysubscriptionPage } from './mysubscription.page';

const routes: Routes = [
  {
    path: '',
    component: MysubscriptionPage
  },
  {
    path: 'glossary',
    loadChildren: () => import('./glossary/glossary.module').then( m => m.GlossaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysubscriptionPageRoutingModule {}
