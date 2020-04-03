import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanpreviewPageRoutingModule } from './planpreview-routing.module';

import { PlanpreviewPage } from './planpreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanpreviewPageRoutingModule
  ],
  declarations: [PlanpreviewPage]
})
export class PlanpreviewPageModule {}
