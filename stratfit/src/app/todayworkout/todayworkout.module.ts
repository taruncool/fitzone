import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayworkoutPageRoutingModule } from './todayworkout-routing.module';

import { TodayworkoutPage } from './todayworkout.page';
import { TimerpopupPage } from '../workout/timerpopup/timerpopup.page';
import { SessionsummaryPage } from './sessionsummary/sessionsummary.page';
import { ShowexercisePage } from './showexercise/showexercise.page';
import { WtcalpopupPage } from '../workout/wtcalpopup/wtcalpopup.page';
import { InstpopupPage } from '../workout/instpopup/instpopup.page';
import { ProgramdetailsPage } from '../programdetails/programdetails.page';
import { TmaxsummaryPage } from '../tmaxsummary/tmaxsummary.page';
import { TmaxpreviewPage } from './tmaxpreview/tmaxpreview.page';
import { MorerepsPage } from './morereps/morereps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayworkoutPageRoutingModule
  ],
  declarations: [TodayworkoutPage],
  entryComponents: [TimerpopupPage, SessionsummaryPage, ShowexercisePage, WtcalpopupPage, InstpopupPage, ProgramdetailsPage, TmaxsummaryPage, TmaxpreviewPage, MorerepsPage]
})
export class TodayworkoutPageModule {}
