import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';

@Component({
  selector: 'app-instpopup',
  templateUrl: './instpopup.page.html',
  styleUrls: ['./instpopup.page.scss'],
})
export class InstpopupPage implements OnInit {
  nextEx;
  instData = this.params.get('instData');
  constructor(public navCtrl: NavController,public platform: Platform,public params: NavParams, public modalCtrl: ModalController){
  }
  
  backButtonAction() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

}
