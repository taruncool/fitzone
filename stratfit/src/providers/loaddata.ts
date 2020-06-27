import { ToastController,Platform, LoadingController } from '@ionic/angular';
import { Injectable,NgZone } from "@angular/core";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { global } from '../app/global';
import 'rxjs/add/operator/toPromise';
import { SqlStorageNew } from './sql-storage-new';
import { async } from '@angular/core/testing';
import { ApiService } from '../app/api.service';

@Injectable()
export class LoadData { 
  loading: any;
	response;
	mainlift;
	genwarmup;
	exwarmup;
	cooldown;
	plan;
	planInfo=[];
	period;
	mesocycles;
	mesocycle;
	microcycles;
	microcycle;
	sessions;
	session;
	exercises;
	exercise;
	worksets;
	workset;
	protocol;
	profileId;
  planStatus;
  exercisedate;
  excomplete;
  sesscomplete;
  microcomplete;
  mesocomplete;
  periodcomplete;
  planData;
  completedSetArr: any[] = [];
  planId:any;
  barbelData;
  devicetype;
  isLoading:boolean;
  programDownloadPercent;
  timeoutCount=0;
  loadCount;

  //----------------------

  planpdcresponse;
  responseExercises;
  planpdc;
  planperiods:any=[];
  plan_messocycle:any=[];
  plan_microcycle:any=[];
  plan_days:any=[];
  plan_sessions:any=[];
  plan_activity:any=[];
  plan_round:any=[];
  plan_actions:any=[];

  plan_exercises:any=[];

  trainingLevelitems;
  trainingLevelcode;
  
  sexCoef;
  bpTmax; 
  bpStressFactor;
  genderD;
  gender:any;
  userAge;
  dob:any;
  weight;
  token;

  constructor(public http: HttpClient,private apiService:ApiService, public toastCtrl: ToastController,public platform: Platform,private loadingCtrl: LoadingController, public sanitizer: DomSanitizer, public ngZone: NgZone,public sqlStorageNew : SqlStorageNew) {
  }

