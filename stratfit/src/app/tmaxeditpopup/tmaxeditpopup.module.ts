import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmaxeditpopupPageRoutingModule } from './tmaxeditpopup-routing.module';

import { TmaxeditpopupPage } from './tmaxeditpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmaxeditpopupPageRoutingModule
  ],
  declarations: [TmaxeditpopupPage]
})
export class TmaxeditpopupPageModule {}
