import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramdetailsPageRoutingModule } from './programdetails-routing.module';

import { ProgramdetailsPage } from './programdetails.page';
import { ExcpreviewPage } from '../todayworkout/excpreview/excpreview.page';
import { ProgressbarPage } from '../todayworkout/Progressbar/progressbar.page';
import { CoachprofilePage } from '../coachprofile/coachprofile.page';
import { PlanpreviewPage } from '../programdetails/planpreview/planpreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramdetailsPageRoutingModule
  ],
  declarations: [ProgramdetailsPage],
  entryComponents: [ExcpreviewPage, ProgressbarPage, CoachprofilePage, PlanpreviewPage]
})
export class ProgramdetailsPageModule {}
