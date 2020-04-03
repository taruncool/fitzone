import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../app/global";
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {
  planInfo:any;
  // userInfo:any;
  token;
  coachPhoto;
  s3url;
  noplan;
  Lpath;
  // levelPath;
  currentFullPath;
  activeMesoName;
  activeMeso;
  activeMicro;
  activePeriod;
  activeMicroName;
  dayData;
  today: String="";
  metrics;
  activityType;
  // roundstatus = false;

  mesoArrTemp=[];
  tempMicroDataM=[];
  tempSessionData=[];
  tempDayData=[];
  tempActivity=[];
  tempRound=[];
  tempAction=[];
  tempExeData=[];
  currentPeriodss=[];

  PeriodData=[];
  MesoData=[];
  MicroData=[];

  MesoDataM=[];
  MicroDataM=[];
  planDayss=[];
  sessionData=[];
  planActivity=[];
  planRounds=[];
  planexerciseData=[];
  actionData=[];
  PeriodDataF=[];

  showroundid;
  currentPeriod;
  currentDisplayDay :number;
  currentDisplaySes;
  nextDisplySes;
  currentDisplayActivity;
  currentDisplayActivityType;
  totalweight;
  totalreps;
  Tmax;
  Tonnage;
  Work;
  cal;
  Show = true;
  Showtmax = false;
  workweight = true;

  planSet;

  lastactionID = 0;
  lastroundID = 0;
  lastactivityID = 0;
  lastsessionID = 0;
  lastdayID = 0;
  lastmicroID = 0;
  lastmesoID = 0;
  lastperiodID = 0;

  constructor(public navCtrl: NavController,public platform: Platform, public navParams: NavParams, public modalCtrl: ModalController,public sqlStorageNew : SqlStorageNew,public loadData: LoadData) {
    this.planInfo = { "id": 0, "planPhoto": "", "planName": "" };
    // this.userInfo = { "startDate": ""};
  }


  public openGchart(){
    // let modal = this.modalCtrl.create(GoogleChart);
    // modal.present();
  }

  ionViewDidLoad() {
     
  }

  ngOnInit() {
    this.loadData.startLoading();
    this.s3url=global.s3URL;
    this.currentFullPath="0-0-0-0-0"

    this.PeriodData=[];
    this.MesoDataM=[];
    this.MicroDataM=[];
    this.planDayss=[];
    this.PeriodDataF=[];
    this.currentPeriodss=[];
   
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
    
    this.noplan = false;
    this.sqlStorageNew.query("select p.* from userplan u left join plan p on u.plan_id = p.id where u.status = 1").then(
      data => {
        // console.log(data);
        if(data.res.rows.length > 0){
          this.planInfo = { "id": data.res.rows.item(0).id, 
          "planPhoto": data.res.rows.item(0).planPhoto,
           "planName": data.res.rows.item(0).planName ,
           "coachPhoto":global.s3URL +data.res.rows.item(0).createdByImg,
           "coachName":data.res.rows.item(0).createdBy,
            "durationWeeks":data.res.rows.item(0).duration_weeks,};
          this.coachPhoto=data.res.rows.item(0).createdByImg;
          console.log(this.planInfo);
        }else{
          this.noplan = true;
          this.loadData.stopLoading();
        }
      }
    ).catch(err => {
      // console.error('--2--'+JSON.stringify(err));
    });
    this.metrics = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    if(this.metrics =='Lb'){
      for(var i=0;i<this.tempAction[i].workweight.length;i++){
      var cal = Math.round(this.tempAction[i].workweight * 0.238902957619); /* converting lbs to kgs for calculations */
      console.log("workunits in analytics",cal);
      }
    }else{
      var cal=0;
    }

    this.sqlStorageNew.query("select * from userplan where status = 1").then(
      userplanData => {
      
        // console.log(this.planInfo);
        var periodCount = -1;
        if(userplanData.res.rows.length>0){
        var planId = userplanData.res.rows.item(0).plan_id;
        // var startDate = userplanData.res.rows.item(0).startdate;
        // console.log("start date of plan",startDate);
         console.log("start date of plan",userplanData.res.rows.item(0).plan_id);
        this.sqlStorageNew.query("select plan_id,num_of_mesocycles,period_id,id,periodName,status from planperiod").then(
          periodData => {
            for(let p = 0; p < periodData.res.rows.length; p++) {
              var dataPeriodObj = {"periodName":periodData.res.rows.item(p).periodName, 
              "period_id":periodData.res.rows.item(p).period_id, "status":periodData.res.rows.item(p).status};
              this.PeriodDataF.push(dataPeriodObj);
            }
            // console.log("period data",this.PeriodDataF);
            // console.log("period id",this.PeriodDataF[0].period_id);
            this.currentPeriod = this.PeriodDataF[0].period_id;
            this.sqlStorageNew.query("SELECT * FROM planactions WHERE status = 1 order by action_id desc limit 1").then(
              lastActionData => {
                if(lastActionData.res.rows.length > 0) {
                  this.lastactionID = lastActionData.res.rows.item(0).action_id;
                  this.lastroundID = lastActionData.res.rows.item(0).round_id;
                  this.lastactivityID = lastActionData.res.rows.item(0).activity_id;
                  this.lastsessionID = lastActionData.res.rows.item(0).session_id;
                  this.lastdayID = lastActionData.res.rows.item(0).day_id;
                  this.lastmicroID = lastActionData.res.rows.item(0).micro_id;
                  this.lastmesoID = lastActionData.res.rows.item(0).meso_id;
                  this.lastperiodID = lastActionData.res.rows.item(0).period_id;
                }
              }
            );


            this.sqlStorageNew.query("select * from planmesocycle").then(
              mesoData => {
                for(let me = 0; me < mesoData.res.rows.length; me++) {                     
                  this.MesoDataM.push(mesoData.res.rows.item(me));
                }
                console.log("meso data",this.MesoDataM);
              }
            );         
            this.sqlStorageNew.query("select * from planmicrocycles").then(
              microData => {
                for(let mi = 0; mi < microData.res.rows.length; mi++) {                   
                this.MicroDataM.push(microData.res.rows.item(mi));
                }
                console.log(this.MicroDataM);
              }
            );
  // setTimeout(() => {
            this.sqlStorageNew.query("select * from plandays").then(
              planDays => {
                for(let mi = 0; mi < planDays.res.rows.length; mi++) {
                this.planDayss.push(planDays.res.rows.item(mi));
                }
              // console.log(this.planDayss);
               }
            );
  // }, 300);

            this.sqlStorageNew.query("select * from plansessions").then(
              plansessionData => {
                for(let mi = 0; mi < plansessionData.res.rows.length; mi++) {
                this.sessionData.push(plansessionData.res.rows.item(mi));
                }
              }
            );
            this.sqlStorageNew.query("select * from planactivity").then(
              activityData => {
                for(let mi = 0; mi < activityData.res.rows.length; mi++) {
                 
                  this.planActivity.push(activityData.res.rows.item(mi));
                }
              }
            );
            this.sqlStorageNew.query("select * from planround").then(
              roundData => {
                for(let mi = 0; mi < roundData.res.rows.length; mi++) {
                  this.planRounds.push(roundData.res.rows.item(mi));
                }
              }
            );
            this.sqlStorageNew.query("select * from planactions pa").then(
              planactionData => {
                for(let mi = 0; mi < planactionData.res.rows.length; mi++) {
                  this.actionData.push(planactionData.res.rows.item(mi));
                }
              }
            );
            // setTimeout(() => {
            this.sqlStorageNew.query("select * from exercises").then(
              exerciseData => {
                for(let mi = 0; mi < exerciseData.res.rows.length; mi++) {
                  this.planexerciseData.push(exerciseData.res.rows.item(mi));
                }
                //  console.log("plan exercise data",this.planexerciseData);
              }
            );
  // }, 300); 
  setTimeout(() => {
    this.currentPeriodss = [];
    if(this.PeriodDataF.length > 0){
      for(let i=0;i<this.PeriodDataF.length;i++){
        this.currentPeriodss.push(this.PeriodDataF[i]);
      }
      this.currentPeriod =  this.currentPeriodss[0].period_id;
      this.platform.ready().then(() => {
      this.onMesoChange(this.currentPeriod);
    });
  }
  }, 3500);                      
             
  }); 
  }
});
  }
  onMesoChange(period_id){
    console.log("on meso change ",period_id);
  this.mesoArrTemp = [];
  for(let i=0;i<this.MesoDataM.length;i++){
    if(this.MesoDataM[i].period_id == period_id){
      this.mesoArrTemp.push(this.MesoDataM[i]);
      // console.log("inside meso Arrat temp",this.mesoArrTemp);
    }
  }
  this.activeMesoName = this.mesoArrTemp[0].meso_id;
  for(let j =0; j < this.mesoArrTemp.length; j++) {
    if(this.mesoArrTemp[j].meso_id === this.lastmesoID) {
      this.activeMesoName = this.mesoArrTemp[j].meso_id;
      this.currentPeriod = this.lastperiodID;
    }
  }
  setTimeout(() => {
    // console.log("inside if condition on mesoChange",this.mesoArrTemp[0].meso_id)
  this.onMicroChange(this.activeMesoName);
  }, 300);
  }
  onMicroChange(meso_id){
    // console.log("on micro change ",meso_id);
    this.tempMicroDataM = []
    for(let i=0;i<this.MicroDataM.length;i++){
      if(this.MicroDataM[i].meso_id == meso_id){
        this.tempMicroDataM.push(this.MicroDataM[i]);
      this.activeMicroName=this.tempMicroDataM[0].micro_id;
     }
    }
    setTimeout(() => {
      this.activeMicroName = this.tempMicroDataM[0].micro_id;
      for(let j = 0; j < this.tempMicroDataM.length; j++) {
        if(this.tempMicroDataM[j].micro_id === this.lastmicroID) {
          this.activeMicroName = this.tempMicroDataM[j].micro_id;
        }
      }
    this.getDayData();
    // this.currentDisplaySes =this.tempSessionData[0].session_id;
    }, 400);
  }
  
  public getDayData(){
    // console.log("on day change ",this.activeMicroName);
    this.tempDayData = [];
    // this.today = '';
    for(let i=0;i<this.planDayss.length;i++){
      if(this.planDayss[i].micro_id == this.activeMicroName){
        this.tempDayData.push(this.planDayss[i]);
      }
    }
    this.today ="";
    this.currentDisplayDay = this.tempDayData[0].day_id; 
    var todayDate = this.tempDayData[0].date;
    //this.today  = ('0' +(todayDate.getDate())).slice(-2) + '-' + ('0' +(todayDate.getMonth()+1)).slice(-2) + '-' +todayDate.getFullYear();
    // this.tempDayData[0].date= this.today;
    setTimeout(() => {
       for(let j = 0; j < this.tempDayData.length; j++) {
        if(this.tempDayData[j].day_id === this.lastdayID) {
          this.currentDisplayDay = this.tempDayData[j].day_id;
          //var todayDate2 = new Date(this.tempDayData[j].date);
          todayDate = this.tempDayData[j].date;
        }
       }
      this.getSessData(this.currentDisplayDay,todayDate);
      console.log("current day data id",this.currentDisplayDay,this.today);
   
    }, 400);
  }
  public getSessData(day_id,today){
    // console.log("session data",day_id);
    this.tempSessionData = [];
    if(today != "undefined") {
  
          this.today ="";
          var todayDate = new Date(today);
          this.today  = ('0' +(todayDate.getDate())).slice(-2) + '-' + ('0' +(todayDate.getMonth()+1)).slice(-2) + '-' +todayDate.getFullYear();
   
    } else {
      this.today = '';
    }
    
    for(let i=0;i<this.sessionData.length;i++){
      if(this.sessionData[i].day_id == day_id){
        this.tempSessionData.push(this.sessionData[i]);
      }
    }
     this.currentDisplayDay = day_id;
    this.currentDisplaySes =this.tempSessionData[0].session_id;
    // console.log("current display session id",this.currentDisplaySes);
      setTimeout(() => {
      // console.log("inside if condition",this.tempSessionData[0].session_id)
      for(let j = 0; j < this.tempSessionData.length; j++) {
        if(this.tempSessionData[j].session_id === this.lastsessionID) {
          this.currentDisplayDay = this.lastdayID;
          this.currentDisplaySes =this.tempSessionData[j].session_id;
        }
      }
    this.getActivity(this.currentDisplaySes);
    }, 300)
  }
  
  
  public getActivity(session_id){
    this.workweight = true;
    // console.log("activity data",session_id);
    this.tempActivity = []
    for(let i=0;i<this.planActivity.length;i++){
      if(this.planActivity[i].session_id== session_id){
        this.tempActivity.push(this.planActivity[i]);
      }
    }
    if(this.tempActivity[0].status == 1){
      this.workweight = false;
    }else{
      this.workweight = true;
    }
    this.currentDisplaySes = session_id;
    this.currentDisplayActivity = this.tempActivity[0].activity_id;
    this.currentDisplayActivityType =this.tempActivity[0].Activity_type;
    setTimeout(() => {
      for(let j =0; j < this.tempActivity.length; j++) {
        if(this.tempActivity[j].activity_id === this.lastactivityID) {
          this.currentDisplaySes = this.lastsessionID;
          this.currentDisplayActivity = this.lastactivityID;
          this.currentDisplayActivity = this.tempActivity[j].activity_id;
          this.currentDisplayActivityType = this.tempActivity[j].Activity_type;
         }
      }
       this.getRoundActions(this.currentDisplayActivity,this.currentDisplayActivityType);
    }, 300)
    // if(this.tempActivity[0].Activity_type === "Simple"){ 
    //   this.activityType = 'simple';
    //   // console.log("simple activity",this.currentDisplayActivity);
    //   setTimeout(() => {
    //      this.tempAction = [];
    //   this.getRound(this.currentDisplayActivity,this.tempActivity[0].Activity_type);
    //   }, 300)
    // }else{
    //    setTimeout(() => {
    //     this.activityType = '';
    //     // console.log("complex activity",this.currentDisplayActivity);
    //    this.getRound(this.currentDisplayActivity,this.tempActivity[0].Activity_type);
    //    }, 300)
    //  }
    // setTimeout(() => {
    //   this.getRoundActions(this.currentDisplayActivity,this.currentDisplayActivityType);
    // }, 300)
   }
  
   public getRoundActions(activity_id,Activity_type){
    console.log("activity id in get round action method",activity_id);
    
    this.tempAction = [];
    this.tempExeData=[];
    this.tempRound=[];
    if(Activity_type === "Simple"){
      console.log("activity simple",activity_id);
      this.activityType = 'simple';
      this.getAction(activity_id,Activity_type);
    }
   
   if(Activity_type === "Complex"){
    console.log("activity complex",activity_id);
    this.activityType = '';
     this.getRound(activity_id,Activity_type);
   }
  }
   public getRound(activity_id,activity_type){
     console.log("round data",activity_id);
    this.tempRound = []
    for(let i=0;i<this.planRounds.length;i++){
      if(this.planRounds[i].activity_id== activity_id){
        this.tempRound.push(this.planRounds[i]);
      } 
    }
    this.currentDisplayActivity=activity_id;
    setTimeout(() => {
      this.tempAction = [];
       console.log("inside if round condition",this.tempRound[0].round_id)
      this.currentDisplayActivity=activity_id;
      this.showroundid=this.tempRound[0].round_id;
      let roundExs;
      for(let j = 0; j < this.tempRound.length; j++) {
        if(this.tempRound[j].round_id === this.lastroundID) {
          this.currentDisplayActivity=this.lastactivityID;
          this.showroundid=this.tempRound[j].round_id;
        }
  
        this.sqlStorageNew.query("select distinct(exercise_id) from planactions where round_id = " + this.tempRound[j].round_id + " group by exercise_id").then(
          distinctEx => {
            this.tempExeData = [];
            for(let ee= 0; ee<distinctEx.res.rows.length; ee++) {
              //roundExs = this.findRoundActions(distinctEx.rows.res.item(ee).exercise_id,this.tempRound[j].round_id);
              this.getExercise(distinctEx.res.rows.item(ee).exercise_id,this.tempRound[j].round_id);
            }
            this.tempRound[j].exercises = this.tempExeData;
            let nowExes = [];
            for(let ej = 0; ej < this.tempRound[j].exercises.length; ej++) {
              nowExes.push({"exID":this.tempRound[j].exercises[ej].id,"exerciseName":this.tempRound[j].exercises[ej].exerciseName, "round_id":this.tempRound[j].round_id});
            }
            this.tempRound[j].exes = nowExes;
            console.log("Rounds Data", this.tempRound);
          }
        );
          
        this.tempAction = this.getActionComplex(this.currentDisplayActivity,activity_type,this.tempRound[j].round_id);
    }
    }, 400)
   }
  
   public findRoundActions (ex_id, roundID) {
    let tempActions = [];
    for(let i=0;i<this.actionData.length;i++){
      if(this.actionData[i].exercise_id == ex_id && this.actionData[i].round_id == roundID){
        tempActions.push(this.actionData[i]);
      }
    }
    return tempActions;
   }
   
  public getAction(activity_id,activity_type){
    // console.log("action data,round id....",activity_id);
     this.tempAction = [];
    for(let i=0;i<this.actionData.length;i++){
      if(this.actionData[i].activity_id == activity_id){
        this.tempAction.push(this.actionData[i]);
      }
    }
    this.currentDisplayActivity=activity_id;
    /*Calculating total reps,avg Weight*/
    this.totalweight = 0
     var totalrepss = 0;
     var avgweightt = 0;
     var count = 0;
      for(let ia=0; ia < this.tempAction.length; ia++){
        // console.log("temp actions",this.tempAction[ia].repsdone);
       
      totalrepss =  totalrepss + this.tempAction[ia].repsdone; 
     
      if(this.tempAction[ia].action_type === "MainSet"){
        if(this.tempAction[ia].status == 1){
        console.log("main set....");
         count = count + 1;
         avgweightt = avgweightt + this.tempAction[ia].workweight;
        }
      } 
    }
    this.totalreps = totalrepss;
    // console.log("count....",count);
    this.totalweight = (avgweightt/count).toFixed();
  
    if(activity_type === "Simple"){
      this.activityType = 'simple';
      this.tempExeData = [];  
      setTimeout(() => {
        this.getExerciseSimple(this.tempAction[0].exercise_id,this.tempAction[0].round_id);
        this.Showtmax = false;
      }, 500)
    }else{
      this.activityType = '';
      this.tempExeData = [];
       for(let i=0;i<this.tempAction.length;i++){
        setTimeout(() => {
        //  console.log("inside if get action condition",this.tempAction[i].action_id)
        this.getExercise(this.tempAction[i].exercise_id,this.tempAction[i].round_id);
        // }
        console.log("exercise..... round id",this.tempAction[i].round_id);
        this.Showtmax = true;
        }, 500)
      }
    }
  }
  
  public getActionComplex(activity_id,activity_type,round_id){
    // console.log("action data,round id....",activity_id);
     this.tempAction = [];
     this.Showtmax = true;
    for(let i=0;i<this.actionData.length;i++){
      if(this.actionData[i].activity_id == activity_id){
        this.tempAction.push(this.actionData[i]);
      }
    }
    /*Calculating total reps,avg Weight*/
    this.totalweight = 0
     var totalrepss = 0;
     var avgweightt = 0;
     var count = 0;
      for(let ia=0; ia < this.tempAction.length; ia++){
        // console.log("temp actions",this.tempAction[ia].repsdone);
       
      totalrepss =  totalrepss + this.tempAction[ia].repsdone; 
     
      if(this.tempAction[ia].action_type === "MainSet"){
        if(this.tempAction[ia].status == 1){
        console.log("main set....")
         count = count + 1;
         avgweightt = avgweightt + this.tempAction[ia].workweight;
        //  console.log("workweight set....",avgweightt);
        }
      }
    }
    this.totalreps = totalrepss;
    this.totalweight = (avgweightt/count).toFixed();
  
      this.activityType = '';
      this.tempExeData = [];
      let roundExs = [];
     
    return this.tempAction;
  }
  
  public getExerciseSimple(exercise_id,round_id){
   
    if(this.tempExeData.length > 0){
      const checkExIdExistence = exId => this.tempExeData.some(({id}) => id == exId);
      console.log(checkExIdExistence(exercise_id));
        if(!checkExIdExistence(exercise_id)){
  
          for(let i=0;i<this.planexerciseData.length;i++){
  
            if(this.planexerciseData[i].id == exercise_id){
                 console.log("tem ex data", exercise_id);
                 console.log("tem ex data if condition", this.planexerciseData[i].id);
                 //let thisExercise = this.planexerciseData[i];
                 //thisExercise.round_id = round_id;
                 this.tempExeData.push(this.planexerciseData[i]);
                 this.tempExeData[this.tempExeData.length-1].round_id = round_id;
          
              }
  
          }
          console.log("All round actions", this.tempExeData);
        }
        
    }else{ 
      // console.log("first push");
      for(let i=0;i<this.planexerciseData.length;i++){
        if(this.planexerciseData[i].id== exercise_id){
          this.tempExeData.push(this.planexerciseData[i]);
          this.tempExeData[0].round_id = round_id;
        }
      }
    }
  
    // console.log("temp ex data =============", this.tempExeData);
     /*Calculating Tmax */
    if(this.tempAction[0].repsdone == 0 || this.tempAction[0].status == 0){
      this.Tmax = 0;
    }else{
      this.Tmax = 0;
    var tmaxx = 0;
      for(let ia=0; ia < this.tempExeData.length; ia++){
      tmaxx =  tmaxx + this.tempExeData[ia].tmax; 
      this.Tmax = tmaxx.toFixed();
      }
    }
    if(this.tempAction[0].status == 1){
      this.Show = false;
    }else{
      this.Show = true;
    }
   
    console.log("tmaxx....",this.Tmax);
    /*Calculating Tonnage, Work, Calories */
    this.Tonnage=0;
    this.Work= 0;
    var calories = 0;
    // let UserWeight = this.loadData.convertWeight(localStorage.getItem('weight'),"db");
    var stressFactor = this.tempExeData[0].stressFactor;
    var weight = this.loadData.convertWeight(weight,'db');
    // console.log("stress factor",stressFactor);
    var totalTonnage = parseFloat(((this.totalweight*this.totalreps)/1000).toFixed(2));
    var totalwork = Math.round(stressFactor*9.8*this.totalweight*this.totalreps);
    calories = Math.round(totalwork * 0.238902957619); /* converting lbs to kgs for calculations */
      
    this.Tonnage = totalTonnage ;
    this.Work = totalwork ;
    this.cal = calories;
    if(isNaN(this.totalweight || this.Tonnage || this.Work || this.cal)){
      this.Show = true;
    }
  
    this.loadData.stopLoading();
    return this.tempExeData;
  }
  
  public getExercise(exercise_id,round_id){
   
    if(this.tempExeData.length > 0){
      const checkExIdExistence = exId => this.tempExeData.some(({id}) => id == exId);
      console.log(checkExIdExistence(exercise_id));
        //if(!checkExIdExistence(exercise_id)){
  
          for(let i=0;i<this.planexerciseData.length;i++){
  
            if(this.planexerciseData[i].id == exercise_id){
                 console.log("tem ex data", exercise_id);
                 console.log("tem ex data if condition", this.planexerciseData[i].id);
                 //let thisExercise = this.planexerciseData[i];
                 //thisExercise.round_id = round_id;
                 this.tempExeData.push(this.planexerciseData[i]);
                 this.tempExeData[this.tempExeData.length-1].round_id = round_id;
          
              }
  
          }
          console.log("All round actions", this.tempExeData);
        //}
        
    }else{ 
      // console.log("first push");
      for(let i=0;i<this.planexerciseData.length;i++){
        if(this.planexerciseData[i].id== exercise_id){
          this.tempExeData.push(this.planexerciseData[i]);
          this.tempExeData[0].round_id = round_id;
        }
      }
    }
  
    // console.log("temp ex data =============", this.tempExeData);
     /*Calculating Tmax */
    if(this.tempAction[0].repsdone == 0 || this.tempAction[0].status == 0){
      this.Tmax = 0;
    }else{
      this.Tmax = 0;
    var tmaxx = 0;
      for(let ia=0; ia < this.tempExeData.length; ia++){
      tmaxx =  tmaxx + this.tempExeData[ia].tmax; 
      this.Tmax = tmaxx.toFixed();
      }
    }
    if(this.tempAction[0].status == 1){
      this.Show = false;
    }else{
      this.Show = true;
    }
   
    console.log("tmaxx....",this.Tmax);
    /*Calculating Tonnage, Work, Calories */
    this.Tonnage=0;
    this.Work= 0;
    var calories = 0;
    
    var totalTonnage = parseFloat(((this.totalweight*this.totalreps)/1000).toFixed(2));
    var totalwork = Math.round(9.8*this.totalweight*this.totalreps);
    calories = Math.round(totalwork * 0.238902957619); /* converting lbs to kgs for calculations */
      
    this.Tonnage = totalTonnage ;
    this.Work = totalwork ;
    this.cal = calories;
    if(isNaN(this.totalweight || this.Tonnage || this.Work || this.cal)){
      this.Show = true;
    }
    this.loadData.stopLoading();
    return this.tempExeData;
  }
}
