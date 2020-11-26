import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from "@angular-slider/ngx-slider";

import { IonicModule } from '@ionic/angular';

import { FatlevelPageRoutingModule } from './fatlevel-routing.module';

import { FatlevelPage } from './fatlevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSliderModule,
    FatlevelPageRoutingModule
  ],
  declarations: [FatlevelPage]
})
export class FatlevelPageModule {}
