import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartdatePageRoutingModule } from './startdate-routing.module';

import { StartdatePage } from './startdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartdatePageRoutingModule
  ],
  declarations: [StartdatePage]
})
export class StartdatePageModule {}
