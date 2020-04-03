import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlancompletedPageRoutingModule } from './plancompleted-routing.module';

import { PlancompletedPage } from './plancompleted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlancompletedPageRoutingModule
  ],
  declarations: [PlancompletedPage]
})
export class PlancompletedPageModule {}
