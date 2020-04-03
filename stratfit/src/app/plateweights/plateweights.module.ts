import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlateweightsPageRoutingModule } from './plateweights-routing.module';

import { PlateweightsPage } from './plateweights.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlateweightsPageRoutingModule
  ],
  declarations: [PlateweightsPage]
})
export class PlateweightsPageModule {}
