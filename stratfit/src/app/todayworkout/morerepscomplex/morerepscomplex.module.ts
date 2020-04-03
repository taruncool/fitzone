import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorerepscomplexPageRoutingModule } from './morerepscomplex-routing.module';

import { MorerepscomplexPage } from './morerepscomplex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorerepscomplexPageRoutingModule
  ],
  declarations: [MorerepscomplexPage]
})
export class MorerepscomplexPageModule {}
