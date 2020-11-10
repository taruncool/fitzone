import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealtimingsPageRoutingModule } from './mealtimings-routing.module';

import { MealtimingsPage } from './mealtimings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealtimingsPageRoutingModule
  ],
  declarations: [MealtimingsPage]
})
export class MealtimingsPageModule {}
