import {NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
declarations:[ExpandableComponent,ProgressBarComponent],
exports:[ExpandableComponent,ProgressBarComponent],
imports:[IonicModule],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})

export class ComponentsModule{}