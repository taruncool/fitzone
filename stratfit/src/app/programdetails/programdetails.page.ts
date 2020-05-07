import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController,NavParams} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { CoachprofilePage } from '../coachprofile/coachprofile.page';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { PlanpreviewPage } from '../programdetails/planpreview/planpreview.page';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { ExcpreviewPage } from '../todayworkout/excpreview/excpreview.page';
import { ProgressbarPage } from '../todayworkout/Progressbar/progressbar.page';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';


@Component({
  selector: 'app-programdetails',
  templateUrl: './programdetails.page.html',
  styleUrls: ['./programdetails.page.scss'],
})
export class ProgramdetailsPage implements OnInit {
  planinfo:any;
  s3Url;
  planSet;
  PeriodData=[];
	MesoData=[];
	MicroData=[];
	SessionData=[];
  ExerciseData=[];
  sessionsData=[];
  ExercisesData=[];
  Lpath;
  activePeriod;
  activeMeso;
  activeMicro;
  activeSession;
  activeExercise;
  firstPlan:any;
  freeplan:any;
  prompt;
  id;
  uplanstate:any;
  futureplanid;
  preData = 'idx0';
  preData1 = 'idx0idx0';
  
  microCycleData=[];
  microCycleCount;


  tokken:any;
  loginuseremail:any;
  loginuserfirstname:any;
  phone:any;
  currencyType:any;
  subplandet:any;
  displayCurr:any;
  displayAmnt:any;
  OffData;
  pay_id;
  razorpayprice;
  planDescription:any;
  zeroplaninfo:any;
  reponseStartDate;
  clickbutton;
  barbelData;
  devicetype;
  userCountry;

  nxtrenewdate;
  todydate;

  payment;
  inrPrice;
	currencies = ['INR', 'USD'];
  //prompt;
  defaultDayOff;
  cplan_id;
  cplan_name;
  cplan_photo;
  cplan_startdate;

  token:any;
  altCover;
  altAvatar;
  isShowIcon = true;

  subplaninfo:any;
  fplan:any;
  userid;

  public myVideo: HTMLVideoElement;

  constructor(public navCtrl: NavController,private apiService : ApiService,private streamingMedia: StreamingMedia, public navParams: NavParams,private platform: Platform, private http: HttpClient, private loadData: LoadData, public toastCtrl: ToastController, private alertCtrl: AlertController,private ga: GoogleAnalytics, public modalCtrl: ModalController,public sqlStorageNew: SqlStorageNew){
    this.planinfo = navParams.get("plandetails");
    // let videoArr = [62,63,64,65,70,72,73,79,80,81,82,107,108,109];
    // let rand = videoArr[Math.floor(Math.random() * videoArr.length)];
    // this.planinfo.vid = rand;
    for(let i=0;i<this.planinfo.exercises.length;i++){

      this.planinfo.exercises[i].newExImage = this.planinfo.exercises[i].exercise_id__cover_image;//"http://stratfit.net/newEx/"+this.planinfo.exercises[i].exercise_id+".jpg";

    }

    if(this.planinfo.videos ===" " || this.planinfo.videos ==="" || this.planinfo.videos === null){

      this.isShowIcon = false;

    }
    console.log("PlanInfo -------------------",this.planinfo);
    //this.uplanstate = navParams.get("upstate");
  }

  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.s3Url = global.s3URL;
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
    this.futureplanid = localStorage.getItem('futureplanid');
    if(this.planSet && this.planinfo.price.indexOf("strike")!==-1){
      this.planinfo.price = this.planinfo.price.replace("<strike>","");
      this.planinfo.price = this.planinfo.price.replace("</strike>","");
    }else if(!this.planSet && this.planinfo.price !=='Free'){
      if(!this.planSet && this.planinfo.price.indexOf("strike")==-1){
        this.planinfo.price = '<strike>'+this.planinfo.price+'</strike>';
      }
    }

    this.userid =localStorage.getItem('userId');

    //this.uplanStatusCheck();
    this.userplanChecking();

