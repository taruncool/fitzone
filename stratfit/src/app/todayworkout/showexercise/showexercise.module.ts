import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowexercisePageRoutingModule } from './showexercise-routing.module';

import { ShowexercisePage } from './showexercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowexercisePageRoutingModule
  ],
  declarations: [ShowexercisePage]
})
export class ShowexercisePageModule {}
