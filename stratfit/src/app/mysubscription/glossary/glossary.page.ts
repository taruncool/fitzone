import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController,NavController} from '@ionic/angular';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
})
export class GlossaryPage implements OnInit {
  constructor( public modalCtrl: ModalController,public navCtrl: NavController) {}

  public backButtonAction(){
    this.navCtrl.navigateBack('/tabs/tabs/profile');
  }
  ngOnInit() {
  }

}