    if(this.planinfo !='' && this.planinfo !=null && this.planinfo !='undefined'){
      // this.viwPlanStructure();
    }else{
      this.toastmsg("Unable to process your request. Please try after some time");
      // let toast = await this.toastCtrl.create({
      //   message: "Unable to process your request. Please try after some time",
      //   duration: 3000
      // });
      // toast.present();
    }
    let videoid = "exc-video-"+this.planinfo.id;
    var videoElement =  document.getElementById(videoid);

    this.altCover = "assets/images/plan_2.png";
    this.planinfo.plancover = this.planinfo.planPhoto; //"http://stratfit.net/ProgramImages/program"+this.planinfo.id+".png"
    this.altAvatar = "assets/images/icon.png";
    //videoElement.addEventListener('webkitfullscreenchange', this.onFullScreen)
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      //shouldAutoClose: true,
      //controls: false
    };
  }
  
  onAvatarError(){
    this.planinfo.createdBy_id__avatar = this.altAvatar;
  }

  onExImageError(newEx){

    newEx.newExImage = "assets/images/plan_2.png";
  }

  onImageError(){

    this.planinfo.plancover = this.altCover;

  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  //  onFullScreen(){
    
  //   console.log("full screen called---------------");
  //     // var isFullScreen = document.webkitIsFullScreen;
  
  //     // if (isFullScreen) {
  //     //   let options: StreamingVideoOptions = {
  //     //     successCallback: () => { console.log('Video played') },
  //     //     errorCallback: (e) => { console.log('Error streaming') },
  //     //     orientation: 'landscape',
  //     //     //shouldAutoClose: true,
  //     //     //controls: false
  //     //   };
        
  //       this.streamingMedia.playVideo(this.planinfo.videos, options);
        
  //         console.log("full screen called--------------is full screen-");
  //         //alert("registered entered fullscreen and unlocked the orientation");
  
  //     } else {
  //       console.log("full screen called--------------no full screen-");
  //           // set to landscape
          
  //         //alert("registered exit fullscreen and locked the orientation to portrait again");

  //     }

  // }

  playVideo(idplan){
    
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      //shouldAutoClose: true,
      //controls: false
    };
    this.streamingMedia.playVideo(this.planinfo.videos, options);//'http://stratfit.net/ProgramVideos/'+this.planinfo.id+'-preview.mp4'
  }

  async userplanChecking(){
    if(localStorage.getItem('internet')==='online'){
      this.apiService.userplancheck(this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        if(res.success){
          this.firstPlan = false;
          if(res.freeTrail){
            this.freeplan = true;
          }else{
            this.freeplan = false;
          }
        }else{
          this.firstPlan = true;
        }
        },(err) => {
        if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
        }
      });
    }else{
      let toast = await this.toastCtrl.create({
				message: "Please check your internet connectivity and try again",
				duration: 3000
			});
			toast.present();
    }
  }

  async viwPlanStructure(){
     if(localStorage.getItem('internet')==='online'){
      // this.loadData.startLoading();
      var creds = {"plan_id":this.planinfo.encodedurl};
        this.apiService.viewplan_byId(creds,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          console.log("planinfo",response);
            // this.loadData.stopLoading();
            if(res){
              this.PeriodData = JSON.parse(res.plan.PlanJson).PeriodDetails;
             
              //this.getInitLevel();
              //this.putMicroData();
            }else{
              this.toastmsg("Unable to process your request. Please try after some time");
              // let toast = await this.toastCtrl.create({
              //   message: "Unable to process your request. Please try after some time",
              //   duration: 3000
              // });
              // toast.present();
            }
        },(err) => {
          // this.loadData.stopLoading();
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        // });
    })
   }else{
     let toast = await this.toastCtrl.create({
       message: "Please check your internet connectivity and try again",
       duration: 3000
     });
     toast.present();
   }
  }

  putMicroData(){
    this.microCycleData=[];
    this.sessionsData = [];
    this.ExercisesData = [];
    for(let i=0; i<this.PeriodData.length; i++){

      for(let j=0; j<this.PeriodData[i].MesocycleDetails.length; j++){

         for(let k=0; k<this.PeriodData[i].MesocycleDetails[j].MicrocycleDetails.length; k++){

           this.PeriodData[0].MesocycleDetails[j].MicrocycleDetails.showDetails = false;

           this.microCycleData.push(this.PeriodData[0].MesocycleDetails[j].MicrocycleDetails);

        }
    
      }
    }

    this.microCycleCount = this.microCycleData.length;

    for(let i=0; i<= this.microCycleData[0].length; i++) {
      if(this.microCycleData[0][i] != undefined) {
        this.sessionsData.push(this.microCycleData[0][i]);
      }
    }

    for(let j=0; j< this.sessionsData[0].SessionDetails[0].exerciseDetails.length; j++) {
      this.ExercisesData.push(this.sessionsData[0].SessionDetails[0].exerciseDetails[j].ExerciseInfo);
    }

    console.log(this.microCycleData);
  }

  getInitLevel(){
    this.MesoData = this.PeriodData[0].MesocycleDetails;
    this.MicroData = this.MesoData[0].MicrocycleDetails;
    this.SessionData = this.MicroData[0].SessionDetails;
    this.ExerciseData = this.SessionData[0].exerciseDetails;
    this.activePeriod = '0';
    this.activeMeso = '0-0';
    this.activeMicro = '0-0-0';
    this.activeSession = '0-0-0-0';
    this.activeExercise = '0-0-0-0-0';
  };

  public getMesoData(path){
    this.MesoData=[];
    this.MicroData=[];
    this.SessionData=[];
    this.ExerciseData=[];
    this.activePeriod = path;
    this.MesoData = this.PeriodData[path].MesocycleDetails;
  };

  public getMicroData(path){
    this.Lpath = path.split('-');
    this.SessionData=[];
    this.ExerciseData=[];
    this.activeMeso = path;
    this.MicroData =this.MesoData[this.Lpath[1]].MicrocycleDetails;
  };

  public getSessData(path){
    this.Lpath = path.split('-');
    this.ExerciseData=[];
    this.activeMicro = path;
    this.SessionData = this.MicroData[this.Lpath[2]].SessionDetails;
  };

  public getExeData(path){
    this.Lpath = path.split('-');
    this.activeSession = path;
    this.ExerciseData = this.SessionData[this.Lpath[3]].exerciseDetails;
  }
  public getSetData(path){
    this.Lpath = path.split('-');
    this.activeExercise = path;
    this.ExerciseData = this.SessionData[this.Lpath[3]].exerciseDetails;
  }


  public activationalert() {
    this.prompt = this.alertCtrl.create({
      message: 'You have an active workout program. Are you sure you want to activate this program?',
      buttons: [
        {
          text: 'No',
          handler:workout =>{

            setTimeout(() => {
            
              // this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
              // this.myVideo.muted=true;
              // this.myVideo.play();
             // this.myVideo.loop = true;
        
              
            },80);
          }
        },
        {
          text: 'Yes',
          handler: workout => {
            console.log('Saved clicked');
            if(this.planinfo.planPrice === 0){
              this.subplandet = this.planinfo;
              this.userCountry = 190;
              this.zeroPlanSubscription();
            }else{
              this.subplandet = this.planinfo;
              this.userCountry = 190;
              this.zeroPlanSubscription();
            }
          }
        }
      ]
    });
    this.prompt.present();
  }
  public planSubscription(){
    if(!this.firstPlan){
      // setTimeout(() => {
            
      //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
      //   //this.myVideo.muted=true;
      //   if(!this.myVideo.paused){

      //   this.myVideo.pause();
      //   }
       // this.myVideo.loop = true;
  
        
      // },80);
      if(localStorage.getItem("planSet") === "true"){

        this.activationalert();

      }else{

        if(this.planinfo.planPrice === 0){
          this.subplandet = this.planinfo;
          this.userCountry = 190;
          this.zeroPlanSubscription();
        }else{
          this.subplandet = this.planinfo;
          this.userCountry = 190;
          this.zeroPlanSubscription();
        }

      }
      
    }else{
     
      setTimeout(() => {
            
        this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
        //this.myVideo.muted=true;
        this.myVideo.pause();
       // this.myVideo.loop = true;
  
        
      },80);
      this.token = localStorage.getItem('usertoken');
      this.s3Url = global.s3URL;
      this.subplaninfo = this.planinfo;
      this.subplandet = this.planinfo;
      this.userCountry = 190;
      this.fplan = this.firstPlan;

      if (this.platform.is('ios')) {
        this.devicetype = "ios";
      }else if(this.platform.is('android')){
        this.devicetype = "android";
      }

      this.freePlanSubscription();
      //this.newpdcplanSubscribe()
    }
  }

  public zeroPlanSubscription(){
    // this.loadData.startLoading();
    this.createUserPlan();
    //this.newpdcplanSubscribe();
  }

	async createUserPlan(){
    if(localStorage.getItem('internet')==='online'){
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
			var data = {'plan_id':this.subplandet.id, 'deviceType':this.devicetype,'deviceDate':deviceDate+' 00:00:00'};
      return new Promise((resolve) =>{
        // this.http.post(global.baseURL + 'userprogram/createuserplan/', data, {headers: headers})
        //   .subscribe(response => {
        this.apiService.createuserplan(data,this.token).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
            this.loadData.clearDataBaseNew();
              let resvalue = res;
            
              console.log(resvalue);

                for(var j=0;j<resvalue.data.plans.length;j++){
                  var planprice;
                  if(this.platform.is('ios')) {
                    planprice = resvalue.data.plans[j].info.iosPrice;
                  }else if(this.platform.is('android')){
                    planprice = resvalue.data.plans[j].info.price;
                  }
                  localStorage.removeItem('subplanid');
                  /*if(resvalue.data.plans[j].status===1){
                    var activePlanId = resvalue.data.plans[j].plan_id;
                    localStorage.setItem('subplanid',activePlanId);
                  }*/
                  if(resvalue.data.plans[j].status===3){
                    var futureplanId = resvalue.data.plans[j].plan_id;
                    localStorage.setItem('futureplanid',futureplanId);
                  }

                  if(resvalue.data.plans[j].status!=1){
                    this.cplan_id = resvalue.data.plans[j].info.id;
                    this.cplan_name = resvalue.data.plans[j].info.planName;
                    this.cplan_photo =resvalue.data.plans[j].info.planPhoto;
                    let stDate = new Date(resvalue.data.startDate);
                    this.cplan_startdate = this.loadData.dateFormat(stDate);

                    this.reponseStartDate = this.loadData.changeDateFormat(resvalue.data.startDate,'db');
                    this.defaultDayOff = resvalue.data.dayoff;
                    resvalue.data.startDate = this.loadData.changeDateFormat(resvalue.data.startDate,'db');
                    resvalue.data.nextRenewalDate= this.loadData.changeDateFormat(resvalue.data.nextRenewalDate,'db');
                    this.planDescription = resvalue.data.plans[j].info.planDescription.replace(/'/g,"''");
                    resvalue.data.plans[j].info.planName = resvalue.data.plans[j].info.planName.replace(/'/g,"''");
                    this.sqlStorageNew.query("INSERT INTO `userplan` (`startdate`, `nextrenewaldate`, `plan_id`, `user_id`, `status`) VALUES ('"+resvalue.data.startDate+"', '"+resvalue.data.nextRenewalDate+"', '"+resvalue.data.planId+"', '"+resvalue.data.plans[j].user_id+"', '"+resvalue.data.plans[j].status+"')")
                      .catch(err => {
                        console.error('userplan error');
                    });

                    this.sqlStorageNew.query("INSERT INTO `plan` (`id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`,`createdBy`,`createdByImg`, `totalsubscribers`) VALUES ('"+resvalue.data.plans[j].info.id+"','"+resvalue.data.plans[j].info.planName+"', '"+this.planDescription+"', '"+resvalue.data.plans[j].status+"', '"+planprice+"', '"+resvalue.data.plans[j].info.ability+"', '"+resvalue.data.plans[j].info.num_of_periods+"', '"+resvalue.data.plans[j].info.num_of_sessions+"', '"+resvalue.data.plans[j].info.goals+"', '"+resvalue.data.plans[j].info.duration_weeks+"', '"+resvalue.data.plans[j].info.planPhoto+"', '"+resvalue.data.plans[j].info.programType_id+"', '"+resvalue.data.plans[j].info.genWarmupVideo+"', '"+resvalue.data.plans[j].info.cooldownVideo+"', '"+resvalue.data.plans[j].info.createdBy__first_name+"', '"+resvalue.data.plans[j].info.createdBy__avatar+"', '"+resvalue.data.plans[j].info.planUsers+"')")
                    .catch(err => {
                      console.error('plan error');
                    });
                    this.loadData.checkjson(resvalue.data.planId);
                    
                    //this.loadData.checkQuery(false,false,false).then(data=>{
                      // this.loadData.stopLoading();
                      this.modalCtrl.create({
                        component:ProgressbarPage,
                        componentProps:{'uplandata':{'plan_id':this.cplan_id,'planName':this.cplan_name,'planPhoto':this.cplan_photo,'startdate':this.cplan_startdate,'defaultOffDay':resvalue.data.dayoff,'firstplan':false,'exercises':this.planinfo.exercises}}
                        });
                      
                      // let planprogressModal = this.modalCtrl.create(ProgressbarPopup,{'uplandata':{'plan_id':this.cplan_id,'planName':this.cplan_name,'planPhoto':this.cplan_photo,'startdate':this.cplan_startdate,'defaultOffDay':resvalue.data.dayoff,'firstplan':false,'exercises':this.planinfo.exercises}});
                      //planprogressModal.present();
                    //});
                  }
                }
                //this.navCtrl.setRoot(TodayworkoutPage);
            }else{
              this.customAlert();
            }
          }, (err) => {
              // this.loadData.stopLoading();
              if(err.status === 403){
                this.loadData.forbidden();
                this.navCtrl.navigateForward('/login');
                //this.app.getRootNav().setRoot(LoginPage);
              }
          });
      })
    }else{
      this.loadData.stopLoading();
      let toast = await this.toastCtrl.create({
				message: "Please check your internet connectivity and try again",
				duration: 3000
			});
			toast.present();
    }
  }

  async customAlert(){
		this.prompt = await this.alertCtrl.create({
				message:"Unable to process your request. Please try after some time",
				buttons: ['OK']
		});
		this.prompt.present();
  }

  async newpdcplanSubscribe(){

    this.loadData.clearDataBaseNew();

    setTimeout(() => {
    var dDate = new Date();
    var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
    var renewDate = new Date();
    renewDate.setDate(dDate.getDate() + 1);
    var renewDateStr = renewDate.getFullYear() + '-' + ('0' +((renewDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(renewDate.getDate())).slice(-2);
    
    this.sqlStorageNew.query("INSERT INTO `userplan` (`startdate`, `nextrenewaldate`, `plan_id`, `user_id`, `status`) VALUES ('"+deviceDate+"', '"+renewDateStr+"', '"+this.planinfo.id+"', '"+this.userid+"', '0')").catch(err => {
      console.error('--user plan error---');
    });
    console.log("id plan",this.planinfo.id);
    this.loadData.checkjson(this.planinfo.id);
    localStorage.setItem('planSet','true');
                    
    this.sqlStorageNew.query("INSERT INTO `plan` (`id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`,`createdBy`,`createdByImg`,`totalsubscribers`) VALUES ('"+this.planinfo.id+"','"+this.planinfo.planName+"', '"+this.planinfo.planDescription+"', '1', '0', '"+this.planinfo.ability+"', '2', '50', '"+this.planinfo.goals+"', '20', '"+this.planinfo.planPhoto+"', '1', 'www.youtube.com', 'www.youtube.com', 'Daniel', '"+this.planinfo.createdBy__avatar+"', '12')")
                    .catch(err => {
                      console.error('plan error');
                    });
                    // this.loadData.stopLoading();
                    setTimeout(() => {
              
                      this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
                      //this.myVideo.muted=true;
                      if(!this.myVideo.paused){

                        this.myVideo.pause();

                      }
                      
                    // this.myVideo.loop = true;
                      
                    },80);
                    console.log(this.cplan_startdate);
                    // let planprogressModal = this.modalCtrl.create(ProgressbarPopup,{'uplandata':{'plan_id':this.planinfo.id,'planName':this.planinfo.planName,'planPhoto':this.planinfo.planPhoto,'startdate':deviceDate,'defaultOffDay':6,'firstplan':this.fplan,'exercises':this.planinfo.exercises}});
                    // planprogressModal.present();              

                    // this.loadData.stopLoading();
        },500);
  }

  async freePlanSubscription(){
    //  this.loadData.startLoading();
    if(localStorage.getItem('internet')==='online'){
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
      var data = {'plan_id':this.subplaninfo.id,'deviceType':this.devicetype,'deviceDate':deviceDate+' 00:00:00'};
      return new Promise((resolve) =>{
        // this.http.post(global.baseURL + 'userprogram/createuserplan/', data, {headers: headers})
        //   .subscribe(response => {
        this.apiService.createuserplan(data,this.token).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
              if(res.success){
                this.loadData.clearDataBaseNew();
                let resvalue = res;
                for(var j=0;j<resvalue.data.plans.length;j++){
                  var planprice;
                  if(this.platform.is('ios')) {
                    planprice = resvalue.data.plans[j].info.iosPrice;
                  }else if(this.platform.is('android')){
                    planprice = resvalue.data.plans[j].info.price;
                  }
                  
                  resvalue.data.startDate = this.loadData.changeDateFormat(resvalue.data.startDate,'db');
                  let stDate = new Date(resvalue.data.plans[j].startDate);
                  this.cplan_startdate = this.loadData.dateFormat(stDate);
                  //let stDate = new Date(resvalue.data.startDate);
                  //resvalue.data.startDateview = this.loadData.dateFormat(stDate);
                  //let startDateV = resvalue.data.startDateview;
                  resvalue.data.nextRenewalDate = this.loadData.changeDateFormat(resvalue.data.nextRenewalDate,'db');
                  localStorage.setItem('futureplanid',resvalue.data.plans[0].plan_id);

                  this.sqlStorageNew.query("INSERT INTO `userplan` (`startdate`, `nextrenewaldate`, `plan_id`, `user_id`, `status`) VALUES ('"+resvalue.data.startDate+"', '"+resvalue.data.nextRenewalDate+"', '"+resvalue.data.planId+"', '"+resvalue.data.plans[0].user_id+"', '"+resvalue.data.plans[0].status+"')").catch(err => {
                    console.error('--user plan error---');
                  });

                  this.loadData.checkjson(resvalue.data.planId);

                  //this.loadData.checkQuery(false,false,false).then(data=>{
                    localStorage.setItem('planSet','true');
                    resvalue.data.plans[0].info.planDescription = resvalue.data.plans[0].info.planDescription.replace(/'/g,"''");
                    resvalue.data.plans[0].info.planName = resvalue.data.plans[0].info.planName.replace(/'/g,"''");
                    this.sqlStorageNew.query("INSERT INTO `plan` (`id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`,`createdBy`,`createdByImg`,`totalsubscribers`) VALUES ('"+resvalue.data.plans[0].info.id+"','"+resvalue.data.plans[0].info.planName+"', '"+resvalue.data.plans[0].info.planDescription+"', '"+resvalue.data.plans[0].status+"', '"+planprice+"', '"+resvalue.data.plans[0].info.ability+"', '"+resvalue.data.plans[0].info.num_of_periods+"', '"+resvalue.data.plans[0].info.num_of_sessions+"', '"+resvalue.data.plans[0].info.goals+"', '"+resvalue.data.plans[0].info.duration_weeks+"', '"+resvalue.data.plans[0].info.planPhoto+"', '"+resvalue.data.plans[0].info.programType_id+"', '"+resvalue.data.plans[0].info.genWarmupVideo+"', '"+resvalue.data.plans[0].info.cooldownVideo+"', '"+resvalue.data.plans[0].info.createdBy__first_name+"', '"+resvalue.data.plans[0].info.createdBy__avatar+"', '"+resvalue.data.plans[0].info.planUsers+"')")
                    .catch(err => {
                      console.error('plan error');
                    });
                    // this.loadData.stopLoading();
                    setTimeout(() => {
              
                      this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
                      //this.myVideo.muted=true;
                      if(!this.myVideo.paused){

                        this.myVideo.pause();

                      }
                      
                    // this.myVideo.loop = true;
                      
                    },80);
                    console.log(this.cplan_startdate);
                    this.modalCtrl.create({
                    component:ProgressbarPage,
                    componentProps:{'uplandata':{'plan_id':this.subplaninfo.id,'planName':this.subplaninfo.planName,'planPhoto':this.subplaninfo.planPhoto,'startdate':this.cplan_startdate,'defaultOffDay':resvalue.data.dayoff,'firstplan':this.fplan,'exercises':this.planinfo.exercises}}
                    });
                    // planprogressModal.present();
                  //});
                }
            }else{
              // this.loadData.stopLoading();
              this.toastmsg(res.message);
                // this.prompt = await this.alertCtrl.create({
                //     message: response.json().message,
                //     buttons: ['OK']
                // });
                // this.prompt.present();
            }
          },(err) => {
                // this.loadData.stopLoading();
                if(err.status === 403){
                  this.loadData.forbidden();
                  this.navCtrl.navigateForward('/login');
                  //this.app.getRootNav().setRoot(LoginPage);
                }
            });
      })
    }else{
      this.loadData.stopLoading();
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  //redirecting to coachprofile page
  async viewCoachPrf(coachdata){
    this.ga.trackEvent('CoachProfileView',coachdata.coachName,localStorage.getItem('email'));
    let modal = await this.modalCtrl.create({
      component: CoachprofilePage,
      componentProps:{coachInfo:coachdata}
    });
    modal.present();
  }

  backButtonAction() {
    this.modalCtrl.dismiss();
    //this.navCtrl.setRoot(StorePage);
  }
  dashboardpage(){

    this.navCtrl.navigateForward('/dashboard');
    
  }
  async openExercise(Exc){

    // let modal = this.modalCtrl.create(ExercisePage);
    // modal.present();
    setTimeout(() => {
            
      this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
      //this.myVideo.muted=true;
      if(!this.myVideo.paused){
      
        this.myVideo.pause();

      }
     
     // this.myVideo.loop = true;

      
    },800);
    let modal = await this.modalCtrl.create({
      component:ExcpreviewPage,
      componentProps:{ExcDetails:Exc}
    });
    modal.present();
    // modal.onDidDismiss(data=>{
      
      // setTimeout(() => {
     
      //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-'+this.planinfo.id);
      //   this.myVideo.muted=true;
      //   this.myVideo.play();
      //   this.myVideo.loop = true;
          
      //   },800);
      
    
    // });
  }

  toggleDetails(data) {
    this.sessionsData = [];
    if (this.isGroupShown(data)) {
        this.preData = null;
    } else {
        this.preData = data;
    }
    let pos = parseInt(data.charAt(3));
    for(let i=0; i< this.microCycleData[pos].length; i++) {
      if(this.microCycleData[pos][i] != undefined) {
        this.sessionsData.push(this.microCycleData[pos][i]);
      }
    }
    console.log(this.sessionsData);
  }

  toggleDetailsSess(ss) {
    this.ExercisesData = [];
    if (this.isSessShown(ss)) {
        this.preData = null;
        this.preData1 = null;
    } else {
        this.preData1 = ss;
        this.preData = ss;
    }
    let pos = parseInt(ss.charAt(3));
    let pos1 = parseInt(ss.charAt(7));
    for(let j=0; j< this.sessionsData[pos].SessionDetails[pos1].exerciseDetails.length; j++) {
      this.ExercisesData.push(this.sessionsData[pos].SessionDetails[pos1].exerciseDetails[j].ExerciseInfo);
    }
    console.log(this.ExercisesData);
  }

  isGroupShown(data) {
      return this.preData === data;
  }

  isSessShown(ss) {
      return this.preData1 === ss;
  }

  async showPlanInfo() {
    
    // let modal = await this.modalCtrl.create(ExercisePage);
    // modal.present();
    setTimeout(() => {
            
      this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.planinfo.id);
      //this.myVideo.muted=true;
      this.myVideo.pause();
     // this.myVideo.loop = true;

      
    },800);
    let modal = await this.modalCtrl.create({
      component:PlanpreviewPage,
      componentProps:{
        PlanDetails:this.planinfo.planDescription,PlanName:this.planinfo.planName
      }
      });
    modal.present();
    // modal.onDidDismiss(data=>{
  
    // });
  }

}
