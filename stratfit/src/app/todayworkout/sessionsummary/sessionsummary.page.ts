import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@Component({
  selector: 'app-sessionsummary',
  templateUrl: './sessionsummary.page.html',
  styleUrls: ['./sessionsummary.page.scss'],
})
export class SessionsummaryPage implements OnInit {
  day_id;
  ses_id;
  today;
  sessionData=[];
  planDayss=[];
  planActivity=[];
  planRounds=[];
  actionData=[];
  planexerciseData=[];

  tempSessionData=[];
  tempActivity=[];
  tempAction=[];
  tempExeData= [];
  currentDisplayDay;
  currentDisplaySes;    
  currentactivity_id;
  currentactivityType;
  currentexercise_id;

  totalreps;
  totalweight;
  Tmax;
  Tonnage;
  Work;
  cal;
  // metrics;
  todaydayId;
  firstname;
  fromPage;
  Showtmax = false;

  // Show = true;
  // Showworkout = true;

  constructor(public navCtrl: NavController,public platform: Platform,public navParams: NavParams,public sqlStorageNew:SqlStorageNew,public loadData: LoadData){}
  
  ngOnInit() {
  this.ses_id = this.navParams.get("session_id");
  // console.log("session id...",this.ses_id);
  this.day_id = this.navParams.get("day_id");
  this.fromPage = localStorage.getItem('fromPage');
  this.todaydayId = localStorage.getItem('todayDayId');
  this.firstname = localStorage.getItem('firstname');
  
  this.sessionData=[];
  this.planDayss=[];
  this.planActivity=[];
  this.planRounds=[];
  this.actionData=[];
  this.planexerciseData=[];

  this.tempSessionData=[];
  this.tempActivity=[];
  this.tempAction=[];
  this.tempExeData= [];
 /* calculating next workout */
 var dayId = 0;
// this.loadData.startLoading();
// this.platform.registerBackButtonAction(() => {

//   localStorage.setItem('totalreps','');
//   localStorage.setItem('totalweight','');
//   localStorage.setItem('tonnage','');
//   localStorage.setItem('work','');
//   localStorage.setItem('cal','');
//   setTimeout(() => {
//   this.navCtrl.navigateForward('/dashboard');
//   }, 300);

// });


this.sqlStorageNew.query("select * from plansessions where day_id="+this.day_id).then(
    plansessionData => {
      for(let mi = 0; mi < plansessionData.res.rows.length; mi++) {
        // console.log("session data", plansessionData.res.rows.item(mi));
        this.sessionData.push(plansessionData.res.rows.item(mi));
        if(this.sessionData[mi].session_id === this.ses_id){
            var dayId = this.sessionData[mi].day_id;
        }
        console.log("session table day id",dayId);
      }
    });
  this.sqlStorageNew.query("select * from planactivity where day_id="+this.day_id).then(
    activityData => {
      for(let mi = 0; mi < activityData.res.rows.length; mi++) {
        this.planActivity.push(activityData.res.rows.item(mi));
      }
    }
  );
  
  this.sqlStorageNew.query("select * from planround where day_id="+this.day_id).then(
    roundData => {
      for(let mi = 0; mi < roundData.res.rows.length; mi++) {
        this.planRounds.push(roundData.res.rows.item(mi));
      }
    }
  );
  this.sqlStorageNew.query("select * from planactions where day_id="+this.day_id).then(
    planactionData => {
      for(let mi = 0; mi < planactionData.res.rows.length; mi++) {
        this.actionData.push(planactionData.res.rows.item(mi));
      }
   //   console.log("action data",this.actionData);
    });
  

  this.sqlStorageNew.query("select * from exercises").then(
    exerciseData => {
      for(let mi = 0; mi < exerciseData.res.rows.length; mi++) {
        
        this.planexerciseData.push(exerciseData.res.rows.item(mi));
      }
    }
  );
  setTimeout(() => {
    this.getSessData(this.day_id,this.currentDisplaySes);
    // this.getActivity(this.ses_id);
   }, 1000);
  }
  
public getSessData(day_id,currentDisplaySes){
  console.log("session data",day_id);
  this.tempSessionData = [];
  
  for(let i=0;i<this.sessionData.length;i++){

    if(this.sessionData[i].day_id == day_id){
      // console.log("session status for tab------------------",this.sessionData[i].status);
           if(this.sessionData[i].status == 1){
      // console.log("session  push workout------------------",this.sessionData[i].status);
      this.tempSessionData.push(this.sessionData[i]);

    } 
    }
  }
  this.currentDisplaySes =this.tempSessionData[0].session_id;
  setTimeout(() => {
    // console.log("session status",this.tempSessionData[0].status)
    for(let j = 0; j < this.tempSessionData.length; j++) {
      if(this.tempSessionData[j].session_id === this.ses_id) {
        this.currentDisplayDay = this.day_id;
        this.currentDisplaySes =this.tempSessionData[j].session_id;
      }
    }
  this.getActivity(this.currentDisplaySes);
  }, 300)
}

public getActivity(ses_id){

  this.currentDisplaySes = ses_id;
  this.tempActivity = []
  // console.log("getActivity method session....id ",ses_id)
  for(let i=0;i<this.planActivity.length;i++){
    if(this.planActivity[i].session_id== ses_id){
      this.tempActivity.push(this.planActivity[i]);
    }
    // this.currentactivity_id = this.tempActivity[i].activity_id;
    // this.currentactivityType = this.tempActivity[i].Activity_type;
  }
  this.currentactivity_id = this.tempActivity[0].activity_id;
  this.currentactivityType = this.tempActivity[0].Activity_type; 
  setTimeout(() => {
     this.getAction(this.currentactivity_id,this.currentactivityType);
  }, 400)
 }


public getAction(activity_id,Activity_type){
   console.log("action data,round id....",activity_id);
   this.tempAction = [];
  
  for(let i=0;i<this.actionData.length;i++){
    if(this.actionData[i].activity_id== activity_id){
      this.tempAction.push(this.actionData[i]);
    }
  }
  console.log("temp action",this.tempAction);
  this.currentactivity_id=activity_id;
  // this.currentexercise_id = this.tempAction[0].exercise_id;
 
if(Activity_type === "Simple"){
 // console.log("simple activity"); 
  this.tempExeData = [];   
  setTimeout(() => {
    console.log("tempactions",this.tempAction[0]);
    console.log("inside if get action condition",this.tempAction[0].exercise_id)
    this.getExercise(this.tempAction[0].exercise_id,Activity_type);
    //  this.Showtmax = false;
}, 500)

}else{
  console.log("complex activity");  
  this.tempExeData = [];
for(let i=0;i<this.tempAction.length;i++){
setTimeout(() => {
//  console.log("inside if get action condition",this.tempAction[0].action_id)
this.getExercise(this.tempAction[i].exercise_id,Activity_type);
// this.Showtmax = true;
}, 500)
}
}

/*Calculating total reps,avg Weight*/
this.totalweight = 0;
var totalrepss = 0;
var count = 0;
var totalweightt = 0;
for(let ia=0; ia < this.tempAction.length; ia++){
  // console.log("reps done",this.tempAction[ia].repsdone);
 
  totalrepss =  totalrepss + this.tempAction[ia].repsdone; 
 
if(this.tempAction[ia].action_type === "MainSet"){
console.log("main set....")
 count++;
totalweightt = (totalweightt + this.tempAction[ia].workweight);

}
}
this.totalreps = totalrepss;
this.totalweight = (totalweightt/count).toFixed();
/*  calculation end */
}
public getExercise(exercise_id,Activity_type){

console.log("ex data of exercise_id",exercise_id);

// console.log("ex data of exercise_id",exercise_id);
// console.log("temp exe data...",this.tempExeData);

if(this.tempExeData.length > 0){

const checkExIdExistence = exId => this.tempExeData.some(({id}) => id == exId);

console.log(checkExIdExistence(exercise_id));

  if(!checkExIdExistence(exercise_id)){

    for(let i=0;i<this.planexerciseData.length;i++){

      if(this.planexerciseData[i].id == exercise_id){

           console.log("tem ex data", exercise_id);
           console.log("tem ex data if condition", this.planexerciseData[i].id);
           this.tempExeData.push(this.planexerciseData[i]);
    
        }

    }

  }
  
}else{
// let i = 0;
console.log("first push");
for(let i=0;i<this.planexerciseData.length;i++){
  if(this.planexerciseData[i].id== exercise_id){
    // if(this.tempExeData[i].id != exercise_id){
    this.tempExeData.push(this.planexerciseData[i]);
    // i++;
    // }
  }
}
}

/*Calculating Tmax */
if(this.tempAction[0].repsdone == 0 || this.tempAction[0].status == 0){
this.Tmax = 0;
}else{
this.Tmax = 0;
var tmaxx = 0;
for(let ia=0; ia < this.tempExeData.length; ia++){
  // console.log("temp actions",this.tempExeData[ia].tmax);
 
  tmaxx =  tmaxx + this.tempExeData[ia].tmax; 
  this.Tmax = tmaxx.toFixed();

}
}
// console.log("tmaxx....",this.Tmax);
/*Calculating Tonnage, Work, Calories */
if(Activity_type === "Simple"){
console.log("simple activity"); 
this.Showtmax = false;
this.Tonnage=0;
this.Work= 0;
var calories = 0;
var stressFactor = this.tempExeData[0].stressFactor;
console.log("stress factor",stressFactor);
var totalTonnage = parseFloat(((this.totalweight*this.totalreps)/1000).toFixed(2));
var totalwork = Math.round(stressFactor*9.8*this.totalweight*this.totalreps);
calories = Math.round(totalwork * 0.238902957619); 
this.Tonnage = totalTonnage ;
this.Work = totalwork ;
this.cal = calories;
}else{
this.Showtmax = true;
this.Tonnage=0;
this.Work= 0;
var calories = 0;
var totalTonnage = parseFloat(((this.totalweight*this.totalreps)/1000).toFixed(2));
var totalwork = Math.round(9.8*this.totalweight*this.totalreps);
calories = Math.round(totalwork * 0.238902957619); 
console.log("total work",totalwork);
this.Tonnage = totalTonnage ;
this.Work = totalwork ;
this.cal = calories;
}
console.log("calories",this.cal);
// this.loadData.stopLoading(); 
localStorage.setItem('totalreps','');
localStorage.setItem('totalweight','');
localStorage.setItem('tonnage','');
localStorage.setItem('work','');
localStorage.setItem('cal','');
}
dietInfo(){
this.navCtrl.navigateForward('/dietprofile');
}
backButtonAction(){

localStorage.setItem('totalreps','');
// localStorage.setItem('tmax','');
localStorage.setItem('totalweight','');
localStorage.setItem('tonnage','');
localStorage.setItem('work','');
localStorage.setItem('cal','');
setTimeout(() => {
this.navCtrl.navigateForward('/dashboard');
}, 300);

}
}
