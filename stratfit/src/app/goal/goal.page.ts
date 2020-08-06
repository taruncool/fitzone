import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

import { PlanrenewalPage } from '../planrenewal/planrenewal.page';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  backButtonAction() {
    this.navCtrl.navigateBack('tabs/tabs/store');
  }

  community() {
    this.navCtrl.navigateBack('/community');
  }

}
