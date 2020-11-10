import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mealtimings',
  templateUrl: './mealtimings.page.html',
  styleUrls: ['./mealtimings.page.scss'],
})
export class MealtimingsPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  public backButtonAction(){
    // this.modalCtrl.dismiss();
    this.nav.navigateBack('tabs/tabs/profile');
   }

}
