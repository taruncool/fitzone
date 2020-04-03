import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpswdPageRoutingModule } from './forgotpswd-routing.module';

import { ForgotpswdPage } from './forgotpswd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotpswdPageRoutingModule
  ],
  declarations: [ForgotpswdPage]
})
export class ForgotpswdPageModule {}
