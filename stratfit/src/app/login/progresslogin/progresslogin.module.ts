import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressloginPageRoutingModule } from './progresslogin-routing.module';

import { ProgressloginPage } from './progresslogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressloginPageRoutingModule
  ],
  declarations: [ProgressloginPage]
})
export class ProgressloginPageModule {}
