import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
declarations:[ExpandableComponent,ProgressBarComponent],
exports:[ExpandableComponent,ProgressBarComponent],
imports:[IonicModule]


})

export class ComponentsModule{}