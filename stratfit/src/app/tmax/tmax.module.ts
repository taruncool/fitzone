import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmaxPageRoutingModule } from './tmax-routing.module';

import { TmaxPage } from './tmax.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmaxPageRoutingModule
  ],
  declarations: [TmaxPage]
})
export class TmaxPageModule {}
