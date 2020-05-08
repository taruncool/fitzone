import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysubscriptionPageRoutingModule } from './mysubscription-routing.module';

import { MysubscriptionPage } from './mysubscription.page';
// import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // IonicRatingModule,
    MysubscriptionPageRoutingModule
  ],
  declarations: [MysubscriptionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MysubscriptionPageModule {}
