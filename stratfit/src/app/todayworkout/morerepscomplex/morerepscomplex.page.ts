import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { LoadData } from '../../../providers/loaddata';

@Component({
  selector: 'app-morerepscomplex',
  templateUrl: './morerepscomplex.page.html',
  styleUrls: ['./morerepscomplex.page.scss'],
})
export class MorerepscomplexPage implements OnInit {
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

  complexActions:any[]=[];
  exDetailsComplex:any[]=[];
  
  prescribedReps = {
    numbers: [
     { description: "1" },
      { description: "2" },
      { description: "3" }
    ]
  };

  constructor(public navCtrl: NavController,public platform: Platform,private selector: WheelSelector,public toastCtrl: ToastController, public loadData: LoadData, public params: NavParams, public modalCtrl: ModalController){

    this.s3urlPop=global.s3URL;
    this.myVariableNameHere = this.params.get('rest');
    this.setName = this.params.get('setname');

    this.complexActions = this.params.get('complexActions');
    this.exDetailsComplex = this.params.get('excercisedetails');
    
    this.s3url=global.s3URL;
    
    this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    var d = new Date();
    this.today = d.getFullYear()+"-"+('0' +(d.getMonth()+1)).slice(-2)+"-"+('0' +(d.getDate())).slice(-2);

    
  }

  selectANumber(action) {

    console.log("Prescribed reps complex", action.reps);
    var pReps = action.reps;
    this.prescribedReps.numbers=[];
    this.repscount = parseInt(pReps,10);
  
    var range = parseInt(pReps,10);
    for(var rr=1;rr<=range;rr++){
      this.prescribedReps.numbers.push({description:String(rr)});
    }

   
    setTimeout(() => {
    this.selector.show({
      title: "Reps Done",
      items: [
        this.prescribedReps.numbers
      ],
      defaultItems: [
        {index:0, value: this.repsdone}
    ]
    }).then(
      result => {

        this.pReps = result[0].description;
        this.repscount = 0;

        console.log('reps done: ', this.pReps);
        console.log('reps count:', this.repscount);

      },
      err => console.log('Error: ', err)
      );
    });
    }

  ngOnInit() {
   
  }
  
 async closeRepsModal() {
   if(this.repscount == '' || this.repscount < 0) {
     let toast = await this.toastCtrl.create({
          message: "Please enter number of reps possible",
          duration: 3000
        });
        toast.present();
   } else {
      this.modalCtrl.dismiss(
        {"complexActionsUpdated": this.complexActions,
        "complexExercises": this.exDetailsComplex}
      );
   }
  }

}
