import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitnessinputPageRoutingModule } from './fitnessinput-routing.module';

import { FitnessinputPage } from './fitnessinput.page';
import { ComponentsModule } from '../../components/components.module';
import { TmaxeditpopupPage } from '../tmaxeditpopup/tmaxeditpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FitnessinputPageRoutingModule
  ],
  declarations: [FitnessinputPage],
  entryComponents: [TmaxeditpopupPage]
})
export class FitnessinputPageModule {}
