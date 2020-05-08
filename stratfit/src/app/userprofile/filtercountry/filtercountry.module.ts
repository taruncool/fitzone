import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltercountryPageRoutingModule } from './filtercountry-routing.module';

import { FiltercountryPage } from './filtercountry.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltercountryPageRoutingModule
  ],
  declarations: [FiltercountryPage]
})
export class FiltercountryPageModule {}
