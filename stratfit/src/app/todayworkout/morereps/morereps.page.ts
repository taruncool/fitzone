import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { HttpClient } from '@angular/common/http';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';

@Component({
  selector: 'app-morereps',
  templateUrl: './morereps.page.html',
  styleUrls: ['./morereps.page.scss'],
})
export class MorerepsPage implements OnInit {
  myVariableNameHere:any;
  setName:any;
  exerciseName:any;
  setWorkWeight:any;
  repsMax:any;
  repsdone:any;
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
  pReps;
  repscount;
  tmax;
  maxmorereps;
  
  // prescribedReps = {
  //   numbers: [
  //    { description: "1" },
  //     { description: "2" },
  //     { description: "3" }
  //   ]
  // };

  constructor(public navCtrl: NavController,public platform: Platform,private modalCtrl: ModalController,private selector: WheelSelector,public toastCtrl: ToastController, public loadData: LoadData, public params: NavParams){

    this.s3urlPop=global.s3URL;
    this.myVariableNameHere = this.params.get('rest');
    this.setName = this.params.get('setname');

    this.exerciseName = this.params.get('excercisename');
    this.setWorkWeight = this.params.get('setworkweight');
    this.tmax = this.params.get('tmax');
    this.repsMax = this.params.get('maxreps');
    this.repsdone = this.params.get('repsdone');
    this.excerciseId = this.params.get('excerciseid');
    this.maxmorereps = this.params.get('maxmorereps');
    
    this.s3url=global.s3URL;
    
    this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    var d = new Date();
    this.today = d.getFullYear()+"-"+('0' +(d.getMonth()+1)).slice(-2)+"-"+('0' +(d.getDate())).slice(-2);
    
    // this.prescribedReps.numbers=[];
    this.repscount = "";
  
    // var range = parseInt(this.repsMax,10);
    // for(var rr=1;rr<=range;rr++){
    //   this.prescribedReps.numbers.push({description:String(rr)});
    // }

    
  }

  // selectANumber() {

  //   this.selector.show({
  //     title: "Reps Done",
  //     items: [
  //       this.prescribedReps.numbers
  //     ],
  //     defaultItems: [
  //       {index:0, value: this.repsdone}
  //   ]
  //   }).then(
  //     result => {

  //       this.pReps = result[0].description;
  //       this.repscount = 0;

  //       console.log('reps done: ', this.pReps);
  //       console.log('reps count:', this.repscount);

  //     },
  //     err => console.log('Error: ', err)
  //     );
  //   }

  ngOnInit() {
   
  }

  closeModal(){

    this.modalCtrl.dismiss(
      {"moreReps": this.repscount}
    );
    console.log("closereps modal..",this.repscount);
  }
  
 async closeRepsModal() {
   if(this.repscount == '' || this.repscount < 0) {
    //  let toast = await this.toastCtrl.create({
    //     message: "Please enter number of reps possible",
    //     duration: 3000
    //   });
    //   toast.present();
    this.modalCtrl.dismiss(
      {"moreReps": 0}
    );
   } else {
      this.modalCtrl.dismiss(
        {"moreReps": this.repscount}
      );
   }
   console.log("closereps modal..",this.repscount);
  }

  async skipRepsModal() {
      this.modalCtrl.dismiss(
        {"moreReps": this.maxmorereps}
      );
  }
}
