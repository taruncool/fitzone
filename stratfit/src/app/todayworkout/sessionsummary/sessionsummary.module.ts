import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionsummaryPageRoutingModule } from './sessionsummary-routing.module';

import { SessionsummaryPage } from './sessionsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionsummaryPageRoutingModule
  ],
  declarations: [SessionsummaryPage]
})
export class SessionsummaryPageModule {}
