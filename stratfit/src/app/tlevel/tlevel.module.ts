import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TlevelPageRoutingModule } from './tlevel-routing.module';

import { TlevelPage } from './tlevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TlevelPageRoutingModule
  ],
  declarations: [TlevelPage]
})
export class TlevelPageModule {}
