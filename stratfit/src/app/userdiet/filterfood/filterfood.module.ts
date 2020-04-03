import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterfoodPageRoutingModule } from './filterfood-routing.module';

import { FilterfoodPage } from './filterfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterfoodPageRoutingModule
  ],
  declarations: [FilterfoodPage]
})
export class FilterfoodPageModule {}
