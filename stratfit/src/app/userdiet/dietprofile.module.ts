import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { DietprofilePageRoutingModule } from './dietprofile-routing.module';

import { DietprofilePage } from './dietprofile.page';
import { DiethistoryPage } from './diethistory/diethistory.page';
import { AddmealPage } from './addmeal/addmeal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot({
     
     }),
    
    DietprofilePageRoutingModule
  ],
  declarations: [DietprofilePage],
  entryComponents: [DiethistoryPage, AddmealPage]
})
export class DietprofilePageModule {}
