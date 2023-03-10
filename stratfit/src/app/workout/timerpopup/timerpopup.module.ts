import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimerpopupPageRoutingModule } from './timerpopup-routing.module';

import { TimerpopupPage } from './timerpopup.page';
import { TimerComponent } from '../timer/timer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerpopupPageRoutingModule
  ],
  declarations: [TimerpopupPage, TimerComponent]
})
export class TimerpopupPageModule {}
