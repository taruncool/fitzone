import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupverifyPageRoutingModule } from './signupverify-routing.module';

import { SignupverifyPage } from './signupverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupverifyPageRoutingModule
  ],
  declarations: [SignupverifyPage]
})
export class SignupverifyPageModule {}
