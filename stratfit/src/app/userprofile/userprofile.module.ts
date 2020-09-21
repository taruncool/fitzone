import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserprofilePageRoutingModule } from './userprofile-routing.module';

import { UserprofilePage } from './userprofile.page';
import { EditprofilePage } from './editprofile/editprofile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  
    UserprofilePageRoutingModule
  ],
  declarations: [UserprofilePage],
  entryComponents: [EditprofilePage]
})
export class UserprofilePageModule {}
