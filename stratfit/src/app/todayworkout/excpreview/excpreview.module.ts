import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcpreviewPageRoutingModule } from './excpreview-routing.module';

import { ExcpreviewPage } from './excpreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcpreviewPageRoutingModule
  ],
  declarations: [ExcpreviewPage]
})
export class ExcpreviewPageModule {}
