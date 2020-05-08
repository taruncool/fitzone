import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietprofilePageRoutingModule } from './dietprofile-routing.module';

import { DietprofilePage } from './dietprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    DietprofilePageRoutingModule
  ],
  declarations: [DietprofilePage]
})
export class DietprofilePageModule {}
