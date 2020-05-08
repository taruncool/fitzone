import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  appVersion;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {}

  ngOnInit() {
    this.appVersion = localStorage.getItem('appVersion');
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
  }

}
