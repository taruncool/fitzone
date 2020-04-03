import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanrenewalPageRoutingModule } from './planrenewal-routing.module';

import { PlanrenewalPage } from './planrenewal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanrenewalPageRoutingModule
  ],
  declarations: [PlanrenewalPage]
})
export class PlanrenewalPageModule {}
