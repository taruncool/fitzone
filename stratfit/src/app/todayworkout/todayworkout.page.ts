import { Component, OnInit,ViewChild, NgZone, Input } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController,IonSlides,IonContent, IonSegment} from '@ionic/angular';
import { global } from "../../app/global";
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { CalendarPage } from '../calendar/calendar.page';
import { CalendarModule ,CalendarComponentOptions, DayConfig, CalendarResult} from "ion2-calendar";
import { TmaxsummaryPage } from '../tmaxsummary/tmaxsummary.page';
import { MysubscriptionPage } from '../mysubscription/mysubscription.page';
import { StartdatePage } from '../startdate/startdate.page'; 
import { PlanrenewalPage } from '../planrenewal/planrenewal.page';
import { ProgramdetailsPage } from '../programdetails/programdetails.page';
import { PlancompletedPage } from '../planrenewal/plancompleted/plancompleted.page';
import { TmaxpreviewPage } from './tmaxpreview/tmaxpreview.page';
// import Moment from 'moment';
import { ExcpreviewPage } from './excpreview/excpreview.page';
import { MorerepsPage } from './morereps/morereps.page';
import { MorerepscomplexPage } from './morerepscomplex/morerepscomplex.page';
import { SessionsummaryPage } from './sessionsummary/sessionsummary.page';
import { ShowexercisePage } from './showexercise/showexercise.page';
import { TimerpopupPage } from '../workout/timerpopup/timerpopup.page';
import { WtcalpopupPage } from '../workout/wtcalpopup/wtcalpopup.page';
import { InstpopupPage } from '../workout/instpopup/instpopup.page';


@Component({
  selector: 'app-todayworkout',
  templateUrl: './todayworkout.page.html',
  styleUrls: ['./todayworkout.page.scss'],
})
export class TodayworkoutPage implements OnInit {
// @ViewChild('Slides', {static:false}) slider: IonSlides;
@ViewChild('Content', {static:false}) content: IonContent;
 @Input("settabs") segmenttabs;
@ViewChild('pageTopWorkout',{static:false}) pageTop: IonContent;
slidesOptions = { initialSlide: 0 }

 @ViewChild("segments",{static:false}) segments: IonSegment;

public myVideo: HTMLVideoElement;
public showVideo: any = true;
alert;
swiper: any;
page: any;
alertApp;
tokken: string;
workoutdata: any;
planInfo: any;
sessionInfo: any;
setInfo: any;
planStartDate: any;
message: any;
todaySessionID: any;
planComplete;
restDay;
notStarted;
nextExDate;
dayDiff;
todayComplete;
metrics;
toDayDate;
sessionCount;
dayOff;
dayOffIndex;
planSetStatus;
workoutSet;
planSetMsg;
renewPlan;
activateFuturePlan;
todayTimestamp;
changeDate;
futurePlanName;
FPdiffDays;
futurePlanId;
futurePlanPhoto;
renewDate;
FPDays;
firstPlan;
internetConn;
initialState;
coachImg;
lastSessId;
sameDayPlanComplete;
freeplan;
futurestartdate;
offDay;
coachName;
coachPhoto;
userplancheckDone;
microcycleCount;
todayFuturePlan;
prompt;
s3url;
reActivate;
continueWorkout;
totalSets;
planSessionCount;
planExerciseCount;
tmaxArr;
sessionResume: boolean = false;
totalSetsDone;
sessExIds;
workoutFinish;
allSetSkip;
workoutSkip;

selectedLevel;
excerciseInfo: any;

activeExcerciseDetails: any;
items_a;
options;
numberSlides = [];
selectedIndex;
inProcess: boolean;
// metrics;
setArr = [];
workExID;
exerciseTmax;
sessionId;
skippedSessions;
regressData: any[] = [];
skipregressData: any[] = []
progressData: any[] = [];
skippedRegressWeight;
tempTmax;
planExId;

setIndex;
repscount;
lastMicroId;
lastMesoId;
workweight;
completedSetArr;
//-----------------------workout
planId;
userplan_id;
TotalCalories;
exerciseID;
exIntensity;
restModal;
warmupRestModal;
moreRepsModal;
updatedExData;
tempExID;
exChange;
exVideo;
advExBtn;
//prompt;
prescribedReps = {
  numbers: [
    { description: "1" },
    { description: "2" },
    { description: "3" }
  ]
};

prescribedRepsWarmup = {
  numbers: [
    { description: "1" },
    { description: "2" },
    { description: "3" }
  ]
};
tmaxValue = {
  numbers: [
    { description: "1" },
    { description: "2" },
    { description: "3" }
  ]
};
amrap = { 99: 1, 98: 2, 97: 2, 96: 2, 95: 3, 94: 3, 93: 3, 92: 4, 91: 4, 90: 5, 89: 5, 88: 5, 87: 6, 86: 6, 85: 6, 84: 7, 83: 7, 82: 7, 81: 8, 80: 8, 79: 8, 78: 9, 77: 9, 76: 9, 75: 10, 74: 10, 73: 11, 72: 11, 71: 11, 70: 12, 69: 12, 68: 13, 67: 13, 66: 14, 65: 14, 64: 15, 63: 15, 62: 16, 61: 16, 60: 17, 59: 17, 58: 18, 57: 19, 56: 19, 55: 20, 54: 21, 53: 22, 52: 22, 51: 23, 50: 24, 49: 25, 48: 26, 47: 27, 46: 28, 45: 29, 44: 30, 43: 32, 42: 33, 41: 34, 40: 36, 39: 37, 38: 39, 37: 40, 36: 42, 35: 44, 34: 46, 33: 47, 32: 49, 31: 51, 30: 54, 29: 56, 28: 58, 27: 61, 26: 63, 25: 66, 24: 69, 23: 71, 22: 74, 21: 77, 20: 81 };
defaultRepValue;
defaultTmaxValue;
allOutSet;
pReps;
selectedPlanExId;
tempExArr = [];
currentExTmax;

isLockSwipes;
activeExerciseId;

token: any;
userplandata: any;
pStartDate;
showStartDate;
getOffDay;
offday;
enableInseason;
microCycleCount;
selectedSeasonDate;
showseasondate;
userOffData;

nxtrenewdate;
todydate;
progressPage;

//----------------workoutdata
selectedLevelWdata;
sessionInfoWdata;
todaySessionIDWdata;
promptWdata;
metricsWdata;
s3urlWdata;
workoutFinishWdata;
allSetSkipWdata;
planIdWdata;
completedSetArrWdata = [];

isSessionIdNull: any = false;

//------------------warmup initialization

warmupArr: any[] = [];
coolDownVideo;
videoUrl;

warmup;
exwarmup;
warmuptype;

generalWarmupCompleted = "false";
excerciseWarmupCompleted = "false";
generalWarmupPopClosed = "false"

sessionStarted;
warmupExist;

toDayDateWarmup;
cooldown;
cooldownCompleted = "false";
warmupSetIndex;

genWarmupMsg;
cooldownMsg;

planprogressModal;
exerciseInfoPlan = [];

allExercises: any[] = [];

//-----------------

planPeriods: any[] = [];
planMesocycle: any[] = [];
planMicrocycle: any[] = [];
planDays: any[] = [];
planSessions: any[] = [];
planActivity: any[] = [];
planRounds: any[] = [];
planActions: any[] = [];
planActionsComplex: any[] = [];

exercisesList: any[] = [];

dayName;
exDetails: any = {};
exDetailsComplex: any[] = [];
simpleActions: any = {};
complexActions: any = [];
currentAction: any[] = [];
currentActionId;

activeSessionName;
currentActivityId;
currentSessionId;
currentRoundId;
currentRoundIndex;

currentActivityIndex;
currentDate;
isSimple = false;
isActivitySimple = false;

daysDiff = 0;

isRestDay = false;

activeSessionId;

currentDayId;

isSkipDayDiff = false;

actionType = 'warmup';

sessionEnd = false;

summarySessionId;

isDoneDisabled = false;

restTime = 0;

isWheelSelectorShow = false;

constructor(public platform: Platform, public nav: NavController,private apiService:ApiService, public calendarCtrl: CalendarModule, private selector: WheelSelector, public sanitizer: DomSanitizer, public modalCtrl: ModalController, public sqlStorageNew: SqlStorageNew, private loadData: LoadData, private http: HttpClient, public toastCtrl: ToastController, private alertCtrl: AlertController, private zone: NgZone) {

    this.tokken = localStorage.getItem('usertoken');
    localStorage.setItem('workoutLoad', '1');
    this.planInfo = { "id": 0, "planPhoto": "", "planName": "" };
    this.simpleActions = {
      "exerciseName": '',
      "intensity": 0,
      "reps": 0,
      "workweight": 0, "tmax": 0
    };
}


// Center current scroll
      centerScroll() {
        if (!this.segmenttabs || !this.segmenttabs.nativeElement)
          return;

        let sizeLeft = this.sizeLeft();
        let sizeCurrent = this.segmenttabs.nativeElement.children[this.page].clientWidth;
        let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent / 2);

        result = (result > 0) ? result : 0;
        this.smoothScrollTo(result);
      }

// Animate scroll
      smoothScrollTo(endX) {
        let startTime = new Date().getTime();
        let startX = this.segmenttabs.nativeElement.scrollLeft;
        let distanceX = endX - startX;
        let duration = 400;

        let timer = setInterval(() => {
          var time = new Date().getTime() - startTime;
          var newX = this.easeInOutQuart(time, startX, distanceX, duration);
          if (time >= duration) {
            clearInterval(timer);
          }
          this.segmenttabs.nativeElement.scrollLeft = newX;
        }, 1000 / 60); // 60 fps
      }

      getDatefromDB() {


      }

