import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagepreviewPageRoutingModule } from './imagepreview-routing.module';

import { ImagepreviewPage } from './imagepreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagepreviewPageRoutingModule
  ],
  declarations: [ImagepreviewPage]
})
export class ImagepreviewPageModule {}
