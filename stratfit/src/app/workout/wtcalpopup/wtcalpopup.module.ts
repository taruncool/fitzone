import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WtcalpopupPageRoutingModule } from './wtcalpopup-routing.module';

import { WtcalpopupPage } from './wtcalpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WtcalpopupPageRoutingModule
  ],
  declarations: [WtcalpopupPage]
})
export class WtcalpopupPageModule {}
