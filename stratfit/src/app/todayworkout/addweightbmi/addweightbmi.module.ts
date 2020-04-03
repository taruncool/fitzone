import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddweightbmiPageRoutingModule } from './addweightbmi-routing.module';

import { AddweightbmiPage } from './addweightbmi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddweightbmiPageRoutingModule
  ],
  declarations: [AddweightbmiPage]
})
export class AddweightbmiPageModule {}
