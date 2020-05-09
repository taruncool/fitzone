import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,NavParams,Platform,NavController} from '@ionic/angular'
import { global } from "../../../app/global";

@Component({
  selector: 'app-advexpopup',
  templateUrl: './advexpopup.page.html',
  styleUrls: ['./advexpopup.page.scss'],
})
export class AdvexpopupPage implements OnInit {
  exData;
  weightExists;
  distanceExists;
  repsExists;
  timeExists;
  speedExists;
  heightExists;
  s3url;
  metrics;
  constructor(public navCtrl: NavController,public platform: Platform,public params: NavParams, public modalCtrl: ModalController){
    this.s3url=global.s3URL;
    this.metrics = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    this.exData = JSON.parse(this.params.get('exData'));
    this.weightExists = (this.exData.workweight && this.exData.workweight!="null" && this.exData.workweight!=0)?true:false;
    this.distanceExists = (this.exData.advDistance && this.exData.advDistance!=="null" && this.exData.advDistance !== undefined)?true:false;
    this.repsExists = (this.exData.advReps && this.exData.advReps!==0 && this.exData.advReps !== undefined)?true:false;
    this.timeExists = (this.exData.advTime && this.exData.advTime!=="null" && this.exData.advTime !== undefined && this.exData.advTime!==0)?true:false;
    this.speedExists = (this.exData.advSpeed && this.exData.advSpeed!=="null" && this.exData.advSpeed !== undefined)?true:false;
    this.heightExists = (this.exData.advHeight && this.exData.advHeight!=="null" && this.exData.advHeight !== undefined)?true:false;
    this.exData.advTime = (this.exData.advTime && this.exData.advTime!=="null" && this.exData.advTime!== undefined)?this.exData.advTime:2;
  }
  
  backButtonAction() {
    this.modalCtrl.dismiss();
  }
  doneBtn(){
    this.modalCtrl.dismiss(this.exData);
  }
  ngOnInit() {
  }

}
