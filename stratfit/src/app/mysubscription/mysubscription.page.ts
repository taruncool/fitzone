import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { ApiService } from '../../app/api.service';
import { LoadData } from '../../providers/loaddata';
import {StartdatePage} from '../startdate/startdate.page';
import { GlossaryPage } from '../mysubscription/glossary/glossary.page';

@Component({
  selector: 'app-mysubscription',
  templateUrl: './mysubscription.page.html',
  styleUrls: ['./mysubscription.page.scss'],
})
export class MysubscriptionPage implements OnInit {
  mysubtabs;
  plandetails:any=[];
  token;
  currencyType;
  currencyCode;
  loginuserid;
  activeplanid;
  activeseason;
  planSet;
  setIntensity;
  advExercise;
  SetData=[];
  PeriodData=[];
	MesoData=[];
	MicroData=[];
	SessionData=[];
  ExerciseData=[];
  Lpath;
  activePeriod;
  activeMeso;
  activeMicro;
  activeSession;
  activeExercise;
  firstPlan:any;
  freeplan:any;
  prompt;
  planDescription:any=[];
  rate;
  futureplanid;
  planState;

  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService: ApiService, private http: HttpClient, private loadData: LoadData, public toastCtrl: ToastController,public sqlStorageNew:SqlStorageNew, public modalCtrl: ModalController, public platform: Platform){
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
  }
 async ngOnInit() {
    //this.ga.trackView('mysubscription');
    this.mysubtabs = "pabout";
    this.currencyCode = '$';
    this.loginuserid = localStorage.getItem('userId');
    this.token = localStorage.getItem('usertoken');
    this.currencyType = localStorage.getItem('currencyType');
    if(this.currencyType==="INR"){
      this.currencyCode = '&#x20B9;'
    }
    this.futureplanid = localStorage.getItem('futureplanid');
    if(this.futureplanid !='' && this.futureplanid !=null && this.futureplanid !=undefined){
      this.planState = 3;
    }else{
      this.planState = 1;
    }
    console.log("Future Plan Id",this.futureplanid)
   
    this.loadData.startLoading();

    this.sqlStorageNew.query("select p.id, p.planName, p.createdBy,p.createdByImg, p.price, p.planPhoto, p.planDescription, p.ability, p.goals, p.duration_weeks, p.totalsubscribers ,u.startdate, u.nextrenewaldate, u.plan_id, u.dayOff, u.seasonDate from userplan u left join plan p on u.plan_id = p.id")
    .then(response => {
      console.log(response);
      if(response.res.rows.length > 0) {
          if(response.res.rows.item(0)){
            this.plandetails = response.res.rows.item(0);
            console.log(this.plandetails);
            this.activeplanid = this.plandetails.id;
           // this.viwPlanStructure(this.activeplanid);
            this.existingUserRating(this.activeplanid);
            if (this.platform.is('ios') && this.plandetails.price !="Free") {
              // var headers = new Headers();
              // headers.append('Content-Type', 'application/json');
              // headers.append('Authorization', this.token);
              // this.http.get(global.baseURL + 'utility/getpriceMap/', { headers: headers })
              //   .subscribe(response => {
              this.apiService.getpriceMap(this.token).subscribe((response)=>{
                const userStr = JSON.stringify(response);
                  let res = JSON.parse(userStr);
                  var priceMap = res.details;
                  var price1 = this.loadData.currencyConversionUSD(this.plandetails.price,'view',priceMap[this.plandetails.price]);
                  var roundPrice = price1.toFixed(2);
                  if(price1 === 0){
                      this.plandetails.price = "Free";
                  }else{
                      this.plandetails.price = this.currencyCode+roundPrice;
                  }
              },(err) => {
                this.loadData.stopLoading();
                if(err.status === 403){
                    this.loadData.forbidden();
                    this.navCtrl.navigateForward('/login');
                }
              });
            } else {
              if(this.plandetails.price !="Free"){
                this.http.get('https://free.currencyconverterapi.com/api/v6/convert?q=USD_INR')
                .subscribe(response=>{
                  const userStr = JSON.stringify(response);
                  let res = JSON.parse(userStr);
                  var priceMap = res.details;
                  var price1 = this.loadData.currencyConversion(this.plandetails.price,'view',res.results.USD_INR.val);
                  var roundPrice = price1.toFixed(2);
                  if(price1 === 0){
                      this.plandetails.price = "Free";
                  }else{
                      this.plandetails.price = this.currencyCode+roundPrice;
                  }
                });
              //  }
            }
          }
         
            if(this.plandetails.dayOff === 0){
              this.plandetails.dayoff = "Sunday";
            }else if(this.plandetails.dayOff === 1){
              this.plandetails.dayoff = "Monday";
            }else if(this.plandetails.dayOff === 2){
              this.plandetails.dayoff = "Tuesday";
            }else if(this.plandetails.dayOff === 3){
              this.plandetails.dayoff = "Wednesday";
            }else if(this.plandetails.dayOff === 4){
              this.plandetails.dayoff = "Thursday";
            }else if(this.plandetails.dayOff === 5){
              this.plandetails.dayoff = "Friday";
            }else if(this.plandetails.dayOff === 6){
              this.plandetails.dayoff = "Saturday";
            }

            if(this.plandetails.startdate !==''){
              var todayDate = this.loadData.changeDateFormat(this.plandetails.startdate,"view");
              todayDate = new Date(todayDate);
              this.plandetails.startdate = this.loadData.dateFormat(todayDate);
            }
            if(this.plandetails.nextrenewaldate !==''){
              var todayDate2 = this.loadData.changeDateFormat(this.plandetails.nextrenewaldate,"view");
              todayDate2 = new Date(todayDate2);
              this.plandetails.nextrenewaldate = this.loadData.dateFormat(todayDate2);
            }
            if(this.plandetails.seasonDate !=="null" && this.plandetails.seasonDate !=="undefined" && this.plandetails.seasonDate !==null && this.plandetails.seasonDate !==undefined){
              this.activeseason = true;
              var todayDate3 = this.loadData.changeDateFormat(this.plandetails.seasonDate,"view");
              todayDate3 = new Date(todayDate3);
              this.plandetails.seasonDate = this.loadData.dateFormat(todayDate3);
            }else{
              this.activeseason = false;
            }

            this.loadData.stopLoading();
      
          }
      }else{
        this.loadData.stopLoading();
      }
    });
  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async existingUserRating(activePlanId){
    // if(localStorage.getItem('internet')==='online'){
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.token);
      var creds =  {"user_id":this.loginuserid, "plan_id":activePlanId,"get_rating":1};
      return new Promise((resolve) => {
        // this.http.post(global.baseURL + 'program/createPlanRating/', creds, { headers: headers })
        // .subscribe(response => {
        //     if(response.json().success){
        this.apiService.createPlanRating(creds,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
              if(res.success){
              this.rate = res.rating;
            }
        },(err) => {
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
      })
    // }else{
    //   let toast = await this.toastCtrl.create({
    //     message: "Please check your internet connectivity and try again",
    //     duration: 3000
    //   });
    //   toast.present();
    // }
  }

  async planRating(rate){
    // if(localStorage.getItem('internet')==='online'){
      var creds =  {"user_id":this.loginuserid, "plan_id":this.activeplanid, "rating":rate};
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.token);
      return new Promise((resolve) => {
        // this.http.post(global.baseURL + 'program/createPlanRating/', creds, { headers: headers })
        // .subscribe(response => {
        //     if(response.json()){
        this.apiService.createPlanRating(creds,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
              this.rate = rate;
              this.toastmsg(res.message);
              // let toast = await this.toastCtrl.create({
              //   message: res.message,
              //   duration: 3000
              // });
              // toast.present();
            }else{
              this.toastmsg("Unable to process your request. Please try after some time");
              // let toast = await this.toastCtrl.create({
              //   message: "Unable to process your request. Please try after some time",
              //   duration: 3000
              // });
              // toast.present();
            }
        },(err) => {
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });

      })
    // }else{
    //   let toast = await this.toastCtrl.create({
		// 		message: "Please check your internet connectivity and try again",
		// 		duration: 3000
		// 	});
		// 	toast.present();
    // }
  }

  async viwPlanStructure(cplan_id){
    // if(localStorage.getItem('internet')==='online'){
      
      var creds = {"plan_id":cplan_id};
      var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      var usertoken = headers.append('Authorization', localStorage.getItem('usertoken'));
      return new Promise((resolve) => {
        // this.http.post(global.baseURL + 'program/viewplan/', creds, { headers: headers })
        // .subscribe(response => {
        //     this.loadData.stopLoading();
        //     if(response.json()){
        this.apiService.viewplan(creds,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            this.loadData.stopLoading();
              if(res.success){
              this.PeriodData = res.plan.PeriodDetails;
              //this.PeriodData = JSON.parse(response.json().plan.PlanJson).PeriodDetails;
              this.getInitLevel();
            }else{
              this.toastmsg("Please check your internet connectivity and try again");
              // let toast = await this.toastCtrl.create({
              //   message: "Unable to process your request. Please try after some time",
              //   duration: 3000
              // });
              // toast.present();
            }
        },(err) => {
          this.loadData.stopLoading();
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateBack('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
    })
  //  }else{
  //    let toast = await this.toastCtrl.create({
  //      message: "Please check your internet connectivity and try again",
  //      duration: 3000
  //    });
  //    toast.present();
  //  }
 }

  getInitLevel(){
    this.MesoData = this.PeriodData[0].MesocycleDetails;
    this.MicroData = this.MesoData[0].MicrocycleDetails;
    this.SessionData = this.MicroData[0].SessionDetails;
    this.ExerciseData = this.SessionData[0].exerciseDetails;
    this.SetData= this.ExerciseData[0].setDetails;
    this.setIntensity = this.ExerciseData[0].ExerciseInfo.intensity;
    this.advExercise = this.ExerciseData[0].ExerciseInfo.advExercise;
    this.activePeriod='0';
    this.activeMeso ='0-0';
    this.activeMicro = '0-0-0';
    this.activeSession ='0-0-0-0';
    this.activeExercise = '0-0-0-0-0';
  };

  public getMesoData(path){
    this.MesoData=[];
    this.MicroData=[];
    this.SessionData=[];
    this.ExerciseData=[];
    this.SetData=[];
    this.MesoData = this.PeriodData[path].MesocycleDetails;
    this.activePeriod = path;
  };

  public getMicroData(path){
    this.Lpath = path.split('-');
    this.SessionData=[];
    this.ExerciseData=[];
    this.SetData=[];
    this.MicroData =this.MesoData[this.Lpath[1]].MicrocycleDetails;
    this.activeMeso = path;
  };

  public getSessData(path){
    this.Lpath = path.split('-');
    this.ExerciseData=[];
    this.SetData=[];
    this.SessionData = this.MicroData[this.Lpath[2]].SessionDetails;
    this.activeMicro = path;
  };

  public getExeData(path){
    this.Lpath = path.split('-');
    this.SetData=[];  
    this.ExerciseData = this.SessionData[this.Lpath[3]].exerciseDetails;
    this.activeSession = path;
  };
  public getSetData(path){
    this.Lpath = path.split('-');   
    this.SetData = this.ExerciseData[this.Lpath[4]].setDetails;
    this.setIntensity = this.ExerciseData[this.Lpath[4]].ExerciseInfo.intensity;
    this.advExercise = this.ExerciseData[this.Lpath[4]].ExerciseInfo.advExercise;
    this.activeExercise = path;
  };

 async aboutplanstr(){
    let glossaryModal = await this.modalCtrl.create({
      component:GlossaryPage
    });
    glossaryModal.present();
  }

  public chngStartDate(){
    this.modalCtrl.create ({ component:StartdatePage,
      componentProps:{'uplandata':this.plandetails,'progress':true}
    });
  }

}
