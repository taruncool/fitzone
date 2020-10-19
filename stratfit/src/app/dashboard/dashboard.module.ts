import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { DashboardPage } from './dashboard.page';
import { SessionsummaryPage } from '../todayworkout/sessionsummary/sessionsummary.page';
import { PlanrenewalPage } from '../planrenewal/planrenewal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot({
     
    }),
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
  entryComponents: [SessionsummaryPage, PlanrenewalPage]
})
export class DashboardPageModule {}
