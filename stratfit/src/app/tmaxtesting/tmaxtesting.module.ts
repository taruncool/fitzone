import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmaxtestingPageRoutingModule } from './tmaxtesting-routing.module';

import { TmaxtestingPage } from './tmaxtesting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmaxtestingPageRoutingModule
  ],
  declarations: [TmaxtestingPage]
})
export class TmaxtestingPageModule {}
