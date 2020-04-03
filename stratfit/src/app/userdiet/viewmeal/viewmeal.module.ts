import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewmealPageRoutingModule } from './viewmeal-routing.module';

import { ViewmealPage } from './viewmeal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmealPageRoutingModule
  ],
  declarations: [ViewmealPage]
})
export class ViewmealPageModule {}
