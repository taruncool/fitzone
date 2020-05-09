import { Component, OnInit ,ViewChild, Input} from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import { LoadData } from '../../../providers/loaddata';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import {TimerPage } from '../timer/timer.page';

@Component({
  selector: 'app-timerpopup',
  templateUrl: './timerpopup.page.html',
  styleUrls: ['./timerpopup.page.scss'],
})
export class TimerpopupPage implements OnInit {
  @ViewChild('TimerPage', {static:false}) timer: TimerPage;
  myVariableNameHere:any;
  setName:any;
  exerciseName:any;
  setWorkWeight:any;
  repsDone:any;
  excerciseId:any;
  calories:any;
  s3urlPop;
  isCalories;
  exFinished = false;
  exDetails=[];
  today;
  wMetric;
  planId;
  s3url;
  exThumbImg;
  
  constructor(public navCtrl: NavController,public platform: Platform, public loadData: LoadData, public params: NavParams,public insomnia: Insomnia, public modalCtrl: ModalController,private nativeAudio: NativeAudio){

    this.s3urlPop=global.s3URL;
    this.myVariableNameHere = this.params.get('rest');
    this.setName = this.params.get('setname');

    this.exerciseName = this.params.get('excercisename');
    this.setWorkWeight = this.params.get('setworkweight');

    this.repsDone = this.params.get('repsdone');
    this.excerciseId = this.params.get('excerciseid');

    this.s3url=global.s3URL;
    this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    var d = new Date();
    this.today = d.getFullYear()+"-"+('0' +(d.getMonth()+1)).slice(-2)+"-"+('0' +(d.getDate())).slice(-2);
    if(this.params.get('calories')!==0){
      this.isCalories = true;
      this.calories = this.params.get('calories');

    }else{
      this.isCalories = false;
      this.calories = this.params.get('calories');

    }
    
    if(this.params.get("exFinished")){

      console.log("inside ex finished");
      this.exFinished = true;
      
      
    }   
  }

  onExImageError(){
    this.exThumbImg = 'assets/images/icon.png';
  }
  ngOnInit() {
    setTimeout(() => {
      this.timer.startTimer();
    }, 100)
  }
  backButtonAction() {
    if(localStorage.getItem('isSoundOn')==="true"){
    this.nativeAudio.stop('uniqueId2');
    this.nativeAudio.unload('uniqueId2');
    }
    if(localStorage.getItem('isVibrateOn')==="true"){
    navigator.vibrate(0);
    }
    this.insomnia.allowSleepAgain();
    this.timer.pauseTimer();
    this.modalCtrl.dismiss();
  }
}
