import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstpopupPageRoutingModule } from './instpopup-routing.module';

import { InstpopupPage } from './instpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstpopupPageRoutingModule
  ],
  declarations: [InstpopupPage]
})
export class InstpopupPageModule {}
