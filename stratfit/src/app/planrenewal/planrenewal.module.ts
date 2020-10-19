import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanrenewalPageRoutingModule } from './planrenewal-routing.module';

import { PlanrenewalPage } from './planrenewal.page';
import { GlossaryPage } from '../mysubscription/glossary/glossary.page';
import { ProgressbarPage } from '../todayworkout/progressbar/progressbar.page';
import { StartdatePage } from '../startdate/startdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanrenewalPageRoutingModule
  ],
  declarations: [PlanrenewalPage],
  entryComponents: [GlossaryPage, ProgressbarPage, StartdatePage]
})
export class PlanrenewalPageModule {}
