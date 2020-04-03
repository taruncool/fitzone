import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorerepsPageRoutingModule } from './morereps-routing.module';

import { MorerepsPage } from './morereps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorerepsPageRoutingModule
  ],
  declarations: [MorerepsPage]
})
export class MorerepsPageModule {}
