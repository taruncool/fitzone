import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmealPageRoutingModule } from './addmeal-routing.module';

import { AddmealPage } from './addmeal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmealPageRoutingModule
  ],
  declarations: [AddmealPage]
})
export class AddmealPageModule {}
