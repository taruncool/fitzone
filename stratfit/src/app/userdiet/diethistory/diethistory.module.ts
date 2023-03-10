import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { DiethistoryPageRoutingModule } from './diethistory-routing.module';

import { DiethistoryPage } from './diethistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiethistoryPageRoutingModule,
    NgCircleProgressModule.forRoot({
     
    }),
    
  ],
  declarations: [DiethistoryPage]
})
export class DiethistoryPageModule {}
