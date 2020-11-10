import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fatlevel',
  templateUrl: './fatlevel.page.html',
  styleUrls: ['./fatlevel.page.scss'],
})
export class FatlevelPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  public backButtonAction(){
    // this.modalCtrl.dismiss();
    this.nav.navigateBack('tabs/tabs/profile');
   }


   public nextStep(){
    this.nav.navigateBack('/mealtimings');
  }

}
