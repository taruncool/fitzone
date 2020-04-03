import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmaxsummaryPageRoutingModule } from './tmaxsummary-routing.module';

import { TmaxsummaryPage } from './tmaxsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmaxsummaryPageRoutingModule
  ],
  declarations: [TmaxsummaryPage]
})
export class TmaxsummaryPageModule {}
