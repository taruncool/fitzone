import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
})
export class GlossaryPage implements OnInit {
  constructor( public modalCtrl: ModalController) {}

  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }
  ngOnInit() {
  }

}
