import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayworkoutPageRoutingModule } from './todayworkout-routing.module';

import { TodayworkoutPage } from './todayworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayworkoutPageRoutingModule
  ],
  declarations: [TodayworkoutPage]
})
export class TodayworkoutPageModule {}
