import { Component, OnInit } from '@angular/core';
import { NavController,ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  appVersion;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams) {}

  ngOnInit() {
    this.appVersion = localStorage.getItem('appVersion');
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
  }

}