// Get size start to current
      sizeLeft() {
        let size = 0;
        for (let i = 0; i < this.page; i++) {
          size += this.segmenttabs.nativeElement.children[i].clientWidth;
        }
        return size;
      }


      hideVideo() {

        if (this.showVideo) {

          this.showVideo = false;
          setTimeout(() => {

            this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.activeExerciseId);
            this.myVideo.muted = true;
            this.myVideo.play();
            this.myVideo.loop = true;

          }, 3000);

        } else {

          this.showVideo = true;
          setTimeout(() => {

            this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' + this.activeExerciseId);
            this.myVideo.muted = true;
            this.myVideo.pause();


          }, 3000);
        }


      }


      // Easing function
      easeInOutQuart(time, from, distance, duration) {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
      }

      async workoutdetails() {
        let modal = await this.modalCtrl.create({
          component:ExcpreviewPage
        });
        modal.present();
      }

     async openCalendar() {
        let calendarPopup = await this.modalCtrl.create({
          component: CalendarPage
        });
        calendarPopup.present();
      }

  ngOnInit() {
    this.newCode();
  }
  // ionViewDidLoad() {

  // }

  newCode() {

    var today = new Date();
    this.loadExercises();
    var todaySessionDate = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + (today.getDate())).slice(-2);
    this.currentDate = today;
    let todaysId = localStorage.getItem('todayDayId');
    this.currentDayId = todaysId;
    this.getPlanInfoNew();
  

  }

  loadExercises() {

    this.exercisesList = [];
    this.sqlStorageNew.query("select * from exercises").then(
      data => {

        console.log("exercise data", data);
        if (data.res.rows.length > 0) {

          for (let i = 0; i < data.res.rows.length; i++) {

            console.log("ex name", data.res.rows.item(i).exerciseName);
            this.exercisesList.push(data.res.rows.item(i));

          }

          console.log("ex list", this.exercisesList);
        }

      }
    ).catch(err => {
      console.error('--2--' + JSON.stringify(err));
    });
  }

 async updateTmaxServer(data) {

    if (localStorage.getItem('internet') === 'online') {
      this.apiService.updateTmaxData(data,this.tokken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          console.log("Updated Tmax", res);
        }
        );
    } else {
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  getPlanInfoNew() {
      
      // this.loadData.startLoading();
      this.zone.run(() => {
      this.internetConn = (localStorage.getItem('internet') === 'online') ? true : false;
      this.initialState = false;
      this.userplancheckDone = false;
      this.dayOff = false;
      this.restDay = false;
      this.notStarted = false;
      this.planComplete = false;
      this.todayComplete = false;
      this.renewPlan = false;
      this.activateFuturePlan = false;
      this.reActivate = false;
      this.sameDayPlanComplete = false;
      this.firstPlan = false;
      this.freeplan = false;
      this.changeDate = false;
      this.lastSessId = 0;
      this.sessionResume = false;
      this.warmup = true;
      this.generalWarmupCompleted = localStorage.getItem('generalwarmupcmpl');

      this.planSetStatus = (localStorage.getItem('planSet') === 'true') ? true : false;
    });

    setTimeout(() => {

      this.sqlStorageNew.query("select p.*, u.nextrenewaldate, u.dayOff from userplan u left join plan p on u.plan_id = p.id where u.status = 1").then(
        data => {
            
            console.log("planinfo", data);
            
            if (data.res.rows.length > 0) {
            this.renewDate = data.res.rows.item(0).nextrenewaldate;
            var programtype = "Beginner";
            if (data.res.rows.item(0).programType_id == 1) {
              programtype = "Beginner";
            } else if (data.res.rows.item(0).programType_id == 2) {
              programtype = "Intermediate";
            } else if (data.res.rows.item(0).programType_id == 3) {
              programtype = "Advanced";
            }

            var planId = data.res.rows.item(0).plan_id;
            this.planInfo = {
              "id": data.res.rows.item(0).id, "planPhoto": data.res.rows.item(0).planPhoto,
              "planName": data.res.rows.item(0).planName, "coachPhoto": global.s3URL + data.res.rows.item(0).createdByImg,
              "coachName": data.res.rows.item(0).createdBy, "durationWeeks": data.res.rows.item(0).duration_weeks, "planType": programtype
            };
            this.coachPhoto = data.res.rows.item(0).createdByImg;

            console.log("current day id", this.currentDayId);

            this.sqlStorageNew.query("select * from planactions where day_id = " + this.currentDayId + " and status = 1 order by action_id desc").then(
              lastActionData => {
                
                let lastCompletedActionID = 0;
                if (lastActionData.res.rows.length > 0) {
                  lastCompletedActionID = lastActionData.res.rows.item(0).action_id;
                }
                console.log("last completed id", lastCompletedActionID);
                console.log("current day id", this.currentDayId);

                this.sqlStorageNew.query("select * from planactions where day_id = " + this.currentDayId + " and action_id > " + lastCompletedActionID + " and status = 0 order by action_id asc").then(
                  actionData => {
                    //localStorage.setItem('current_action',actionData.res.rows.item(0).action_id);
                    console.log("general warmup chk", actionData.res.rows.item(0).status);
                    if (actionData.res.rows.item(0).status == 1) {
                      this.generalWarmupPopClosed=="true"
                      this.generalWarmupCompleted = "true";
                      localStorage.setItem('generalwarmupcmpl', 'true');

                    }
                    console.log("action data", actionData);
                    this.currentDayId = actionData.res.rows.item(0).day_id;
                    this.currentSessionId = actionData.res.rows.item(0).session_id;
                    this.currentActivityId = actionData.res.rows.item(0).activity_id;
                    this.currentRoundId = actionData.res.rows.item(0).round_id;

                    this.currentActionId = actionData.res.rows.item(0).action_id;

                    this.sqlStorageNew.query("select ps.*, pd.day_name from plansessions ps left join plandays pd on ps.day_id = pd.day_id where ps.day_id = " + this.currentDayId).then(
                      sessionData => {
                        let statusFlag = false;

                        console.log("session data", sessionData);
                        this.planSessions = [];
                        for (let mi = 0; mi < sessionData.res.rows.length; mi++) {

                          console.log("session data", sessionData.res.rows.item(mi));
                          this.planSessions.push(sessionData.res.rows.item(mi));

                        }

                        this.activeSessionName = sessionData.res.rows.item(0).session_name;
                        this.activeSessionId = sessionData.res.rows.item(0).session_id;

                        this.dayName = sessionData.res.rows.item(0).day_name;

                        this.sqlStorageNew.query("select * from planactions where session_id = " + this.activeSessionId + " order by action_id asc").then(
                          actionData => {
                            //localStorage.setItem('current_action',actionData.res.rows.item(0).action_id);
                            console.log("general warmup chk", actionData.res.rows.item(0).status);
                            if (actionData.res.rows.item(0).status == 1) {

                              this.warmup = false;
                              localStorage.setItem('cooldownCompleted', 'false');
                              this.generalWarmupPopClosed=="true"
                              this.generalWarmupCompleted = "true";
                              localStorage.setItem('generalwarmupcmpl', 'true');
                              

                            } else {

                              this.warmup = true;
                              localStorage.setItem('cooldownCompleted', 'false');
                              if(this.generalWarmupPopClosed==="false"){
                              this.generalWarmupCompleted = "false";
                              localStorage.setItem('generalwarmupcmpl', 'false');
                              }
                              this.loadGeneralWarmups();


                            }
                          });

                      });
                    
                      this.sqlStorageNew.query("select pr.*, pa.action_type from planactions pa left join planround pr on pa.round_id = pr.round_id where pa.activity_id = " + this.currentActivityId).then(
                      roundData => {

                        console.log("round data ------", roundData);
                        let rndStatusFlag = false;
                        let actionType = 'warmup';
                        for (let mi = 0; mi < roundData.res.rows.length; mi++) {
                          if (roundData.res.rows.item(mi).status == 0 && rndStatusFlag == false) {

                            if (roundData.res.rows.item(mi).round_type === 'Simple') {
                              this.isSimple = true;
                            } else {
                              this.isSimple = false;
                            }
                            actionType = roundData.res.rows.item(mi).action_type;
                            this.currentRoundId = roundData.res.rows.item(mi).round_id;
                            this.restTime = roundData.res.rows.item(mi).rest_time;
                            rndStatusFlag = true;

                          }

                        }
                        rndStatusFlag = false;
                        let index = 0;
                        for (let mi = 0; mi < roundData.res.rows.length; mi++) {
                          console.log("round data", roundData.res.rows.item(mi));
                          if (roundData.res.rows.item(mi).action_type === actionType) {
                            this.planRounds.push(roundData.res.rows.item(mi));
                            if (roundData.res.rows.item(mi).status == 0 && rndStatusFlag == false) {
                              this.currentRoundIndex = index;
                              rndStatusFlag = true;
                            }
                            index++;
                          }

                        }

                        localStorage.setItem('current_action', actionData.res.rows.item(0).action_id);
                        localStorage.setItem('showMoreRepsWindow', 'Yes');
                        this.currentAction.push(actionData.res.rows.item(0));

                        for (let mi = 0; mi < actionData.res.rows.length; mi++) {

                          console.log("action data", actionData.res.rows.item(mi));
                          this.planActions.push(actionData.res.rows.item(mi));
                          // if(actionData.res.rows.item(mi).status == 0 && actionStatusFlag == false){

                          //   this.currentActionId = actionData.res.rows.item(mi).action_id;

                          // }
                          // if(actionData.res.rows.item(mi).action_id == this.currentActionId){

                          //   console.log("inside if condition");
                          //   this.currentAction.push(actionData.res.rows.item(mi));

                          // }

                        }
                        var workweight = 0;


                        setTimeout(() => {

                          console.log("current action data", this.currentAction);
                          console.log("current ex data", this.exercisesList);

                          var elementId = "roundid" + this.currentAction[0].round_id;
                          const el = document.getElementById(elementId);
                          el.scrollIntoView({ inline: "center" });

                          this.activeSessionId = this.currentAction[0].session_id;
                          console.log("active session id", this.activeSessionId);

                          this.sqlStorageNew.query("select * from plansessions where session_id = " + this.activeSessionId).then(

                            sessionData => {

                              console.log("session data", sessionData);
                              this.activeSessionName = sessionData.res.rows.item(0).session_name;

                            });

                          this.sqlStorageNew.query("select * from planactions where session_id = " + this.activeSessionId + " order by action_id asc").then(
                            actionData => {
                              //localStorage.setItem('current_action',actionData.res.rows.item(0).action_id);
                              console.log("general warmup chk", actionData.res.rows.item(0).status);
                              if (actionData.res.rows.item(0).status == 1) {

                                this.warmup = false;
                                localStorage.setItem('cooldownCompleted', 'false');
                                this.generalWarmupPopClosed=="true"
                                this.generalWarmupCompleted = "true";
                                localStorage.setItem('generalwarmupcmpl', 'true');
                                

                              } else {

                                this.warmup = true;
                                localStorage.setItem('cooldownCompleted', 'false');
                                if(this.generalWarmupPopClosed==="false"){
                                this.generalWarmupCompleted = "false";
                                localStorage.setItem('generalwarmupcmpl', 'false');
                                }
                                this.loadGeneralWarmups();

                              }
                            });

                          for (let pi = 0; pi < this.exercisesList.length; pi++) {

                            if (this.exercisesList[pi].id == this.currentAction[0].exercise_id) {

                              console.log("Ex id if condition", this.currentAction[0].exercise_id);
                              console.log("plan actions name data", this.currentAction[0]);
                              console.log("exercise name data", this.exercisesList[pi].exerciseName);
                              console.log("exercise name data", this.exercisesList[pi]);

                              this.exDetails = this.exercisesList[pi];
                              workweight = Math.round(this.exercisesList[pi].tmax * (this.currentAction[0].intensity / 100));
                              if(workweight<10){
                                workweight = 10;
                              }
                              console.log("work weight", workweight);

                              this.simpleActions = {
                                "exerciseName": this.exercisesList[pi].exerciseName,
                                "intensity": this.currentAction[0].intensity,
                                "reps": this.currentAction[0].prescribed_reps,
                                "exId": this.exercisesList[pi].exId,
                                "workweight": workweight,
                                "tmax": (Math.round(this.exercisesList[pi].tmax)).toFixed(),
                                "maxreps": this.currentAction[0].maxreps
                              };

                              this.pReps = this.currentAction[0].prescribed_reps;
                            }

                          }

                          setTimeout(() => {

                            this.prescribedReps.numbers = [];
                            this.repscount = parseInt(this.pReps, 10);

                            var range = parseInt(this.pReps, 10);
                            for (var rr = 1; rr <= range; rr++) {
                              this.prescribedReps.numbers.push({ description: String(rr) });
                            }

                            this.defaultRepValue = this.prescribedReps.numbers[this.prescribedReps.numbers.length - 1].description;
                            this.actionType = this.currentAction[0].action_type;
                            console.log("------ex details", this.exDetails);
                            console.log("------wor details", workweight);
                            console.log("------simple actions", this.simpleActions);

                          }, 500);

                        }, 1500);

                        //console.log(this.MicroDataM);
                      });
                  
                      this.sqlStorageNew.query("select * from planactivity where session_id = " + this.currentSessionId).then(
                      activityData => {

                        let statusFlagActivity = false;
                        this.currentActivityIndex = 0;
                        this.planActivity = [];
                        for (let mi = 0; mi < activityData.res.rows.length; mi++) {
                          console.log("activity data", activityData.res.rows.item(mi));
                          this.planActivity.push(activityData.res.rows.item(mi));
                          if (activityData.res.rows.item(mi).activity_id == this.currentActivityId) {
                            this.currentActivityIndex = mi;
                          }

                        }
                        if(this.isSkipDayDiff) {
                          this.currentActivityId = activityData.res.rows.item(0).activity_id;
                        }

                        if (activityData.res.rows.item(this.currentActivityIndex).Activity_type === "Simple") {

                          this.isActivitySimple = true;
                          //this.getActivityData();

                        } else {

                          this.isActivitySimple = false;
                          this.loadComplexData();
                        }
                        // this.loadData.stopLoading();
                      }
                    );
                  });

              });

          } else {
            this.firstPlan = true;
          }
        }
      ).catch(err => {
        console.error('--2--' + JSON.stringify(err));
      });
    }, 4000);
  }

  onExImageError(exDetails){
    exDetails.exImgNew = 'assets/images/plan_2.png';
  }

  onComplexExImageError(action){
    action.ExerciseThumbImage = 'assets/images/plan_2.png';
  }
  async openMoreReps(reps, tmax, intensity, workweight) {

      console.log("ex details", this.exDetails);
      console.log("simple actions", this.simpleActions);
      console.log("simple actions", this.currentAction);

      console.log("ex id", this.exDetails.id);
      console.log("ex name", this.simpleActions.maxreps);

      var exId = this.exDetails.id;
      var exName = this.simpleActions.exerciseName;
      var workweight = this.simpleActions.workweight;
      var intensity = this.simpleActions.intensity;
      var reps = this.repscount;
      var tmax = this.simpleActions.tmax;
      var maxreps = this.simpleActions.maxreps;

      this.moreRepsModal = await this.modalCtrl.create({
        component:MorerepsPage,
        componentProps: {
        'rest': 0,
        'setname': "Action ",
        'excercisename': exName,
        'excerciseid': exId,
        'setworkweight': workweight,
        'tmax': tmax,
        'intensity': intensity,
        'repsdone': reps,
        'maxreps': maxreps }
      });

      this.moreRepsModal.present();
      this.moreRepsModal.onDidDismiss.then((data) => {

      console.log(data);
      let morerepsdone = 0;
      
      if(data['moreReps'] === ''){

        morerepsdone = 0;

      }else{

        morerepsdone = parseInt(data['moreReps']);

      }
      
      console.log("more reps done",morerepsdone);

      let repscount = parseInt(reps) + morerepsdone;
      let examrap = this.amrap[intensity];
      if (examrap < repscount) {
        let newTmax = Math.ceil(((workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100)) + parseInt(tmax)) / 2);
        let changeRatio = ((newTmax - tmax) / tmax);
        if (changeRatio > .2) {
          newTmax = Math.ceil(parseInt(tmax) + (tmax * .2));
        }
        console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id);
        this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id).then(udata => {
          
          var data = {
            exercise_id: this.currentAction[0].exercise_id,
            updateTmax: this.loadData.convertWeight(newTmax, "db"),
            updateType: ''
          };
          this.updateTmaxServer(data);
          this.loadExercises();
        
          this.actionDone(reps, morerepsdone,tmax, intensity, workweight);
        });
        
        }

      if (examrap > repscount) {
        let newTmax = Math.ceil(workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100));
        if (newTmax < 20) {
          newTmax = 20;
        }
        console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id);
        this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id).then(udata => {
          var data = {
            exercise_id: this.currentAction[0].exercise_id,
            updateTmax: this.loadData.convertWeight(newTmax, "db"),
            updateType: ''
          };
          this.updateTmaxServer(data);
          this.loadExercises();
         
          this.actionDone(reps,morerepsdone, tmax, intensity, workweight);
        });
      }
      if (examrap === repscount) {
        this.actionDone(reps,morerepsdone, tmax, intensity, workweight);
      }
      localStorage.setItem("showMoreRepsWindow", "No");
      //this.actionDone(reps,tmax,intensity,workweight);
      //this.actionDone(this.repscount,this.simpleActions[0].tmax,this.simpleActions[0].intensity,this.simpleActions[0].workweight)
      //actionDone(repscount,simpleActions.tmax,simpleActions.intensity,simpleActions.workweight)
      // if(this.warmupArr.length===0){
      // this.backButtonAction();
      // }
    });

  }

  getActivityData() {

    this.currentActivityId = this.planActivity[this.currentActivityIndex].activity_id;
    this.sqlStorageNew.query("select * from planactions where activity_id = " + this.currentActivityId + " AND status = 0 GROUP BY day_id").then(
      pendingActionsObj => {
        if (pendingActionsObj.res.rows.length === 0) {
          this.currentActivityIndex = this.currentActivityIndex + 1;
          console.log("current round index", this.currentActivityIndex + " " + this.planActivity.length);
        }
        if (this.currentActivityIndex == this.planActivity.length) {

          console.log("activity ended");

        } else {

          this.currentActivityId = this.planActivity[this.currentActivityIndex].activity_id;
          console.log("current activity id", this.currentActivityId);

          if(this.planActivity[this.currentActivityIndex].Activity_type === "Simple") {

            setTimeout(() => {

              this.sqlStorageNew.query("select pr.*, pa.action_type from planactions pa left join planround pr on pa.round_id = pr.round_id where pa.activity_id = " + this.currentActivityId).then(
                roundData => {

                  this.planRounds = [];
                  //this.currentRoundIndex = 0;

                  let actionType = 'warmup';
                  for (let mi = 0; mi < roundData.res.rows.length; mi++) {
                    if (roundData.res.rows.item(mi).status == 0) {
                      actionType = roundData.res.rows.item(mi).action_type;
                      break;
                    }
                  }
                  //actionType = roundData.res.rows.item(0).action_type;
                  for (let mi = 0; mi < roundData.res.rows.length; mi++) {
                    console.log("round data", roundData.res.rows.item(mi));
                    if (roundData.res.rows.item(mi).action_type === actionType) {
                      this.planRounds.push(roundData.res.rows.item(mi));
                    }

                  }

                  // if(this.planRounds[this.currentRoundIndex].round_type === 'Simple'){

                  //   this.isSimple = true;

                  // }else{

                  //   this.isSimple = false;

                  // }

                  //this.currentRoundId = this.planRounds[this.currentRoundIndex].round_id;

                  //console.log(this.MicroDataM);
                  //this.currentActionId = localStorage.getItem('current_action');
                  this.currentRoundIndex = -1;
                  localStorage.setItem('showMoreRepsWindow', "Yes");
                  this.getActionData(false);
                });

              console.log("round id", this.currentRoundId);

            }, 600);
          } else {
            this.isActivitySimple = false;
            this.loadComplexData();
            // this.loadData.stopLoading();
          }
        }
      }
    );


  }

  getActionData(isEx) {

    
    if (!isEx) {

      this.currentRoundIndex = this.currentRoundIndex + 1;

    }

    console.log("current round index", this.currentRoundIndex + " " + this.planRounds.length);
    if (this.currentRoundIndex == this.planRounds.length) {
      // this.loadData.stopLoading();
      this.getActivityData();          
      this.isDoneDisabled = false;

    } else {
      // this.loadData.startLoading();
      this.currentRoundId = this.planRounds[this.currentRoundIndex].round_id;
      console.log("current action", this.currentRoundId);
      this.restTime = this.planRounds[this.currentRoundIndex].rest_time;

      this.currentActionId = localStorage.getItem('current_action');
      console.log("current action", this.currentActionId);
      this.currentAction = [];
      setTimeout(() => {

        this.sqlStorageNew.query("select * from planactions where round_id = " + this.currentRoundId).then(

          actionData => {

            localStorage.setItem('current_action', actionData.res.rows.item(0).action_id);
            console.log("general warmup chk", actionData.res.rows.item(0).status);
            if (actionData.res.rows.item(0).status == 1) {
              this.generalWarmupPopClosed=="true"
              this.generalWarmupCompleted = "true";
              localStorage.setItem('generalwarmupcmpl', 'true');
              
            }
            console.log("action data", actionData);
            this.currentActionId = actionData.res.rows.item(0).action_id;
            for (let mi = 0; mi < actionData.res.rows.length; mi++) {

              console.log("action data", actionData.res.rows.item(mi));
              this.planActions.push(actionData.res.rows.item(mi));
              if (actionData.res.rows.item(mi).action_id == this.currentActionId) {

                console.log("inside if condition");
                this.currentAction.push(actionData.res.rows.item(mi));


              }

            }
            var workweight = 0;
            this.simpleActions = {};
            var actionDetails;

            setTimeout(() => {
              this.actionType = this.currentAction[0].action_type;

              this.activeSessionId = this.currentAction[0].session_id;
              console.log("active session id", this.activeSessionId);

              this.sqlStorageNew.query("select * from plansessions where session_id = " + this.activeSessionId).then(

                sessionData => {

                  console.log("session data", sessionData);

                  this.activeSessionName = sessionData.res.rows.item(0).session_name;

                });

              this.sqlStorageNew.query("select * from planactions where session_id = " + this.activeSessionId + " order by action_id asc").then(
                actionData => {
                  //localStorage.setItem('current_action',actionData.res.rows.item(0).action_id);
                  console.log("general warmup chk", actionData.res.rows.item(0).status);
                  if (actionData.res.rows.item(0).status == 1) {
                      
                      this.warmup = false;
                      localStorage.setItem('cooldownCompleted', 'false');
                      this.generalWarmupPopClosed=="true"
                      this.generalWarmupCompleted = "true";
                      localStorage.setItem('generalwarmupcmpl', 'true');
                    
                   
                  } else {

                    this.warmup = true;
                    localStorage.setItem('cooldownCompleted', 'false');
                    
                    if(this.generalWarmupPopClosed==="false"){
                      this.generalWarmupCompleted = "false";
                      localStorage.setItem('generalwarmupcmpl', 'false');
                    }

                    this.loadGeneralWarmups();

                  }
                });

              console.log("current action data", this.currentAction);

              var elementId = "roundid" + this.currentAction[0].round_id;
              const el = document.getElementById(elementId);
              el.scrollIntoView({ inline: "center" });

              for (let pi = 0; pi < this.exercisesList.length; pi++) {

                if (this.exercisesList[pi].id == this.currentAction[0].exercise_id) {

                  console.log("plan actions name data", this.currentAction[0]);
                  console.log("exercise name data", this.exercisesList[pi].exerciseName);

                  this.exDetails = this.exercisesList[pi];
                  workweight = Math.round(this.exercisesList[pi].tmax * (this.currentAction[0].intensity / 100));
                  if(workweight<10){
                    workweight = 10;
                  }
                  actionDetails = {
                    "exerciseName": this.exercisesList[pi].exerciseName,
                    "intensity": this.currentAction[0].intensity,
                    "reps": this.currentAction[0].prescribed_reps,
                    "exId": this.exercisesList[pi].id,
                    "workweight": workweight,
                    "tmax": (Math.round(this.exercisesList[pi].tmax)).toFixed(),
                    "maxreps": this.currentAction[0].maxreps
                  };
                }

              }

              this.simpleActions = actionDetails;
              this.pReps = actionDetails.reps;
              this.prescribedReps.numbers = [];
              this.repscount = parseInt(this.pReps, 10);

              var range = parseInt(this.pReps, 10);

              for (var rr = 1; rr <= range; rr++) {
                this.prescribedReps.numbers.push({ description: String(rr) });
              }

              this.defaultRepValue = this.prescribedReps.numbers[this.prescribedReps.numbers.length - 1].description;

              console.log("------ex details", this.exDetails);
              console.log("------wor details", workweight);
              console.log("------simple actions", this.simpleActions);
              this.isDoneDisabled = false;
              // this.loadData.stopLoading();
            }, 400);
          });
          
        // this.loadData.stopLoading();
      }, 1000);

    }
    setTimeout(() => {
      // this.loadData.stopLoading();
    }, 1000);

  }



  actionComplete(reps, tmax, intensity, workweight) {
    if (!this.isDoneDisabled) {

      this.isDoneDisabled = true;
    }
    var repscount = reps;
    if (this.currentAction[0].action_type === 'MainSet') {
      if (this.currentAction[0].prescribed_reps > repscount) {
        let newTmax = Math.ceil(workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100));
        console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id);
        this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + this.currentAction[0].exercise_id).then(udata => {
          var data = {
            exercise_id: this.currentAction[0].exercise_id,
            updateTmax: this.loadData.convertWeight(newTmax, "db"),
            updateType: ''
          };
          this.updateTmaxServer(data);
          this.loadExercises();
          this.actionDone(reps,0, tmax, intensity, workweight);
        });
        console.log("regression Tmax", newTmax);
      }
      if (this.currentAction[0].prescribed_reps === repscount) {
        let showMRW = localStorage.getItem('showMoreRepsWindow');
        if (showMRW === "Yes") {
          this.openMoreReps(reps, tmax, intensity, workweight);
        } else {
          this.actionDone(reps,0, tmax, intensity, workweight);
        }
      }
    } else {
      this.actionDone(reps,0, tmax, intensity, workweight);
    }
  }



  actionDone(reps,moreReps, tmax, intensity, workweight) {

    var repscount = reps;
    var dispDate = new Date();
    var displayDate = dispDate.getFullYear() + '-' + ('0' + (dispDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (dispDate.getDate())).slice(-2) + ' ' + ('0' + (dispDate.getHours())).slice(-2) + ':' + ('0' + (dispDate.getMinutes())).slice(-2) + ':' + ('0' + (dispDate.getSeconds())).slice(-2);

    var dbWw = this.loadData.convertWeight(workweight, "db");

    console.log("action done", displayDate);
    console.log("action done", this.currentActionId);
    console.log("Action Array", this.currentAction);

    var status = true;
    var workweight = dbWw;
    var tmax = tmax;
    var actionid = this.currentActionId;
    var intensity = intensity;
    var morereps = moreReps;
    var sessionId;

    console.log("More reps -------", morereps);

    let updateQuery = "UPDATE planactions SET status = " + status + ", repsdone = " + repscount + ", more_reps = " + morereps + ", date = '" + displayDate + "', tmax = " + tmax + ", workweight = " + workweight + ", intensity = " + intensity + " WHERE action_id = " + actionid;

    this.sqlStorageNew.query(updateQuery).then(

      updateActionData => {

        console.log("action done", updateActionData);
        this.completedSetArr = [];
        this.sqlStorageNew.query("select * from planactions where status = 1 and updatestatus = 0").then(
          completedSetData => {
            var updateWeight;
            for (var index = 0; index < completedSetData.res.rows.length; index++) {
              updateWeight = this.loadData.convertWeight(completedSetData.res.rows.item(index).workweight, "db");
              this.completedSetArr.push({ "intensity": String(completedSetData.res.rows.item(index).intensity), "plan_id": String(completedSetData.res.rows.item(index).plan_id), "setCompletedDate": completedSetData.res.rows.item(index).date, "setId": completedSetData.res.rows.item(index).action_id, "totalReps": completedSetData.res.rows.item(index).repsdone, "workweight": completedSetData.res.rows.item(index).workweight, "tmax": completedSetData.res.rows.item(index).tmax, "exId": completedSetData.res.rows.item(index).exercise_id });
            }
            if (localStorage.getItem('internet') === 'online') {
             
              var data = { "set_details": this.completedSetArr };
             
              this.apiService.createsetdetails(data,this.tokken).subscribe((response)=>{
                const userStr = JSON.stringify(response);
                let res = JSON.parse(userStr);
                  for (var st = 0; st < completedSetData.res.rows.length; st++) {
                    this.sqlStorageNew.query("update planactions set updatestatus = 1 where id = " + completedSetData.res.rows.item(st).id);
                  }
                }, (err) => {
                  if (err.status === 403) {
                    this.restModal.dismiss();
                    this.loadData.forbidden();
                  }
                });
            }
          });

        localStorage.setItem('current_action', actionid);

        this.sqlStorageNew.query("select * from planactions where action_id = " + actionid).then(

          actionData => {

            // for(let j=0;j<this.planActivity.length;j++){

            //     if(actionData.res.rows.item(0).activity_id == this.planActivity[this.planActivity.length-1].activity_id){

            //       console.log("Activity end ---------------------------------------");
            //       for(let k=0;k<this.planRounds.length;k++){

            //        if(actionData.res.rows.item(0).round_id == this.planRounds[this.planRounds.length-1].round_id){

            //         console.log("Session end ----------------------------------------");


            //        }

            //       }
            //     }

            // }



            console.log("completed action data", actionData.res.rows.item(0));
            let updateQueryDay = "UPDATE plandays SET status = " + status + ", date = '" + displayDate + "' where day_id = " + actionData.res.rows.item(0).day_id;
            let updateQueryActivity = "UPDATE planactivity SET status = " + status + ", date = '" + displayDate + "' where activity_id = " + actionData.res.rows.item(0).activity_id;
            let updateQueryRound = "UPDATE planround SET status = " + status + ", date = '" + displayDate + "' where round_id = " + actionData.res.rows.item(0).round_id;
            let updateQuerySession = "UPDATE plansessions SET status = " + status + ", date = '" + displayDate + "' where session_id = " + actionData.res.rows.item(0).session_id;
            sessionId = actionData.res.rows.item(0).session_id;
            this.summarySessionId = sessionId;

            this.sqlStorageNew.query(updateQueryDay).then(

              daydata => {

              });


            this.sqlStorageNew.query(updateQueryActivity).then(

              activitydata => {

              });

            this.sqlStorageNew.query(updateQueryRound).then(

              rounddata => {

              });

            this.sqlStorageNew.query(updateQuerySession).then(

              sessiondata => {

              });
            this.sqlStorageNew.query("select * from planactions where activity_id = " + this.planActivity[this.planActivity.length - 1].activity_id + " AND status=0").then(
              leftActions => {

                if(leftActions.res.rows.length === 0) {

                  this.sessionEnd = true;

                  if (this.sessionEnd) {

                    setTimeout(() => {
                      this.cooldown = true;
                      //localStorage.setItem('cooldownCompleted','true');
                      //this.warmup = false;
                      localStorage.setItem('generalwarmupcmpl', 'false');
                      this.cooldownCompleted = "false";
                      this.getCoolDownEx();

                    }, 1000);
                          
                  } else {
                    this.actionrestpop(1, this.simpleActions);
                  }
                } else {
                  this.actionrestpop(1, this.simpleActions);
                }
              }
            );
          });





      });
  }


        //--------------------------------------- Complex Data -----------------------------------------------

  loadComplexData() {
      this.sqlStorageNew.query("select * from planround where activity_id = " + this.currentActivityId).then(
        planRoundsComplex => {

          console.log("plan rounds complex", planRoundsComplex);
          console.log("plan rounds complex", this.currentActivityId);
          console.log("plan rounds complex", planRoundsComplex.res.rows.item(0).round_id);
          this.planRounds = [];
          for (let ki = 0; ki < planRoundsComplex.res.rows.length; ki++) {

              this.planRounds.push(planRoundsComplex.res.rows.item(ki));

          }
          this.sqlStorageNew.query("select * from planactions where activity_id = " + this.currentActivityId + " and status = 0").then(
            pendingActions => {
            //if(pendingActions.res.rows.length === 0) {
              for (let ki = 0; ki < pendingActions.res.rows.length; ki++) {        
                  if(pendingActions.res.rows.item(ki).status === 0) {
                    this.currentRoundId = pendingActions.res.rows.item(ki).round_id;
                    break;
                  }
              }           
                        
              var elementId = "roundid" + this.currentRoundId;
              const el = document.getElementById(elementId);
              el.scrollIntoView({ inline: "center" });

              this.getComplexRoundActions();
              console.log("plan rounds complex array", this.planRounds);
            // } else {
            //   this.getComplexRoundActions();
            // }                   
        });
      }
    );
  
  }

  getComplexRoundActions() {
    this.sqlStorageNew.query("select pa.*, ex.exerciseName, ex.tmax, ex.id as exerciseID, ex.exerciseDesc from planactions pa left join exercises ex on pa.exercise_id = ex.id where round_id = " + this.currentRoundId + " and pa.status = 0").then(
      planActionsComplex => {

        if(planActionsComplex.res.rows.length === 0) {
          // this.sqlStorageNew.query("select * from planactions where round_id > " + this.currentRoundId + " and status = 0 order by action_id asc limit 1").then(
          //   nextActionData => {
          //     this.currentActivityId = nextActionData.res.rows.item(0).activity_id;
          //   }
          // )
          this.getPlanInfoNew();
        } else {

          this.planActions = [];

          console.log("plan actions complex", planActionsComplex);
          let actionType = 'warmup';
          for (let mi = 0; mi < planActionsComplex.res.rows.length; mi++) {
              if (planActionsComplex.res.rows.item(mi).status == 0) {
                  actionType = planActionsComplex.res.rows.item(mi).action_type;
                  break;
              }
          }

          this.actionType = actionType;

          this.complexActions = [];

          for (let li = 0; li < planActionsComplex.res.rows.length; li++) {
              if (planActionsComplex.res.rows.item(li).action_type == actionType) {

                  this.planActions.push(planActionsComplex.res.rows.item(li));

                  var workweight = 0;
                  console.log("tmax----------------",planActionsComplex.res.rows.item(li).tmax)
                  //this.exDetailsComplex.push(this.exercisesList[pi]);
                  workweight = Math.round(planActionsComplex.res.rows.item(li).tmax * (planActionsComplex.res.rows.item(li).intensity / 100));
                  if(workweight<10){
                    workweight = 10;
                  }
                  this.complexActions.push({
                      "exerciseName": planActionsComplex.res.rows.item(li).exerciseName,
                      "intensity": planActionsComplex.res.rows.item(li).intensity,
                      "reps": planActionsComplex.res.rows.item(li).prescribed_reps,
                      "prescribed_reps": planActionsComplex.res.rows.item(li).prescribed_reps,
                      "exId": planActionsComplex.res.rows.item(li).exerciseID,
                      "workweight": workweight,
                      "action_id": planActionsComplex.res.rows.item(li).action_id,
                      "tmax": (Math.round(planActionsComplex.res.rows.item(li).tmax)).toFixed(),
                      "maxreps": planActionsComplex.res.rows.item(li).maxreps,
                      "action_type": planActionsComplex.res.rows.item(li).action_type,
                      "more_reps": 0
                  });
                  this.currentRoundId = planActionsComplex.res.rows.item(li).round_id;

                  this.sqlStorageNew.query("select * from exercises where id = " +planActionsComplex.res.rows.item(li).exerciseID).then(
                    planExercisesComplex => {

                      this.exDetailsComplex.push(planExercisesComplex.res.rows.item(0));
                      this.complexActions[this.complexActions.length-1].tmax = (Math.round(planExercisesComplex.res.rows.item(0).tmax)).toFixed();
                    
                    });
                  //this.pReps = this.currentAction[0].prescribed_reps;
                  console.log("work weight", workweight);
                  console.log("Ex id if condition", this.currentAction[0].exercise_id);
                  console.log("plan actions name data", this.currentAction[0]);
                  console.log("exercise name data", planActionsComplex.res.rows.item(li).exerciseName);
              }

          }
          if(this.complexActions.length > 0) {
            this.isDoneDisabled = false;
          }
          // this.loadData.stopLoading();
          console.log("plan actions complex array", this.complexActions);
        }
      });
  }

  openMoreRepsComplex(complexActions) {

    let showMRW = localStorage.getItem('showMoreRepsWindow');

    if (showMRW === "Yes") {
      //this.openMoreReps(reps,tmax,intensity,workweight);
      console.log("ex details", this.exDetails);
      console.log("simple actions", this.simpleActions);
      console.log("simple actions", this.currentAction);
      console.log("ex id", this.exDetails.id);
      console.log("ex name", this.simpleActions.maxreps);
      // var exId = this.exDetails.id;
      // var exName = this.simpleActions.exerciseName;
      var workweight = this.simpleActions.workweight;
      // var intensity = this.simpleActions.intensity;
      // var reps = this.repscount;
      // var tmax = this.simpleActions.tmax;
      // var maxreps = this.simpleActions.maxreps;

      this.moreRepsModal = this.modalCtrl.create({
        component:MorerepscomplexPage,
        componentProps: {
        'rest': 0,
        'setname': "Action ",
        'excercisedetails': complexActions,
        'complexActions': complexActions }  
      });
        this.moreRepsModal.present();
        this.moreRepsModal.onDidDismiss.then((data) => {
        this.isDoneDisabled = false;
        console.log(data);
        var complexActionsFrmPop: any[] = [];
        var complexExDetailsFrmPop: any[] = [];

        complexActionsFrmPop = data['complexActionsUpdated'];
        complexExDetailsFrmPop = data['complexExercises'];
        let newTmax = 0;
        for (let ke = 0; ke < complexActionsFrmPop.length; ke++) {
          let repscount = parseInt(complexActionsFrmPop[ke].reps) + parseInt(complexActionsFrmPop[ke].more_reps);
          newTmax = parseInt(complexExDetailsFrmPop[ke].tmax);
          let examrap = this.amrap[complexActionsFrmPop[ke].intensity];
          if (examrap < repscount) {
            newTmax = Math.ceil(((workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100)) + parseInt(complexExDetailsFrmPop[ke].tmax)) / 2);
            let changeRatio = ((newTmax - complexExDetailsFrmPop[ke].tmax) / complexExDetailsFrmPop[ke].tmax);
            if (changeRatio > .2) {
              newTmax = Math.ceil(parseInt(complexExDetailsFrmPop[ke].tmax) + (complexExDetailsFrmPop[ke].tmax * .2));
            }
            console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActionsFrmPop[ke].exId);
            this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActionsFrmPop[ke].exId).then(udata => {
              var data = {
                exercise_id: complexActionsFrmPop[ke].exId,
                updateTmax: this.loadData.convertWeight(newTmax, "db"),
                updateType: ''
              };
              this.updateTmaxServer(data);
              if (ke == complexActionsFrmPop.length - 1) {
                this.loadExercises();
                this.onCloseMorereps(complexActionsFrmPop);
              }
            });
          }
          if (examrap > repscount) {
            newTmax = Math.ceil(complexActionsFrmPop[ke].workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100));
            if (newTmax < 20) {
              newTmax = 20;
            }
            console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActionsFrmPop[ke].exId);
            this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActionsFrmPop[ke].exId).then(udata => {
              var data = {
                exercise_id: complexActionsFrmPop[ke].exId,
                updateTmax: this.loadData.convertWeight(newTmax, "db"),
                updateType: ''
              };
              this.updateTmaxServer(data);
              if (ke == complexActionsFrmPop.length - 1) {
                this.loadExercises();
                this.onCloseMorereps(complexActionsFrmPop);
              }
            });
          }
          if (examrap === repscount) {
            // this.actionDone(reps,tmax,intensity,workweight);
            if (ke == complexActionsFrmPop.length - 1) {
              //this.loadExercises();
              this.onCloseMorereps(complexActionsFrmPop);
            }
          }

        }

      });

    } else {

      this.onCloseMorereps(complexActions);

    }
  }

  onCloseMorereps(complexActionsFrmPop) {
    localStorage.setItem("showMoreRepsWindow", "No");
    this.actionDoneComplex(complexActionsFrmPop);
    if (this.warmupArr.length === 0) {
      //this.backButtonAction();
    }
  }

  complexRoundComplete(complexActions) {

    if (!this.isDoneDisabled) {

      this.isDoneDisabled = true;
    }

    var complexMoreRepsArray = [];
    var complexRegRepsArray = [];

    for (let cr = 0; cr < complexActions.length; cr++) {

      var repscount = complexActions[cr].reps;

      console.log("complex reps count", repscount);
      console.log("complex prescribed reps count", complexActions[cr].prescribed_reps);
      console.log("complex action type", complexActions[cr].action_type);

      if (complexActions[cr].action_type === 'MainSet') {

        if (complexActions[cr].prescribed_reps > repscount) {

          console.log("prescribed reps greater than entered reps--------")
          let newTmax = Math.ceil(complexActions[cr].workweight / ((104.6049 - 3.679689 * repscount + 0.07671682 * Math.pow(repscount, 2) - 0.0008536629 * Math.pow(repscount, 3) + 0.000004574117 * Math.pow(repscount, 4) - 0.00000000932792 * Math.pow(repscount, 5)) / 100));
          console.log("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActions[cr].exId);
          this.sqlStorageNew.query("UPDATE exercises SET tmax = " + newTmax + ", updatetmax = " + newTmax + " where id = " + complexActions[cr].exId).then(udata => {
            var data = {
              exercise_id: complexActions[cr].exId,
              updateTmax: this.loadData.convertWeight(newTmax, "db"),
              updateType: ''
            };
            this.updateTmaxServer(data);
            complexRegRepsArray.push(complexActions[cr]);
            if (cr == complexActions.length - 1) {

              this.loadExercises();
              this.actionDoneComplex(complexActions);

            }

          });
          console.log("regression Tmax", newTmax);
        }

        if (complexActions[cr].prescribed_reps == repscount) {

          console.log("inside if condition");
          complexMoreRepsArray.push(complexActions[cr]);

        }
      } else {
       // this.actionDoneComplex(complexActions[cr]);
        //this.actionDoneComplex(complexActions,exerciseDetails);

        complexRegRepsArray.push(complexActions[cr]);

        // let updateQuery = "UPDATE planactions SET status = " + status + ", repsdone = " + repscount + ", more_reps = " + morereps + ", date = '" + displayDate + "', tmax = " + tmax + ", workweight = " + workweight + ", intensity = " + intensity + " WHERE action_id = " + actionid;
        // console.log("updateQuery", updateQuery);
        // this.sqlStorageNew.query(updateQuery).then(

        //   updateActionData => {



        //   });

      }
    }
    setTimeout(() => {
      this.actionRegDoneComplex(complexRegRepsArray);
    }, 2000);
    setTimeout(() => {
      console.log("complexArray length", complexMoreRepsArray);
      if (complexMoreRepsArray.length > 0) {

        this.openMoreRepsComplex(complexMoreRepsArray);

      }
      if(this.actionType != 'MainSet') {
        this.actionDoneComplex(complexActions);
      }
    }, 500);

  }

  actionRegDoneComplex(complexActions) {

    var dispDate = new Date();
    var displayDate = dispDate.getFullYear() + '-' + ('0' + (dispDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (dispDate.getDate())).slice(-2) + ' ' + ('0' + (dispDate.getHours())).slice(-2) + ':' + ('0' + (dispDate.getMinutes())).slice(-2) + ':' + ('0' + (dispDate.getSeconds())).slice(-2);

    for (let cr = 0; cr < complexActions.length; cr++) {

      var repscount = complexActions[cr].reps;
      var dbWw = this.loadData.convertWeight(complexActions[cr].workweight, "db");

      var status = true;
      var workweight = dbWw;
      var tmax = complexActions[cr].tmax;
      var actionid = complexActions[cr].action_id;
      var intensity = complexActions[cr].intensity;
      var morereps = complexActions[cr].more_reps;
      var sessionId;

      let updateQuery = "UPDATE planactions SET status = " + status + ", repsdone = " + repscount + ", more_reps = " + morereps + ", date = '" + displayDate + "', tmax = " + tmax + ", workweight = " + workweight + ", intensity = " + intensity + " WHERE action_id = " + actionid;
      console.log("updateQuery", updateQuery);
      this.sqlStorageNew.query(updateQuery).then(

        updateActionData => {
          if(cr == (complexActions.length - 1)) {

            console.log("action done", updateActionData);
            this.completedSetArr = [];
            this.sqlStorageNew.query("select * from planactions where status = 1 and updatestatus = 0").then(
              completedSetData => {

                var updateWeight;
                for (var index = 0; index < completedSetData.res.rows.length; index++) {
                  updateWeight = this.loadData.convertWeight(completedSetData.res.rows.item(index).workweight, "db");
                  this.completedSetArr.push({ "intensity": String(completedSetData.res.rows.item(index).intensity), "plan_id": String(completedSetData.res.rows.item(index).plan_id), "setCompletedDate": completedSetData.res.rows.item(index).date, "setId": completedSetData.res.rows.item(index).action_id, "totalReps": completedSetData.res.rows.item(index).repsdone, "workweight": completedSetData.res.rows.item(index).workweight, "tmax": completedSetData.res.rows.item(index).tmax, "exId": completedSetData.res.rows.item(index).exercise_id });
                }
                if (localStorage.getItem('internet') === 'online') {
                 
                  var data = { "set_details": this.completedSetArr };
                  this.apiService.createsetdetails(data,this.tokken).subscribe((response)=>{
                    const userStr = JSON.stringify(response);
                    let res = JSON.parse(userStr);
                      for (var st = 0; st < completedSetData.res.rows.length; st++) {
                        this.sqlStorageNew.query("update planactions set updatestatus = 1 where id = " + completedSetData.res.rows.item(st).id);
                      }
                    }, (err) => {
                      if (err.status === 403) {
                        this.restModal.dismiss();
                        this.loadData.forbidden();
                      }
                    });
                }

              });

            localStorage.setItem('current_action', actionid);

            this.sqlStorageNew.query("select * from planactions where action_id = " + actionid).then(  
              actionData => {  
                console.log("completed action data", actionData.res.rows.item(0));
                let updateQueryDay = "UPDATE plandays SET status = " + status + ", date = '" + displayDate + "' where day_id = " + actionData.res.rows.item(0).day_id;
                let updateQueryActivity = "UPDATE planactivity SET status = " + status + ", date = '" + displayDate + "' where activity_id = " + actionData.res.rows.item(0).activity_id;
                let updateQueryRound = "UPDATE planround SET status = " + status + ", date = '" + displayDate + "' where round_id = " + actionData.res.rows.item(0).round_id;
                let updateQuerySession = "UPDATE plansessions SET status = " + status + ", date = '" + displayDate + "' where session_id = " + actionData.res.rows.item(0).session_id;

                sessionId = actionData.res.rows.item(0).session_id;
                this.summarySessionId = sessionId;

                this.sqlStorageNew.query(updateQueryDay);  
                this.sqlStorageNew.query(updateQueryActivity)
                this.sqlStorageNew.query(updateQueryRound)
                this.sqlStorageNew.query(updateQuerySession)
            });
          }
        });

    }


  }

  actionDoneComplex(complexActions) {

    var dispDate = new Date();
    var displayDate = dispDate.getFullYear() + '-' + ('0' + (dispDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (dispDate.getDate())).slice(-2) + ' ' + ('0' + (dispDate.getHours())).slice(-2) + ':' + ('0' + (dispDate.getMinutes())).slice(-2) + ':' + ('0' + (dispDate.getSeconds())).slice(-2);

    for (let cr = 0; cr < complexActions.length; cr++) {

      var repscount = complexActions[cr].reps;
      var dbWw = this.loadData.convertWeight(complexActions[cr].workweight, "db");

      var status = true;
      var workweight = dbWw;
      var tmax = complexActions[cr].tmax;
      var actionid = complexActions[cr].action_id;
      var intensity = complexActions[cr].intensity;
      var morereps = complexActions[cr].more_reps;
      var sessionId;

      let updateQuery = "UPDATE planactions SET status = " + status + ", repsdone = " + repscount + ", more_reps = " + morereps + ", date = '" + displayDate + "', tmax = " + tmax + ", workweight = " + workweight + ", intensity = " + intensity + " WHERE action_id = " + actionid;
      console.log("updateQuery", updateQuery);
      this.sqlStorageNew.query(updateQuery).then(

        updateActionData => {
          if(cr == (complexActions.length - 1)) {

            console.log("action done", updateActionData);
            this.completedSetArr = [];
            this.sqlStorageNew.query("select * from planactions where status = 1 and updatestatus = 0").then(
              completedSetData => {

                var updateWeight;
                for (var index = 0; index < completedSetData.res.rows.length; index++) {
                  updateWeight = this.loadData.convertWeight(completedSetData.res.rows.item(index).workweight, "db");
                  this.completedSetArr.push({ "intensity": String(completedSetData.res.rows.item(index).intensity), "plan_id": String(completedSetData.res.rows.item(index).plan_id), "setCompletedDate": completedSetData.res.rows.item(index).date, "setId": completedSetData.res.rows.item(index).action_id, "totalReps": completedSetData.res.rows.item(index).repsdone, "workweight": completedSetData.res.rows.item(index).workweight, "tmax": completedSetData.res.rows.item(index).tmax, "exId": completedSetData.res.rows.item(index).exercise_id });
                }
                if (localStorage.getItem('internet') === 'online') {
                 
                  var data = { "set_details": this.completedSetArr };
                 
                  this.apiService.createsetdetails(data,this.tokken).subscribe((response)=>{
                    const userStr = JSON.stringify(response);
                    let res = JSON.parse(userStr);
                      for (var st = 0; st < completedSetData.res.rows.length; st++) {
                        this.sqlStorageNew.query("update planactions set updatestatus = 1 where id = " + completedSetData.res.rows.item(st).id);
                      }
                    }, (err) => {
                      if (err.status === 403) {
                        this.restModal.dismiss();
                        this.loadData.forbidden();
                      }
                    });
                }

              });

            localStorage.setItem('current_action', actionid);

            this.sqlStorageNew.query("select * from planactions where action_id = " + actionid).then(

              actionData => {

                console.log("completed action data", actionData.res.rows.item(0));
                let updateQueryDay = "UPDATE plandays SET status = " + status + ", date = '" + displayDate + "' where day_id = " + actionData.res.rows.item(0).day_id;
                let updateQueryActivity = "UPDATE planactivity SET status = " + status + ", date = '" + displayDate + "' where activity_id = " + actionData.res.rows.item(0).activity_id;
                let updateQueryRound = "UPDATE planround SET status = " + status + ", date = '" + displayDate + "' where round_id = " + actionData.res.rows.item(0).round_id;
                let updateQuerySession = "UPDATE plansessions SET status = " + status + ", date = '" + displayDate + "' where session_id = " + actionData.res.rows.item(0).session_id;

                sessionId = actionData.res.rows.item(0).session_id;
                this.summarySessionId = sessionId;

                this.sqlStorageNew.query(updateQueryDay).then(

                  daydata => {


                  });


                this.sqlStorageNew.query(updateQueryActivity).then(

                  activitydata => {

                  });

                this.sqlStorageNew.query(updateQueryRound).then(

                  rounddata => {

                  });

                this.sqlStorageNew.query(updateQuerySession).then(

                  sessiondata => {

                  });
                this.sqlStorageNew.query("select * from planactions where activity_id = " + this.planActivity[this.planActivity.length - 1].activity_id + " AND action_id > " + actionid + " AND status=0").then(
                  leftActions => {
                    if (leftActions.res.rows.length === 0) {

                      console.log("session end for complex -----------------------------------------");
                      this.sessionEnd = true;
                      if (this.sessionEnd) {

                        setTimeout(() => {
                          this.cooldown = true;
                          //localStorage.setItem('cooldownCompleted','true');
                          //this.warmup = false;
                          localStorage.setItem('generalwarmupcmpl', 'false');
                          this.cooldownCompleted = "false";
                          this.getCoolDownEx();
                        }, 1000);
                               
                      } else {
                        var resttime = 1;
                        if (this.restTime == 0) {
                          resttime = 1;
                        } else {
                          resttime = 1;
                        }
                        this.actionrestpopComplex(1, this.complexActions[cr]);
                      }
                    } else {
                      this.actionrestpopComplex(1, this.complexActions[cr]);
                    }
                  }
                );
              });
          }
        });

    }


  }

  actionrestpopComplex(restTime, actionData) {

    // if (restTime.toString().indexOf('.') !== -1) {
    //   var tempRTM = Math.floor(restTime);
    //   var tempRTS;
    //   if (restTime.toString().split('.')[1].length === 1) {
    //     tempRTS = parseInt((restTime.toString().split('.')[1] + '0'), 10);
    //   } else {
    //     tempRTS = parseInt(restTime.toString().split('.')[1], 10);
    //   }
    //   restTime = (tempRTM * 60) + tempRTS;
    // } else {
    //   restTime = restTime * 60;
    // }

    restTime = restTime * 60;

    console.log("action ex name", actionData.exerciseName);
    console.log("action data ex id", actionData.exId);

    this.warmupRestModal = this.modalCtrl.create({
      component:TimerpopupPage,
      componentProps: {
      'rest': restTime, 'setname': "Action " + actionData.exId,
      'excercisename': actionData.exerciseName,
      'excerciseid': actionData.exId,
      'setworkweight': actionData.workweight,
      'repsdone': this.repscount, "calories": 0, "exFinished": false }
    });
    //   if(!this.showVideo){
    //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' +this.activeExerciseId);
    //   this.myVideo.muted=true;
    //   this.myVideo.pause();
    // }
    this.warmupRestModal.present();
    this.warmupRestModal.onDidDismiss.then((data) => {
      

      this.loadComplexData();


      // if(!this.showVideo){
      // setTimeout(() => {

      //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-'+this.activeExerciseId);
      //   this.myVideo.muted=true;
      //   this.myVideo.play();
      //   this.myVideo.loop = true;

      //   },1000);
      // }
      // if(this.warmupArr.length===0){
      //     this.backButtonAction();
      // }
    });
  }

  selectANumberComplex(action) {
    console.log("Prescribed reps complex", action.prescribed_reps);
    if(!this.isWheelSelectorShow){
     
      this.isWheelSelectorShow = true;
      var pReps = action.prescribed_reps;
      this.prescribedReps.numbers = [];
      this.repscount = parseInt(pReps, 10);

      var range = parseInt(pReps, 10);
      for (var rr = 1; rr <= range; rr++) {
        this.prescribedReps.numbers.push({ description: String(rr) });
      }


      setTimeout(() => {
        console.log("Prescribed reps complex ----", this.prescribedReps.numbers);
        this.defaultRepValue = this.prescribedReps.numbers[this.prescribedReps.numbers.length - 1].description;
        
        this.selector.show({
          title: "Reps Done",
          items: [
            this.prescribedReps.numbers
          ],
          defaultItems: [
            { index: 0, value: this.defaultRepValue }
          ]
        }).then(
          result => {
            console.log("wheel selector plugin------",result);
            this.isWheelSelectorShow = false;
            this.pReps = result[0].description;
            action.reps = parseInt(this.pReps, 10);
          },
          err =>{
            console.log('Error: ', err);
            this.isWheelSelectorShow = false;
          });

      }, 500);  

    }
    

  }

  //------------------------------------------------complex methods end------------------------------------

 async opensessionPopup(sessionId) {

    let modal = await this.modalCtrl.create({
      component:SessionsummaryPage,
      componentProps: { day_id: this.currentDayId, session_id: sessionId }
    });
    modal.present();

  }

  onSessionChange() {

    setTimeout(() => {

      this.sqlStorageNew.query("select * from planactivity where session_id = " + this.activeSessionId).then(
        activityData => {

          this.planActivity = [];

          if (activityData.res.rows.item(0).Activity_type === "Simple") {

            this.isActivitySimple = true;

          } else {

            this.isActivitySimple = false;

          }
          this.planActivity = [];
          for (let mi = 0; mi < activityData.res.rows.length; mi++) {

            console.log("activity data", activityData.res.rows.item(mi));
            this.planActivity.push(activityData.res.rows.item(mi));

          }

          //this.currentActivityId = activityData.res.rows.item(0).activity_id;
          this.currentActivityIndex = -1;
          this.getActivityData();
          //console.log(this.MicroDataM);
        }
      );
    }, 500);


  }

  generalWarmupDone() {

    this.generalWarmupPopClosed = "true";
    this.generalWarmupCompleted = "true";
    localStorage.setItem('generalwarmupcmpl', 'true');

    // this.pageTop.scrollToTop();
    //localStorage.setItem('excercisewarmupcmpl','false');
    // localStorage.setItem('excercisewarmupcmpl','false');
    //localStorage.setItem('excercisewarmupcmplcount',"0");


  }

  cooldownDone() {

    this.cooldown = false;
    this.cooldownCompleted = "true";
    localStorage.setItem('cooldownCompleted', 'true');

    this.opensessionPopup(this.summarySessionId);
  }

  getCoolDownEx() {

    this.internetConn = (localStorage.getItem('internet') === 'online') ? true : false;
    this.cooldown = true;
    //this.cooldownCompleted = localStorage.getItem('cooldownCompleted');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + this.coolDownVideo + '?rel=0&enablejsapi=1&nologo=1&showinfo=0');
    console.log({ "coolDownTitle": "Cooldown" });
    console.log({ "video": this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + this.coolDownVideo + '?rel=0&enablejsapi=1&nologo=1&showinfo=0') });
    console.log({ "prompt": "<strong>Lets begin the cooldown</strong>" });
    var cooldownText = '<strong>Cooldown with exercises from the video or perform any three from the list below</strong><br />';
    this.sqlStorageNew.query("select * from cooldown").then(
      data => {
        cooldownText += "<br/>";
        for (let i = 0; i < data.res.rows.length; i++) {
          cooldownText += "<hr>" + data.res.rows.item(i).name + "<br />";
        }
        console.log({ "prompt": cooldownText });
        this.cooldownMsg = cooldownText;
        console.log(this.cooldownCompleted);
        //this.warmup = true;
        this.warmuptype = 'cool';
        //this.inProcess = false;
        //this.callFunction();
      }
    );

  }

 async openExercise(Exc) {

    console.log("ex details", Exc);
    // let modal = this.modalCtrl.create(ExercisePage);
    // modal.present();
    let modal = await this.modalCtrl.create({
      component:ShowexercisePage,
      componentProps: { ExcDetails: Exc }
    });
    modal.present();


  }


  loadGeneralWarmups() {

    console.log("Inside Warmups section");

    var todayDatew = new Date();
    this.toDayDateWarmup = ('0' + (todayDatew.getDate())).slice(-2) + "/" + ('0' + (todayDatew.getMonth() + 1)).slice(-2) + "/" + todayDatew.getFullYear();
    console.log("todaydate", this.toDayDateWarmup);
    this.sqlStorageNew.query("select * from plan").then(warmup => {
      this.coolDownVideo = warmup.res.rows.item(0).cooldownVideo;
      console.log("cooldownvideo", this.coolDownVideo);
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + warmup.res.rows.item(0).genWarmupVideo + '?rel=0&enablejsapi=1&nologo=1&showinfo=0');
      console.log(this.videoUrl);
      console.log({ "warmupTitle": "Warm Up" });
      console.log({ "video": this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/' + warmup.res.rows.item(0).genWarmupVideo + '?rel=0&enablejsapi=1&nologo=1&showinfo=0') });
      console.log({ "prompt": "<strong>Lets begin the Warm Up</strong>" });

      var genWarmupText = '<strong>Warm Up with exercises from the video or perform any three from the list below</strong><br />';

      this.sqlStorageNew.query("select * from genwarmup").then(
        data => {

          console.log("general warmup section");
          // var genWarmupText;
          for (let i = 0; i < data.res.rows.length; i++) {
            console.log("forloop " + i);
            if (data.res.rows.item(i).reps > 0) {
              genWarmupText += "<hr>" + data.res.rows.item(i).name + " : " + data.res.rows.item(i).reps + " reps<br />";
              console.log("warmup ex " + i, genWarmupText + ">0");
            }
            if (data.res.rows.item(i).reps == 0) {
              genWarmupText += "<hr>" + data.res.rows.item(i).name + " : " + data.res.rows.item(i).extime + " Minutes<br />";
              console.log("warmup ex " + i, genWarmupText + "==0");
            }
          }
          console.log({ "prompt": genWarmupText });
          //this.callFunction();

          this.genWarmupMsg = genWarmupText;
        }
      );
    });


  }

 async actionrestpop(restTime, actionData) {

    if (restTime.toString().indexOf('.') !== -1) {
      var tempRTM = Math.floor(restTime);
      var tempRTS;
      if (restTime.toString().split('.')[1].length === 1) {
        tempRTS = parseInt((restTime.toString().split('.')[1] + '0'), 10);
      } else {
        tempRTS = parseInt(restTime.toString().split('.')[1], 10);
      }
      restTime = (tempRTM * 60) + tempRTS;
    } else {
      restTime = restTime * 60;
    }

    console.log("action ex name", actionData.exerciseName);
    console.log("action data ex id", actionData.exId);

    this.warmupRestModal =await this.modalCtrl.create({
      component:TimerpopupPage,
      componentProps: {
      'rest': restTime, 'setname': "Action " + actionData.exId,
      'excercisename': actionData.exerciseName,
      'excerciseid': actionData.exId,
      'setworkweight': actionData.workweight,
      'repsdone': this.repscount, "calories": 0, "exFinished": false }
    });
    //   if(!this.showVideo){
    //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' +this.activeExerciseId);
    //   this.myVideo.muted=true;
    //   this.myVideo.pause();
    // }
    this.warmupRestModal.present();
    this.warmupRestModal.onDidDismiss.then((data) => {

      this.getActionData(false);


      // if(!this.showVideo){
      // setTimeout(() => {

      //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-'+this.activeExerciseId);
      //   this.myVideo.muted=true;
      //   this.myVideo.play();
      //   this.myVideo.loop = true;

      //   },1000);
      // }
      // if(this.warmupArr.length===0){
      //     this.backButtonAction();
      // }
    });
  }

  // ionViewWillUnload() {

    //this.platform.pause.unsubscribe();
    //this.platform.resume.unsubscribe();

  // }

  callFunction() {
    setTimeout(() => { this.content.scrollToBottom(); }, 100);
  }

  // public displayCalendar() {

  //   var fromDate;
  //   fromDate = new Date();
  //   this.calendarCtrl.openCalendar({
  //     from: fromDate,
  //     weekdays: ["S", "M", "T", "W", "T", "F", "S"]
  //   })
  //     .then((res: any) => {
  //       var date = new Date(res.string);
  //       this.pStartDate = this.loadData.changeDateFormat(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(), 'view');
  //       const dateCon = new Date(this.pStartDate);
  //       const momentDate = Moment(dateCon.toISOString());

  //       var sessDate = Moment(momentDate).format("DD-MM-YYYY");
  //       var dt = new Date(this.pStartDate);
  //       this.showStartDate = this.loadData.dateFormat(dt);
  //       dt.setDate(dt.getDate() + 6);
  //       this.getOffDay = dt.getDay();

  //       if (this.getOffDay === 0) {
  //         this.offday = "Sunday";
  //       } else if (this.getOffDay === 1) {
  //         this.offday = "Monday";
  //       } else if (this.getOffDay === 2) {
  //         this.offday = "Tuesday";
  //       } else if (this.getOffDay === 3) {
  //         this.offday = "Wednesday";
  //       } else if (this.getOffDay === 4) {
  //         this.offday = "Thursday";
  //       } else if (this.getOffDay === 5) {
  //         this.offday = "Friday";
  //       } else if (this.getOffDay === 6) {
  //         this.offday = "Saturday";
  //       }
  //       this.callFunction();
  //       this.pStartDate = sessDate;
  //     })
  // }

  showsetdata(idx) {


  }

  setSlideChanged() {


  }

  onSetIonDrag(event) {
    // this.slider.lockSwipes(this.isLockSwipes); 
  }



  async planDetails(plan) {
    let modal = await this.modalCtrl.create({
      component:ProgramdetailsPage, 
      componentProps:{ "plandetails": plan }
    });
    //let modal = this.modalCtrl.create(ProgramdetailsPage,{"plandetails":plan,"upstate":this.uplanstate});
    modal.present();
  }

  showPlanDetails() {

    this.modalCtrl.create({component:MysubscriptionPage});

  }


  async planRenew() {
    let modal = await this.modalCtrl.create({
      component:PlanrenewalPage,
      componentProps: { planComplete: this.planComplete }
    });
    modal.present();
  }

  async planCompleted() {
    let modal = await this.modalCtrl.create({
      component:PlancompletedPage,
      componentProps: { planComplete: this.planComplete, planName: this.planInfo.planName }
    });
    modal.present();
  }

  public changeSDate() {
    this.modalCtrl.create({
      component:StartdatePage, 
      componentProps:{ 'uplandata': { 'plan_id': this.futurePlanId, 'planName': this.futurePlanName, 'planPhoto': this.futurePlanPhoto, 'startdate': this.futurestartdate } }
    });
  }

  tmaxSummary() {
    this.modalCtrl.create({
      component:TmaxsummaryPage,
      componentProps: { page: 1 }
       });
  }

  async showAlert() {
    this.alert = await this.alertCtrl.create({
      // title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            // this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }

//-------------------------------------------------------workout---------------------------------------------------------------------------

// basic number selection, index is always returned in the result
  selectANumber() {

    if(!this.isWheelSelectorShow){
      this.isWheelSelectorShow = true;
      this.selector.show({
        title: "Reps Done",
        items: [
          this.prescribedReps.numbers
        ],
        defaultItems: [
          { index: 0, value: this.defaultRepValue }
        ]
      }).then(
        result => {
          console.log("wheel selector plugin------",result);
          this.isWheelSelectorShow = false;
          this.pReps = result[0].description;
          this.repscount = parseInt(this.pReps, 10);
        },
        err =>{
          console.log('Error: ', err);
          this.isWheelSelectorShow = false;
        } 
      );

    }
    
  }



 async tmaxShowPreview(exObj, excercise, tmax, metric) {
    console.log(exObj);

    let modal = await this.modalCtrl.create({
      component:TmaxpreviewPage,
      componentProps: { ExObj: exObj, ExerciseName: excercise, Tmax: tmax, Metric: metric, FromPage: "workout" }
    });

    modal.present();
    modal.onDidDismiss().then((data) => {
      //this.getSetData();
      this.generalWarmupCompleted = "true";
      localStorage.setItem('generalwarmupcmpl', 'true');

      this.loadExercises();
      console.log("tmax chk complex update----",this.isActivitySimple);
      if(this.isActivitySimple){

        this.getActionData(true);

      }else{
        //this.getActionData(true);
        console.log("tmax chk complex update----",this.isActivitySimple);
        this.loadComplexData();

      }

      if (this.exwarmup && this.excerciseWarmupCompleted == "false") {

        // this.loadExerciseWarmups();

      }
    });

  }

 async changeTmax() {
    this.selector.show({
      title: "Tmax Change",
      items: [
        this.tmaxValue.numbers
      ],
      defaultItems: [
        { index: 0, value: this.defaultTmaxValue }
      ]
    }).then(
      result => {

        this.prompt = this.alertCtrl.create({
          // title: 'Tmax Change!',
          message: 'Do you want to change Tmax of other exercises too?',
          buttons: [
            {
              text: 'Yes',
              handler: workout => {

                var exTmaxChanged = this.loadData.convertWeight(parseInt(result[0].description, 10), "db");
                this.editAllTmax(this.setArr[this.setIndex].exerciseId, exTmaxChanged);


              }
            }, {
              text: 'No',
              handler: workout => {

                // this.loadData.startLoading();
                this.exerciseTmax = this.loadData.convertWeight(parseInt(result[0].description, 10), "db");
                if (localStorage.getItem('internet') === 'online') {
                  this.updateTmaxData();
                }
                this.sqlStorageNew.query("UPDATE exercises SET updatetmax = " + this.exerciseTmax + " WHERE id=" + this.setArr[this.setIndex].exerciseId).then(data => {
                  //this.getSetData();
                });

              }
            }
          ]
        });
       this.prompt.present();

      },
      err => console.log('Error: ', err)
    );
  }

  editAllTmax(ex_id, ex_tmax) {
    var exercises = [];
    console.log("at edit all tmax", ex_tmax);
    this.allExercises = [];
    var index = 0;
    var wMetric = (localStorage.getItem('weightunit') === 'lbs') ? " Lb" : " Kg";
    var firstTime = (localStorage.getItem('tmaxfirstTime') === 'true') ? true : false;
    // this.loadData.startLoading();
    this.sqlStorageNew.query("SELECT * FROM exercises ORDER BY exOrder ASC").then(
      sdata => {
        for (var i = 0; i < sdata.res.rows.length; i++) {
          sdata.res.rows.item(i).updatetmax = this.loadData.convertWeight(sdata.res.rows.item(i).updatetmax, "view");
          if (sdata.res.rows.item(i).accessLevel === 0) {
            sdata.res.rows.item(i).wMetric = wMetric;
          } else {
            if (sdata.res.rows.item(i).tmaxWeight) {
              sdata.res.rows.item(i).wMetric = wMetric;
            } else if (sdata.res.rows.item(i).tmaxDistance) {
              sdata.res.rows.item(i).wMetric = "Meters";
            } else if (sdata.res.rows.item(i).tmaxTime) {
              sdata.res.rows.item(i).wMetric = "Minutes";
            } else if (sdata.res.rows.item(i).tmaxReps) {
              sdata.res.rows.item(i).wMetric = "Reps";
            } else if (sdata.res.rows.item(i).tmaxSpeed) {
              sdata.res.rows.item(i).wMetric = "Kmph";
            } else if (sdata.res.rows.item(i).tmaxHeight) {
              sdata.res.rows.item(i).wMetric = "Cms";
            }
          }
          this.allExercises.push(sdata.res.rows.item(i));

          //this.getExtraExercises(this.mainExercises[i].id);
        }
        //console.log(this.allExercises);
        // this.loadData.stopLoading();

        for (var vi = 0; vi < this.allExercises.length; vi++) {
          if (this.allExercises[vi].id = ex_id) {

            index = vi;
          }

        }
      }
    );


    if (this.allExercises[index].derivedFrom === 0) {

      this.allExercises[index].updatetmax = ex_tmax;
      this.sqlStorageNew.query("UPDATE exercises SET tmax=" + this.allExercises[index].updatetmax + ",updatetmax=" + this.allExercises[index].updatetmax + " WHERE id=" + this.allExercises[index].id);
      exercises.push({ "tmax": this.allExercises[index].updatetmax, "updatetmax": this.allExercises[index].updatetmax, "id": this.allExercises[index].id, "exerciseName": this.allExercises[index].exerciseName });

      var tmaxEx = [];
      for (var pr = 0; pr < this.allExercises.length; pr++) {

        if (this.allExercises[pr].derivedFrom === 0) {

          tmaxEx.push(this.allExercises[pr]);

        } else {

          console.log(tmaxEx);
          for (var ei = 0; ei < tmaxEx.length; ei++) {

            if (this.allExercises[pr].derivedFrom === tmaxEx[ei].id) {

              var exIndex = ei;

            }
          }

          this.allExercises[pr].updatetmax = Math.round(tmaxEx[exIndex].updatetmax * this.allExercises[pr].derivedFormula);

          this.sqlStorageNew.query("UPDATE exercises SET tmax=" + this.allExercises[pr].updatetmax + ",updatetmax=" + this.allExercises[pr].updatetmax + " WHERE id=" + this.allExercises[pr].id);
          exercises.push({ "tmax": this.allExercises[pr].updatetmax, "updatetmax": this.allExercises[pr].updatetmax, "id": this.allExercises[pr].id, "exerciseName": this.allExercises[pr].exerciseName });

        }
      }

    } else {

      this.allExercises[index].updatetmax = ex_tmax;
      var tmaxEx = [];

      for (var pr = 0; pr < this.allExercises.length; pr++) {

        if (this.allExercises[pr].derivedFrom === 0) {

          tmaxEx.push(this.allExercises[pr]);

          if (this.allExercises[index].derivedFrom === this.allExercises[pr].id) {

            this.allExercises[pr].updatetmax = Math.round(this.allExercises[index].updatetmax / this.allExercises[index].derivedFormula);
            this.sqlStorageNew.query("UPDATE exercises SET tmax=" + this.allExercises[pr].updatetmax + ",updatetmax=" + this.allExercises[pr].updatetmax + " WHERE id=" + this.allExercises[pr].id);
            exercises.push({ "tmax": this.allExercises[pr].updatetmax, "updatetmax": this.allExercises[pr].updatetmax, "id": this.allExercises[pr].id, "exerciseName": this.allExercises[pr].exerciseName });


          }

        } else {

          for (var ei = 0; ei < tmaxEx.length; ei++) {

            if (this.allExercises[pr].derivedFrom === tmaxEx[ei].id) {

              console.log("Main Excercise", tmaxEx[ei].updatetmax);
              var exIndex = ei;

            }
          }

          this.allExercises[pr].updatetmax = Math.round(tmaxEx[exIndex].updatetmax * this.allExercises[pr].derivedFormula);
          this.sqlStorageNew.query("UPDATE exercises SET tmax=" + this.allExercises[pr].updatetmax + ",updatetmax=" + this.allExercises[pr].updatetmax + " WHERE id=" + this.allExercises[pr].id);
          exercises.push({ "tmax": this.allExercises[pr].updatetmax, "updatetmax": this.allExercises[pr].updatetmax, "id": this.allExercises[pr].id, "exerciseName": this.allExercises[pr].exerciseName });

        }
      }

    }
    //   setTimeout(function(){
    //   for (var pr = 0; pr < this.allExercises.length; pr++) {

    //   this.sqlStorage.query("UPDATE exercises SET tmax="+this.allExercises[pr].updatetmax+",updatetmax="+this.allExercises[pr].updatetmax+" WHERE id="+this.allExercises[pr].id);
    //   exercises.push({"tmax":this.allExercises[pr].updatetmax,"updatetmax":this.allExercises[pr].updatetmax,"id":this.allExercises[pr].id,"exerciseName":this.allExercises[pr].exerciseName});

    //   }
    //  },2000);

    this.updateTmax(exercises);
  }

 async updateTmax(exercises) {
    if (localStorage.getItem('internet') === 'online') {
      // this.loadData.startLoading();
     
      var tmaxdata = { tmaxData: exercises };
      this.apiService.updateBulkTmaxData(tmaxdata,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          // this.loadData.stopLoading();
          if(res.success){
            this.toastmsg("Tmax updated successfully");
          } else {
          }
        }, (err) => {
          this.toastmsg(err);
          if (err.status === 403) {
            this.loadData.forbidden();
            this.nav.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
    } else {
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  generateTmaxSelection() {

    let tmaxSel = this.defaultTmaxValue - 5;
    let tempSel = this.loadData.convertWeight(tmaxSel, 'db');
    if (this.setArr[this.setIndex].advExercise === 0) {

      if (localStorage.getItem('weightunit') === 'kgs') {

        tmaxSel = (tempSel < 10) ? 10 : tmaxSel;

      } else {

        tmaxSel = (tempSel < 22) ? 22 : tmaxSel;
      }

    } else {
      tmaxSel = (tempSel < 5) ? 5 : tmaxSel;
    }
    this.tmaxValue.numbers = [];
    for (let x = 0; x < 10; x++) {
      this.tmaxValue.numbers.push({ description: String(tmaxSel + x) });
    }
  }

  restpop(restTime) {

    if (restTime.toString().indexOf('.') !== -1) {
      var tempRTM = Math.floor(restTime);
      var tempRTS;
      if (restTime.toString().split('.')[1].length === 1) {
        tempRTS = parseInt((restTime.toString().split('.')[1] + '0'), 10);
      } else {
        tempRTS = parseInt(restTime.toString().split('.')[1], 10);
      }
      restTime = (tempRTM * 60) + tempRTS;
    } else {
      restTime = restTime * 60;
    }
    var exFinished = false;
    //var exData=[];
    if (this.setArr[this.setIndex].exerciseId !== this.setArr[this.setIndex + 1].exerciseId) {

      exFinished = true;


    } else {

      exFinished = false;

    }
    let totalwork = Math.round(this.setArr[this.setIndex].workFormula * 9.8 * this.setArr[this.setIndex].workweight * this.repscount);
    let exCal = Math.round(totalwork * 0.238902957619); /* converting lbs to kgs for calculations */

    this.restModal = this.modalCtrl.create({
      component:TimerpopupPage, 
      componentProps:{
      'rest': restTime, 'setname': this.setArr[this.setIndex].setName,
      'excercisename': this.setArr[this.setIndex].exName,
      'excerciseid': this.setArr[this.setIndex].exerciseId,
      'setworkweight': this.setArr[this.setIndex].workweight + " " + this.metrics,
      'repsdone': this.repscount, "calories": exCal, "exFinished": exFinished }
    });
    //   if(!this.showVideo){
    //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' +this.activeExerciseId);
    //   this.myVideo.muted=true;
    //   this.myVideo.pause();
    // }
    this.restModal.present();
    this.restModal.onDidDismiss.then((data) => {
      // if(!this.showVideo){
      // setTimeout(() => {

      //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-'+this.activeExerciseId);
      //   this.myVideo.muted=true;
      //   this.myVideo.play();
      //   this.myVideo.loop = true;

      //   },1000);
      // }
      if (this.setArr.length === 0) {
        this.backButtonAction();
      }
    });
  }

  public connectionCheck() {
    var conn;
    if (localStorage.getItem('internet') === 'online') {
      conn = true;
    } else {
      conn = false;
    }
    return conn;
  }


backButtonAction() {

    localStorage.setItem('totalreps', '');
    // localStorage.setItem('tmax','');
    localStorage.setItem('totalweight', '');
    localStorage.setItem('tonnage', '');
    localStorage.setItem('work', '');
    localStorage.setItem('cal', '');
    setTimeout(() => {
      this.nav.navigateForward('/dashboard');
    }, 200);
  }

  public closeAppAction() {
    if (this.alertApp) {
      this.alertApp.dismiss();
      this.alertApp = null;
    } else {

      this.showAppAlert();

    }
  }

 async showAppAlert() {
    this.alertApp = await this.alertCtrl.create({
      // title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertApp = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            // this.platform.exitApp();
          }
        }
      ]
    });
    this.alertApp.present();
  }

  updateTmaxData() {
    var data = {
      exercise_id: this.workExID,
      updateTmax: this.loadData.convertWeight(this.exerciseTmax, "db"),
      updateType: ''
    };
    this.apiService.updateTmaxData(data,this.tokken).subscribe((response)=>{
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
        setTimeout(() => {
          // this.loadData.stopLoading();
        }, 2000);
      }, (err) => {
        setTimeout(() => {
          // this.loadData.stopLoading();
        }, 2000);
        if (err.status === 403) {
          //this.restModal.dismiss();
          this.loadData.forbidden();
          this.nav.navigateForward('/login');
        }
      });
  }

 async showInst(exercise) {
    let modal = await this.modalCtrl.create({
      component:InstpopupPage,
      componentProps: { 'instData': exercise }
    });
    modal.present();
  }

  async weightCal(weight) {
    let modal = await this.modalCtrl.create({
      component:WtcalpopupPage,
      componentProps: { 'weight': weight}
     });
    modal.present();
  }

}
