import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvexpopupPageRoutingModule } from './advexpopup-routing.module';

import { AdvexpopupPage } from './advexpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvexpopupPageRoutingModule
  ],
  declarations: [AdvexpopupPage]
})
export class AdvexpopupPageModule {}
