import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-bmicalculator',
  templateUrl: './bmicalculator.page.html',
  styleUrls: ['./bmicalculator.page.scss'],
})
export class BmicalculatorPage implements OnInit {

  constructor( public nav: NavController) {  }

  ngOnInit() {
  }


  public backButtonAction(){
    // this.modalCtrl.dismiss();
    this.nav.navigateBack('tabs/tabs/profile');
   }


}