  /**upload loader */
  uploadLoader(){
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Uploading media please wait...',
    });
    this.loading.present();
  }
  async startLoading() {
    this.loadCount=true;
    return await this.loadingCtrl.create({
      // duration: 5000,
    }).then(a => {

      a.present();

        a.onDidDismiss().then((dis) => {
          console.log('Loading dismissed! after 2 Seconds');
        });
      // a.present().then(() => {
      //   console.log('presented');
      //   if (!this.isLoading) {
      //     a.dismiss().then(() => console.log('abort presenting'));
      //   }
      // });
    });
  }

  async stopLoading() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
      this.isLoading = false;
    }, 1000);
    //await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
 async startLoadingOld(){
    this.loadCount=true;
    this.loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Loading please wait',
    });
    await this.loading.present();
  }
  async stopLoadingOld(){
    if(this.loadCount){
      await this.loading.dismiss()
      .then(()=>{
        this.loading = null;
      })
      .catch(e => console.log(e));
      //this.loading.dismiss();
      //this.loadCount=false;
    }
  }
  getProgressBar(percent) {
    let html: string =  '<div text-center><span style="text-align: center">Program Downloading...'+ Math.round(percent)+'%</span><br><progress value="' + percent + '" max="100"></progress></div>';
    if(Math.round(percent)===100){
      this.stopLoading();
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  public forbidden(){
    var logout = localStorage.getItem('logout');
    if(logout){
        this.sqlStorageNew.query("select plan_id from userplan where status = 1").then(
          userPlanData => {
            if(userPlanData.res.rows.length>0){
              this.planId = userPlanData.res.rows.item(0).plan_id;
              //this.getSetDetails();
            }else{
              this.userlogout();
            }
        });
    }else{
      
      var otpdata = {"code":localStorage.getItem('otp'),'email':localStorage.getItem('email')}; 
      
      this.apiService.accountValidateotp(otpdata).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        console.log("validate otp",response);
        localStorage.setItem('usertoken', res.sessiontoken);
        console.log("Auth code...." ,res.sessiontoken);
        this.sqlStorageNew.query("select plan_id from userplan where status = 1").then(
          userPlanData => {
            if(userPlanData.res.rows.length>0){
              this.planId = userPlanData.res.rows.item(0).plan_id;
              //this.getSetDetails();
            }else{
              this.userlogout();
            }
        });
       });
    }
    
  }
 
  public userlogout(){
    this.token = localStorage.getItem('usertoken');
    this.apiService.userlogout(this.token).subscribe((response)=>{
          localStorage.clear();
          localStorage.setItem('internet','online');
         
          this.clearDataBaseNew();
       });
  }

  public deletejson(){
    this.clearDataBaseNew();
  }
  public clearDataBaseNew(){
    return new Promise(resolve => { 
      this.sqlStorageNew.query("DELETE FROM planlevel");
      this.sqlStorageNew.query("DELETE FROM planpurpose");
      this.sqlStorageNew.query("DELETE FROM planmicrocycles");
      this.sqlStorageNew.query("DELETE FROM plandays");
      this.sqlStorageNew.query("DELETE FROM planmesocycle");
      this.sqlStorageNew.query("DELETE FROM plansessions");
      this.sqlStorageNew.query("DELETE FROM planperiod");
      this.sqlStorageNew.query("DELETE FROM planactivity");
      this.sqlStorageNew.query("DELETE FROM plan");
      this.sqlStorageNew.query("DELETE FROM planround");
      this.sqlStorageNew.query("DELETE FROM planactions");
      this.sqlStorageNew.query("DELETE FROM exercises");
      this.sqlStorageNew.query("DELETE FROM plateweights");
      this.sqlStorageNew.query("DELETE FROM userplan");
    });
  }

  public checkjson(id){

    this.programDownloadPercent = 0;
    localStorage.setItem('getpercent',this.programDownloadPercent);
    //this.startLoading();
    var planInfo = {"id": id};
    this.token = localStorage.getItem('usertoken');
    this.weight = localStorage.getItem('weight');
 
    this.gender = localStorage.getItem('gender');
    this.dob = localStorage.getItem('dob');

    this.trainingLevelcode = localStorage.getItem('traininglevel');

    this.apiService.plandetails(this.token,planInfo).subscribe((response)=>{
      console.log("json response",response);
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      this.planpdcresponse = res;
      console.log("ckeck plandetails....",this.planpdcresponse.planStructure);
      console.log("ckeck completed plandetails....",this.planpdcresponse.planCompleted);
              
      for(let i = 0; i<this.planpdcresponse.planStructure.length; i++){
        console.log("...........",this.planpdcresponse.planStructure[i].depthlevel);
        
       
      // if(this.response.planStructure[i].depthlevel === 8) {
      //   this.plan.push(this.response.planStructure[i]);
      //   console.log("INSERT INTO plan (id,planName,planDescription, planStatus) VALUES ('"+this.plan.id+"','"+this.plan.planName+"','"+this.plan.planDescription+"','"+this.plan.planStatus+"')");
      //   this.sqlStorageNew.query("INSERT INTO plan (id,planName,planDescription, planStatus) VALUES ('"+this.plan.id+"','"+this.plan.planName+"','"+this.plan.planDescription+"','"+this.plan.planStatus+"')");
      // }
      if(this.planpdcresponse.planStructure[i].depthlevel === 0) {
        // console.log("depthlevel...........",this.response.planStructure[0].depthlevel);
        this.planperiods.push(this.planpdcresponse.planStructure[i]);

        console.log("INSERT INTO planperiod (period_id,periodName,num_of_mesocycles,plan_id,status) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].period_name+"','"+this.planpdcresponse.planStructure[i].num_of_mesocycles+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].status+"')");
        this.sqlStorageNew.query("INSERT INTO planperiod (period_id,periodName,num_of_mesocycles,plan_id,status) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].period_name+"','"+this.planpdcresponse.planStructure[i].num_of_mesocycles+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].status+"')");
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 1) {
        this.plan_messocycle.push(this.planpdcresponse.planStructure[i]);
        this.sqlStorageNew.query("INSERT INTO planmesocycle (meso_id,plan_id,period_id,mesocycles_name,description,num_of_microcycles,pdc_id,parent_id,status) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].mesocycles_name+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].num_of_microcycles+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].status+"')")
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 2) {
        this.plan_microcycle.push(this.planpdcresponse.planStructure[i]);
        this.sqlStorageNew.query("INSERT INTO planmicrocycles (micro_id,plan_id,period_id,meso_id,micro_name,description,pdc_id,parent_id,status,num_of_days,total_load) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_name+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].status+"','"+this.planpdcresponse.planStructure[i].num_of_days+"','"+this.planpdcresponse.planStructure[i].total_load+"')")
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 3) {
        this.plan_days.push(this.planpdcresponse.planStructure[i]);
        this.sqlStorageNew.query("INSERT INTO plandays (day_id,plan_id,period_id,meso_id,micro_id,day_name,description,pdc_id,parent_id,status,num_of_sessions,total_load,rest_time,date) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_name+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"',0,'"+this.planpdcresponse.planStructure[i].num_of_sessions+"','"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].date+"')")
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 4) {
        this.plan_sessions.push(this.planpdcresponse.planStructure[i]);
        this.sqlStorageNew.query("INSERT INTO plansessions(session_id,plan_id,period_id,meso_id,micro_id,day_id,session_name,description,pdc_id,parent_id,status,num_of_exercises,total_load,rest_time,date) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_name+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].status+"'= 0,'"+this.planpdcresponse.planStructure[i].num_of_exercises+"','"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].date+"')") 
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 5) {
        this.plan_activity.push(this.planpdcresponse.planStructure[i]);
        console.log("INSERT INTO planactivity (activity_id,plan_id,period_id,meso_id,micro_id,day_id,session_id,Activity_name,Activity_type,pdc_id,parent_id,status,total_load,rest_time,description,warm_up,date) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_id_id+"','"+this.planpdcresponse.planStructure[i].Activity_name+"','"+this.planpdcresponse.planStructure[i].Activity_type+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].status+"','"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].warm_up+"','"+this.planpdcresponse.planStructure[i].date+"')")
      
        this.sqlStorageNew.query("INSERT INTO planactivity (activity_id,plan_id,period_id,meso_id,micro_id,day_id,session_id,Activity_name,Activity_type,pdc_id,parent_id,status,total_load,rest_time,description,warm_up,date) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_id_id+"','"+this.planpdcresponse.planStructure[i].Activity_name+"','"+this.planpdcresponse.planStructure[i].Activity_type+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"',0,'"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].warm_up+"','"+this.planpdcresponse.planStructure[i].date+"')")
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 6) { 
        this.plan_round.push(this.planpdcresponse.planStructure[i]);
      
        console.log("INSERT INTO planround (plan_id,period_id,micro_id,day_id,session_id,activity_id,round_id,round_name,exercise_id,pdc_id,parent_id,status,total_load,rest_time,description,round_type,num_of_actions,date) VALUES ('"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_id_id+"','"+this.planpdcresponse.planStructure[i].activity_id_id+"','"+this.planpdcresponse.planStructure[i].round_id+"','"+this.planpdcresponse.planStructure[i].round_name+"','"+this.planpdcresponse.planStructure[i].exercise_id+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].status+"','"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].round_type+"','"+this.planpdcresponse.planStructure[i].num_of_actions+"','"+this.planpdcresponse.planStructure[i].date+"')");
      
        this.sqlStorageNew.query("INSERT INTO planround (plan_id,period_id,meso_id,micro_id,day_id,session_id,activity_id,round_id,round_name,pdc_id,parent_id,status,total_load,rest_time,description,round_type,num_of_actions,date) VALUES ('"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_id_id+"','"+this.planpdcresponse.planStructure[i].activity_id_id+"','"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].round_name+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"',0,'"+this.planpdcresponse.planStructure[i].total_load+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].description+"','"+this.planpdcresponse.planStructure[i].round_type+"','"+this.planpdcresponse.planStructure[i].num_of_actions+"','"+this.planpdcresponse.planStructure[i].date+"')")
      
      }
      if(this.planpdcresponse.planStructure[i].depthlevel === 7) {
        this.plan_actions.push(this.planpdcresponse.planStructure[i]);
        this.sqlStorageNew.query("INSERT INTO planactions (action_id,plan_id,period_id,meso_id,micro_id,day_id,session_id,activity_id,round_id,exercise_id,pdc_id,parent_id,action_type,intensity_range,num_of_sets,min_reps,max_reps,prescribed_reps,all_out,intensity,instruction,rest_time,calculated_ability,intensity_level,extra_ability,hypertrophy_potency,lactate_generate_potency,strength_speed_potency,strength_potency_zone,strength_endurance_potency,date,workweight,repsdone,status,tmax,more_reps) VALUES ('"+this.planpdcresponse.planStructure[i].id+"','"+this.planpdcresponse.planStructure[i].plan_id_id+"','"+this.planpdcresponse.planStructure[i].period_id_id+"','"+this.planpdcresponse.planStructure[i].meso_id_id+"','"+this.planpdcresponse.planStructure[i].micro_id_id+"','"+this.planpdcresponse.planStructure[i].day_id_id+"','"+this.planpdcresponse.planStructure[i].session_id_id+"','"+this.planpdcresponse.planStructure[i].activity_id_id+"','"+this.planpdcresponse.planStructure[i].round_id_id+"','"+this.planpdcresponse.planStructure[i].exercise_id_id+"','"+this.planpdcresponse.planStructure[i].pdc_id+"','"+this.planpdcresponse.planStructure[i].parent_id+"','"+this.planpdcresponse.planStructure[i].action_type+"','"+this.planpdcresponse.planStructure[i].intensity_range+"','"+this.planpdcresponse.planStructure[i].num_of_sets+"','"+this.planpdcresponse.planStructure[i].min_reps+"','"+this.planpdcresponse.planStructure[i].max_reps+"','"+this.planpdcresponse.planStructure[i].prescribed_reps+"','"+this.planpdcresponse.planStructure[i].all_out+"','"+this.planpdcresponse.planStructure[i].intensity+"','"+this.planpdcresponse.planStructure[i].instruction+"','"+this.planpdcresponse.planStructure[i].rest_time+"','"+this.planpdcresponse.planStructure[i].calculated_ability+"','"+this.planpdcresponse.planStructure[i].intensity_level+"','"+this.planpdcresponse.planStructure[i].extra_ability+"','"+this.planpdcresponse.planStructure[i].hypertrophy_potency+"','"+this.planpdcresponse.planStructure[i].lactate_generate_potency+"','"+this.planpdcresponse.planStructure[i].strength_speed_potency+"','"+this.planpdcresponse.planStructure[i].strength_potency_zone+"','"+this.planpdcresponse.planStructure[i].strength_endurance_potency+"','"+this.planpdcresponse.planStructure[i].date+"','"+this.planpdcresponse.planStructure[i].workweight+"'= 0,'"+this.planpdcresponse.planStructure[i].repsdone+"'= 0,'"+this.planpdcresponse.planStructure[i].status+"'== 0,'0','0')").then(
          insertAction => {
            this.programDownloadPercent = ((i/this.planpdcresponse.planStructure.length)*50);
            localStorage.setItem('getpercent',this.programDownloadPercent);
          }
        ) 
      }
        // localStorage.setItem('weightunit',this.weightunit);
        // localStorage.setItem('weight',this.weight);
        

      }
     
      setTimeout(() => {

        if(this.planpdcresponse.planCompleted != null || this.planpdcresponse.planCompleted != undefined ){

          if(this.planpdcresponse.planCompleted.length > 0){
            let tmpRoundId = 0;
            let tmpActivityId = 0;
            let tmpSessionId = 0;
            let tmpDayId = 0;

            for(let i = 0; i<this.planpdcresponse.planCompleted.length; i++){
              console.log("action insert -------- ",this.planpdcresponse.planCompleted[i]);
              var datedb = this.changeDateFormat(this.planpdcresponse.planCompleted[i].actionDate,'db');
              console.log("action date db",datedb);
              
              this.sqlStorageNew.query("UPDATE planactions SET date = '"+datedb+"', intensity = "+this.planpdcresponse.planCompleted[i].actionIntensity+", status = 1, tmax = "+this.planpdcresponse.planCompleted[i].actionTmax+", workweight = "+ this.planpdcresponse.planCompleted[i].actionWorkWeight+", repsdone = "+ this.planpdcresponse.planCompleted[i].totalReps+", updateStatus = 1 where action_id = "+this.planpdcresponse.planCompleted[i].planaction_id);
              if(tmpRoundId != this.planpdcresponse.planCompleted[i].planaction_id__round_id_id) {
                this.sqlStorageNew.query("UPDATE planround SET date = '"+datedb+"', status = 1 where round_id = "+this.planpdcresponse.planCompleted[i].planaction_id__round_id_id);
                tmpRoundId = this.planpdcresponse.planCompleted[i].planaction_id__round_id_id;
              }
              if(tmpActivityId != this.planpdcresponse.planCompleted[i].planaction_id__activity_id_id) {
                this.sqlStorageNew.query("UPDATE planactivity SET date = '"+datedb+"', status = 1 where activity_id = "+this.planpdcresponse.planCompleted[i].planaction_id__activity_id_id);
                tmpActivityId = this.planpdcresponse.planCompleted[i].planaction_id__activity_id_id;
              }
              if(tmpSessionId != this.planpdcresponse.planCompleted[i].planaction_id__session_id_id) {
                this.sqlStorageNew.query("UPDATE plansessions SET date = '"+datedb+"', status = 1 where session_id = "+this.planpdcresponse.planCompleted[i].planaction_id__session_id_id);
                tmpSessionId = this.planpdcresponse.planCompleted[i].planaction_id__session_id_id;
              }
              if(tmpDayId != this.planpdcresponse.planCompleted[i].planaction_id__day_id_id) {
                this.sqlStorageNew.query("UPDATE plandays SET date = '"+datedb+"', status = 1 where day_id = "+this.planpdcresponse.planCompleted[i].planaction_id__day_id_id).then(
                  updatedDays => {
                    let programDownloadPercentTmp = this.programDownloadPercent + ((i/this.planpdcresponse.planStructure.length)*20);
                    let setPrcntDn = this.programDownloadPercent + programDownloadPercentTmp;
                    localStorage.setItem('getpercent',setPrcntDn);
                    if(i === (this.planpdcresponse.planCompleted.length - 1)) {
                      this.programDownloadPercent = 70;
                    }
                  }
                );
                tmpDayId = this.planpdcresponse.planCompleted[i].planaction_id__day_id_id;
              }
              
      
            }
            setTimeout(() => {
            localStorage.setItem('current_action',this.planpdcresponse.planCompleted[this.planpdcresponse.planCompleted.length-1].planaction_id);
            },300);
            
          } else {
            this.programDownloadPercent = 70;
          }

        }
    

      },500);
   
     
      var today = new Date();
      var startDate = today.getFullYear()+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+ ('0' +(today.getDate())).slice(-2);
      
      console.log(startDate);
      
      localStorage.setItem('startDate',startDate);
      //this.stopLoading();
      this.getExercisesNew();

  }),(err) =>{
    if(err.status === 403){
      this.forbidden();
      this.userlogout();
      this.stopLoading();
      //this.app.getRootNav().setRoot(LoginPage);
    }
  }
}


public getExercises(){
  //this.startLoading();
  var planInfo = {"id": 1}
  this.weight = parseInt(localStorage.getItem('weight'));
  this.gender = localStorage.getItem('gender');
  this.trainingLevelcode = localStorage.getItem('traininglevel');

  this.apiService.newextypedetailspdc(this.token).subscribe((response)=>{
    console.log("ex data-----load data", response);
    var trainingCoeff;
    this.responseExercises = response;

    if(this.responseExercises.success){

      var dispDate = new Date();
      let todayDateObj = new Date(dispDate.getFullYear(), dispDate.getMonth(), dispDate.getDate());
      let laswDateiOS;
      if (this.platform.is('ios')) {
        this.devicetype = "ios";
        laswDateiOS= this.changeDateFormat(localStorage.getItem('dob'),this.devicetype);
      }else if(this.platform.is('android')){
        laswDateiOS= localStorage.getItem('dob');
      }
      var lastWDate = new Date(laswDateiOS);
      let lastWorkDateObj = new Date(lastWDate.getFullYear(), lastWDate.getMonth(), lastWDate.getDate());
      var Difference_In_Time = todayDateObj.getTime() - lastWorkDateObj.getTime();   
      // To calculate the no. of days between two dates 
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      this.userAge = Difference_In_Days / 365;

      console.log("inside if success");
      this.plan_exercises =[];
      for(let i = 0; i<this.responseExercises.defaultExArr.length; i++){

       
        if(this.responseExercises.defaultExArr[i].id == 18){

          this.bpStressFactor = this.responseExercises.defaultExArr[i].stressFactor;
         
          if(this.trainingLevelcode === '1'){

            trainingCoeff = ( -125.2282 + 7.433832*this.weight - 0.1400854*Math.pow(this.weight,2) + 0.001481318*Math.pow(this.weight,3) - 0.000008099478*Math.pow(this.weight,4) + 0.00000001757845*Math.pow(this.weight,5))

          }else if(this.trainingLevelcode === '2'){

            trainingCoeff = ( -79.90166 + 5.77842*this.weight - 0.1156817*Math.pow(this.weight,2) + 0.001395196*Math.pow(this.weight,3) - 0.000008502967*Math.pow(this.weight,4) + 0.00000001980793*Math.pow(this.weight,5));

          }else if(this.trainingLevelcode === '3'){

            trainingCoeff = ( -223.9568 + 13.53008*this.weight - 0.2692058*Math.pow(this.weight,2) + 0.002925213*Math.pow(this.weight,3) - 0.00001603288*Math.pow(this.weight,4) + 0.00000003435019*Math.pow(this.weight,5))
          
          }else if(this.trainingLevelcode ==='4'){

            trainingCoeff = ( -308.3964 + 18.42303*this.weight - 0.3593033*Math.pow(this.weight,2) + 0.003822592*Math.pow(this.weight,3) - 0.00002060758*Math.pow(this.weight,4) + 0.00000004364961*Math.pow(this.weight,5))

          }else if(this.trainingLevelcode ==='5'){

            trainingCoeff = ( -455.4944 + 26.4788*this.weight - 0.5184144*Math.pow(this.weight,2) + 0.00547829*Math.pow(this.weight,3) - 0.00002927773*Math.pow(this.weight,4) + 0.00000006152669*Math.pow(this.weight,5))
          
          }

          if(this.gender === '1'){

            this.sexCoef = 1;

          }

          if(this.gender === '2'){

            this.sexCoef = 1.6;

          }

        this.bpTmax = Math.round((trainingCoeff/this.sexCoef)/(1.034572 - 0.01097307*this.userAge + 0.0003342467*Math.pow(this.userAge,2) - 0.000004837999*Math.pow(this.userAge,3) + 0.00000008533835*Math.pow(this.userAge,4) - 0.0000000003859893*Math.pow(this.userAge,5)));
         
        if(this.bpTmax < 20){

          this.bpTmax = 20;

        }

        console.log("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+this.bpTmax+"','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
      
        this.sqlStorageNew.query("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+this.bpTmax+"','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
        this.plan_exercises.push({"tmax":this.bpTmax,"updatetmax":this.bpTmax,"id":+this.responseExercises.defaultExArr[i].id,"exerciseName":this.responseExercises.defaultExArr[i].exName});
        break;
          
        }
      }

      
      let exTmax = 0;
      for(let i = 0; i<this.responseExercises.defaultExArr.length; i++){
        if(this.responseExercises.defaultExArr[i].id != 18){         
          exTmax =  Math.round(this.bpTmax * (this.responseExercises.defaultExArr[i].stressFactor/this.bpStressFactor)); 

          if(exTmax < 20){

            exTmax = 20;

          }

          // console.log("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+exTmax+"','0')");
      
          this.sqlStorageNew.query("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+exTmax+"','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')").then(
            insertExercise => {
              let programDownloadPercentTmp2 = ((i/this.responseExercises.defaultExArr.length)*30);
              let setPrcntDn2 = this.programDownloadPercent + programDownloadPercentTmp2;
              localStorage.setItem('getpercent',setPrcntDn2);
              if(i === (this.responseExercises.defaultExArr.length - 1)) {
                this.programDownloadPercent = 100;
              }
            }
          );
        }
        this.plan_exercises.push({"tmax":exTmax,"updatetmax":exTmax,"id":+this.responseExercises.defaultExArr[i].id,"exerciseName":this.responseExercises.defaultExArr[i].exName});
      }

      setTimeout(() => {
        this.updateTmaxServer(this.plan_exercises);
      }, 500)
      
    
  }
  //this.stopLoading();
});
}



public getExercisesNew(){
  //this.startLoading();
  var planInfo = {"id": 1}
  this.apiService.newextypedetailspdc(this.token).subscribe((response)=>{
    console.log("ex data-----load data", response);
    var trainingCoeff;
     this.responseExercises = response;

    if(this.responseExercises.success){

      console.log("inside if success");

      this.plan_exercises =[];

      this.token = localStorage.getItem('usertoken');
      this.apiService.getupdatedTmax(this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
       let tmaxResponseJson = res;
        if(!tmaxResponseJson.success) {
          this.sqlStorageNew.query("DELETE FROM exercises").then(
            deleteData => {
              this.getExercises();
            }
          );
        } else {

          if(this.responseExercises.defaultExArr.length > tmaxResponseJson.details.length) {
            this.getExercises();
          } else {
            for(let i = 0; i<this.responseExercises.defaultExArr.length; i++){      
              var exTmax = Math.round(this.bpTmax);          
              this.sqlStorageNew.query("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','0','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
            }
            for(let j = 0; j < tmaxResponseJson.details.length; j++) {
              this.sqlStorageNew.query("update exercises set tmax = " + tmaxResponseJson.details[j].updateTmax + ", updatetmax = " + tmaxResponseJson.details[j].updateTmax + " where id = " + tmaxResponseJson.details[j].exerciseId_id).then(
                updateExc => {
                  let programDownloadPercentTmp4 = ((j/tmaxResponseJson.details.length)*15);
                  let setPrcntDn4 = this.programDownloadPercent + programDownloadPercentTmp4;
                  localStorage.setItem('getpercent',setPrcntDn4);
                  if(j === (tmaxResponseJson.details.length - 1)) {
                    this.programDownloadPercent = 100;
                    localStorage.setItem('getpercent',this.programDownloadPercent);
                  }
                }
              );
            }
          }
        }
      });
      
    
  }
  //this.stopLoading();
});
}

async updateTmaxServer(exercises){
    if(localStorage.getItem('internet')==='online'){
      this.startLoading();
      let usertoken = localStorage.getItem('usertoken');
      var tmaxdata = {tmaxData:exercises};
      this.apiService.updateBulkTmaxData(tmaxdata,usertoken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
            this.stopLoading();
            if(res.success){
              this.toastmsg("Tmax updated successfully");
            }else{
            }
        },(err) => {
          this.toastmsg(err);
          if(err.status === 403){
            this.forbidden();
            //this.nav.setRoot(LoginPage);
            //this.app.getRootNav().setRoot(LoginPage);
          }
          this.stopLoading();
        });
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
      this.stopLoading();
    }
  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  public getTmax(){
    
    let token = localStorage.getItem('usertoken');
    
    this.apiService.usertestExercise(token).subscribe((response)=>{
        //  var respon = response.json();
        // this.updateTmax(respon.tmaxDetails);
    });
  }
  public updateTmax(tmax){
    for(var j=0;j<tmax.length;j++){
      this.sqlStorageNew.query("UPDATE exercises SET tmax="+tmax[j].updateTmax+" ,updatetmax="+tmax[j].updateTmax+" WHERE id="+tmax[j].exerciseId_id);
      console.log('start update: '+tmax[j].exerciseName);
    }
    var lastIndex = false;
    for(var k=0;k<tmax.length;k++){
      //lastIndex = (tmax.length=== k+1)?true:false;
      this.updateDerivedTmax(tmax[k]);
    }
    console.log('update done');
	}
  updateDerivedTmax(exDetail){
    this.sqlStorageNew.query("SELECT * FROM exercises where derivedFrom="+exDetail.exerciseId_id+" and updatetmax=0 and accessLevel=0").then(
      sdata => {
        for(var i=0;i<sdata.res.rows.length;i++){
          var updatedWW = Math.round(exDetail.updateTmax*sdata.res.rows.item(i).derivedFormula);
          this.sqlStorageNew.query("UPDATE exercises SET tmax="+updatedWW+", updatetmax="+updatedWW+" WHERE id = " + sdata.res.rows.item(i).id).then(data=>{
            /*if(lastIndex && sdata.res.rows.length===i+1){
              //localStorage.setItem('tmaxUpdateDone','true');
            }*/
          });
        }
      }
    );
  }
 

  public convertWeight(weight,status){
    var tempWeight,we;
    if(localStorage.getItem('weightunit')==='lbs'){
      if(status==='view'){
        tempWeight = parseFloat(weight);
        we = Math.ceil(tempWeight*2.20462);
        return we;
      }else {
        tempWeight = parseInt(weight,10);
        we = Math.ceil(tempWeight*0.45359237);
        return we;
      }
    }else{
      tempWeight = parseInt(weight,10);
      we = Math.ceil(tempWeight);
      return we;
    }
  }

  public currencyConversion(price,status,usInInr){
    if(localStorage.getItem('currencyType')==='INR'){
      //if(status==='view'){
        var tempPrice = parseFloat(price);
        var we = (tempPrice*usInInr);
        return we;
      //}
    }else{
      return (price);
    }
  }

  public currencyConversionUSD(price,status,usInUSD){
    if(localStorage.getItem('currencyType')==='USD'){
      //if(status==='view'){
        //var tempPrice = parseFloat(price);
        var we = usInUSD;
        //var wer = we.toFixed(2);
        return we;
      //}
    }else{
      return (price);
    }
  }

  public insertPlan(plans){
    for(var pl =0;pl<plans.length;pl++){
      this.planData = plans[pl].info;
      this.planData.planStatus = (this.planData.planStatus)?1:0;
      this.planData.planDescription = this.planData.planDescription.replace(/'/g,"''");
      this.planData.planName = this.planData.planName.replace(/'/g,"''");
      var planprice;
      if (this.platform.is('ios')) {
        planprice= this.planData.iosPrice;
      }else if(this.platform.is('android')){
        planprice = this.planData.price;
      }
      /*console.log("INSERT INTO plan (id, planName, planDescription, planStatus, price, ability, num_of_periods, num_of_sessions, goals, duration_weeks, planPhoto, programType_id, genWarmupVideo, cooldownVideo, createdBy, createdByImg, totalsubscribers) VALUES ('"+this.planData.id+"', '"+this.planData.planName+"', '"+this.planData.planDescription+"', '"+this.planData.planStatus+"', '"+this.planData.price+"', '"+this.planData.ability+"', '"+this.planData.num_of_periods+"', '"+this.planData.num_of_sessions+"', '"+this.planData.goals+"', '"+this.planData.duration_weeks+"', '"+this.planData.planPhoto+"', '"+this.planData.programType_id+"', '"+this.planData.genWarmupVideo+"', '"+this.planData.cooldownVideo +"','"+this.planData.createdBy__first_name +"','"+this.planData.createdBy__avatar +"','"+this.planData.planUsers +"')");*/     
      this.sqlStorageNew.query("INSERT INTO plan (id, planName, planDescription, planStatus, price, ability, num_of_periods, num_of_sessions, goals, duration_weeks, planPhoto, programType_id, genWarmupVideo, cooldownVideo,createdBy, createdByImg, totalsubscribers,planPhoto) VALUES ('"+this.planData.id+"', '"+this.planData.planName+"', '"+this.planData.planDescription+"', '"+this.planData.planStatus+"', '"+planprice+"', '"+this.planData.ability+"', '"+this.planData.num_of_periods+"', '"+this.planData.num_of_sessions+"', '"+this.planData.goals+"', '"+this.planData.duration_weeks+"', '"+this.planData.planPhoto+"', '"+this.planData.programType_id+"', '"+this.planData.genWarmupVideo+"', '"+this.planData.cooldownVideo +"','"+this.planData.createdBy__first_name +"','"+this.planData.createdBy__avatar +"','"+this.planData.planUsers +"','"+this.planData.planPhoto +"')").catch(err => {
        console.error('Unable to create initial storage tables plan = '+this.planData.planName, err.tx, err.err);
      });
    }
  }
  public changeDateFormat(dateFormat,status){
    var dateF,separator,rsep;
    rsep = (dateFormat.indexOf("T")!==-1)?"T":" ";
    separator = (this.platform.is('android')||(status==="db"))?" ":"T";
    var dateFormatArr = dateFormat.split(rsep);
    dateFormatArr[1] = (dateFormatArr[1]=== undefined)?"00:00:00":dateFormatArr[1];
    var dateArr = dateFormatArr[0].split("-");
    var TimeArr = dateFormatArr[1].split(":");
    TimeArr[2] = TimeArr[2].replace("Z","");
    dateF = dateArr[0]+"-"+('0' +dateArr[1]).slice(-2)+"-"+('0' +dateArr[2]).slice(-2)+separator+('0' +TimeArr[0]).slice(-2)+":"+('0' +TimeArr[1]).slice(-2)+":"+('0' +TimeArr[2]).slice(-2);
    return dateF;
  }

  public dateFormat(reqDate){
    var Month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var retDate = ('0' +(reqDate.getDate())).slice(-2)+"/"+Month[reqDate.getMonth()]+"/"+reqDate.getFullYear();
    return retDate;
  }

  public convertToUSD(inr) {
    this.http.get('https://free.currencyconverterapi.com/api/v6/convert?q=USD_INR')
        .subscribe(response=>{
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
            var price1 = this.currencyConversionUSD(inr,'view',res.results.USD_INR.val);
            return price1;
        });
  }

  public insertPlateWeights(){
      this.token = localStorage.getItem('usertoken');
      this.apiService.getplateweights(this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          if(res.success){
			this.barbelData = res;
			if(this.barbelData.barbelWts.length===0){
				this.barbelData.barbelWts = [{'weight':10,'count':1,'checked':true,'barbell':1,'index':0,'status':1},{'weight':15,'count':1,'checked':true,'barbell':1,'index':1,'status':1},{'weight':20,'count':1,'checked':true,'barbell':1,'index':2,'status':1}];

				this.barbelData.plateWts = [{'weight':50,'count':4,'checked':true,'barbell':0,'index':0,'status':1},{'weight':30,'count':4,'checked':true,'barbell':0,'index':1,'status':1},{'weight':20,'count':4,'checked':true,'barbell':0,'index':2,'status':1},{'weight':15,'count':4,'checked':true,'barbell':0,'index':3,'status':1},{'weight':10,'count':4,'checked':true,'barbell':0,'index':4,'status':1},{'weight':7.5,'count':4,'checked':true,'barbell':0,'index':5,'status':1},{'weight':5,'count':4,'checked':true,'barbell':0,'index':6,'status':1},{'weight':2.5,'count':4,'checked':true,'barbell':0,'index':7,'status':1},{'weight':1,'count':4,'checked':true,'barbell':0,'index':8,'status':1}];
			}
			for(var n=0; n<this.barbelData.barbelWts.length; n++){
              this.sqlStorageNew.query("INSERT INTO `plateweights` (`weight`, `count`, `barbell`, `status`, `index`) VALUES ('"+this.barbelData.barbelWts[n].weight+"','"+this.barbelData.barbelWts[n].count+"','"+this.barbelData.barbelWts[n].barbell+"','"+this.barbelData.barbelWts[n].status+"','"+this.barbelData.barbelWts[n].index+"')")
              .catch(err => {
                console.error('---------barbelweights-----------');
              });
            }
            for(var m=0; m<this.barbelData.plateWts.length; m++){
              this.sqlStorageNew.query("INSERT INTO `plateweights` (`weight`, `count`, `barbell`, `status`, `index`) VALUES ('"+this.barbelData.plateWts[m].weight+"','"+this.barbelData.plateWts[m].count+"','"+this.barbelData.plateWts[m].barbell+"','"+this.barbelData.plateWts[m].status+"','"+this.barbelData.plateWts[m].index+"')")
              .catch(err => {
                console.error('---------plateweights-----------');
              });
            }
		  }
	 })

  }
  loginSuccess(res){
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('usertoken', res.sessiontoken);
    localStorage.setItem('userId', res.user_id);
    localStorage.setItem('loggedAs', res.username);
    localStorage.setItem('email', res.userDetails);
    localStorage.setItem('firstname', res.fname);
    localStorage.setItem('lastname', res.lname);
    localStorage.setItem('avatar', res.avatar);
    localStorage.setItem('coverImage', res.coverImage);
    localStorage.setItem('orgId', res.orgId);
    localStorage.setItem('gender', res.profile.gender);
    localStorage.setItem('dob', res.profile.dob1);
    localStorage.setItem('weight', res.profile.weight);
    localStorage.setItem('height', res.profile.height);
    localStorage.setItem('heightunit', res.profile.heightUnit);
    localStorage.setItem('weightunit', res.profile.weightUnit);
    localStorage.setItem('profileSet', res.isProfileSet);
    localStorage.setItem('planSet', res.isPlanSet);
    localStorage.setItem('tmaxSet', res.isTmaxSet);
    localStorage.setItem('currencyType', res.currencyType);
    localStorage.setItem('phone', res.phone);
    localStorage.setItem('phonecode', res.phonecode);
    localStorage.setItem('otp', res.otp);
    localStorage.setItem('userType', res.userType);
    localStorage.setItem('isSoundOn', "false");
    localStorage.setItem('isVibrateOn', "false");
    localStorage.setItem('micropopupon','0');
    if(res.userType===8){
      localStorage.setItem('privacyAccess', res.privacy);
    }
    localStorage.setItem('traininglevel', res.profile.trainingLevel);
    localStorage.setItem('categorylevel', 'true');
    if (this.platform.is('ios')) {
      localStorage.setItem('appVersion', res.iosVersion);
    }else if(this.platform.is('android')){
      localStorage.setItem('appVersion', res.androidVersion);
    }
    
    this.insertPlateWeights();
    if(res.plans.length !== 0){
      // localStorage.setItem('subplanid',response.plans[0].plan_id);
      for(var k=0; k<res.plans.length; k++){
        if(res.plans[k].status===1){
          var activePlanId = res.plans[k].plan_id;
          localStorage.setItem('subplanid',activePlanId);
        }
        else if(res.plans[k].status===3){
          var futureplanId = res.plans[k].plan_id;
          localStorage.setItem('futureplanid',futureplanId);
        }
        else{
          var previousplanId = res.plans[k].plan_id;
          localStorage.setItem('previousplanid',previousplanId);
        }

      }	
    }
    for(var gw = 0; gw < res.generalWarmup.length; gw++) {
      this.genwarmup = res.generalWarmup[gw];
      console.log("INSERT INTO `genwarmup` (`direction`, `equipment`, `extime`, `name`, `reps`) VALUES ('"+this.genwarmup.Direction+"', '"+this.genwarmup.Equipment+"', '"+this.genwarmup.ExTime+"', '"+this.genwarmup.Name+"', '"+this.genwarmup.Reps+"')");
      this.sqlStorageNew.query("INSERT INTO `genwarmup` (`direction`, `equipment`, `extime`, `name`, `reps`) VALUES ('"+this.genwarmup.Direction+"', '"+this.genwarmup.Equipment+"', '"+this.genwarmup.ExTime+"', '"+this.genwarmup.Name+"', '"+this.genwarmup.Reps+"')").catch(err => {
        console.error('Unable to create initial storage tables planprotocol = '+this.genwarmup.name, err.tx, err.err);
      });
    }
    for(var cd = 0; cd < res.Cooldown.length; cd++) {
      this.cooldown = res.Cooldown[cd];
      console.log("INSERT INTO `cooldown` (`name`) VALUES ('"+this.cooldown.name+"')");
      this.sqlStorageNew.query("INSERT INTO `cooldown` (`name`) VALUES ('"+this.cooldown.name+"')").catch(err => {
        console.error('Unable to create initial storage tables cooldown = '+this.cooldown.name, err.tx, err.err);
      });
    } 
  }
}