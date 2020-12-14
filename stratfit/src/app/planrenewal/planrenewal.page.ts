import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { GlossaryPage } from '../mysubscription/glossary/glossary.page';
import { ProgressbarPage } from '../todayworkout/progressbar/progressbar.page';
import { StartdatePage } from '../startdate/startdate.page';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';

declare var RazorpayCheckout: any;

@Component({
  selector: 'app-planrenewal',
  templateUrl: './planrenewal.page.html',
  styleUrls: ['./planrenewal.page.scss'],
})
export class PlanrenewalPage implements OnInit {
  token:any;
  loginuseremail:any;
  loginuserfirstname:any;
  phone:any;
  planData:any=[];
  currencyCode:any;
  currencyType:any;
  displayCurr:any;
  displayAmnt:any;
  pay_id;
  todayDate:any;
  zeroplan;
  planComplete;
  buttonclick;
  devicetype;
  userCountry;
  transactionid;
  payment:any;
  currencies = ['INR', 'USD'];
  cplan_id;
  cplan_name;
  cplan_photo;
  cplan_startdate;
  planDescription:any;
  razorpayprice = 2;

  mysubtabs;
  plandetails:any=[];
  //token;
  //currencyType;
  //currencyCode;
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
  //planDescription:any=[];
  rate;
  futureplanid;
  planState;


  constructor(public navCtrl: NavController, private streamingMedia: StreamingMedia, public navParams: NavParams ,private apiService: ApiService, private platform: Platform, private http: HttpClient, private loadData: LoadData, public toastCtrl: ToastController, private ga: GoogleAnalytics, public modalCtrl: ModalController,public sqlStorageNew: SqlStorageNew, public iap:InAppPurchase) {
    this.userCountry = 190;
  }
 async ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.ga.trackView('planrenewal');
    this.ga.setAllowIDFACollection(true);
    if (this.platform.is('ios')) {
      this.devicetype = "ios";
    }else if(this.platform.is('android')){
      this.devicetype = "android";
    }
    this.currencyCode = '$';
    this.planComplete = this.navParams.get('planComplete');
    this.currencyType = localStorage.getItem('currencyType');
    this.displayCurr = localStorage.getItem('currencyType');
    this.loginuseremail = localStorage.getItem('email');
    this.loginuserfirstname = localStorage.getItem('firstname');
    this.phone = localStorage.getItem('phone');
    
    this.zeroplan = false;

    this.sqlStorageNew.query("select p.* from userplan u left join plan p on u.plan_id = p.id where u.status = 1").then(data=>{
      this.planData = (data.res.rows.item(0));
      this.displayAmnt = this.planData.price;
      this.programdetails(this.planData);
    });

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

    this.sqlStorageNew.query("select p.id, p.planName, p.createdBy,p.createdByImg, p.price, p.planPhoto, p.planDescription, p.ability, p.goals, p.duration_weeks, p.totalsubscribers ,u.startdate, u.nextrenewaldate, u.plan_id, u.dayOff, u.seasonDate from userplan u left join plan p on u.plan_id = p.id where u.status = "+this.planState)
    .then(response => {
      console.log(response);
      if(response.res.rows.length > 0) {
          if(response.res.rows.item(0)){
            this.plandetails = response.res.rows.item(0);
            console.log(this.plandetails);
            this.activeplanid = this.plandetails.id;
            this.viwPlanStructure(this.activeplanid);
            this.existingUserRating(this.activeplanid);
            if(localStorage.getItem('internet')==='online'){
            if (this.platform.is('ios') && this.plandetails.price !="Free") {
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
                // this.loadData.stopLoading();
                if(err.status === 403){
                    this.loadData.forbidden();
                    // this.app.getRootNav().navigateForward('/login');
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
               }
            }
         
          } else{
            this.toastmsg("Please check your internet connectivity and try again");
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
          }
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
    if(localStorage.getItem('internet')==='online'){
      var creds =  {"user_id":this.loginuserid, "plan_id":activePlanId,"get_rating":1};
      return new Promise((resolve) => {
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
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  playVideo(idplan){
    
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      //shouldAutoClose: true,
      //controls: false
    };
    
    this.streamingMedia.playVideo('http://stratfit.net/ProgramVideos/'+this.plandetails.id+'-preview.mp4', options);    

  }

  async viwPlanStructure(cplan_id){
    if(localStorage.getItem('internet')==='online'){
      // this.loadData.startLoading();
      var creds = {"plan_id":cplan_id};
      return new Promise((resolve) => {
        this.apiService.viewplan(creds,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
              let res = JSON.parse(userStr);
              if(res.success){
              this.PeriodData = res.plan.PeriodDetails;
              //this.PeriodData = JSON.parse(response.json().plan.PlanJson).PeriodDetails;
              this.getInitLevel();
            }else{
              this.toastmsg("Please check your internet connectivity and try again");
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
     let toast = await this.toastCtrl.create({
       message: "Please check your internet connectivity and try again",
       duration: 3000
     });
     toast.present();
   }
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
    this.modalCtrl.create({
      component: StartdatePage,
      componentProps:{'uplandata':this.plandetails,'progress':true}
    });
  }


 async programdetails(planData){
   var self = this;
    if(planData.price !=='' && planData.price !==null){
      planData.planprice = planData.price;
      if(planData.planprice ==0 || planData.planprice == "Free"){
        self.zeroplan = true;
      }else{
        self.zeroplan = false;
      }
    }
    
    if(self.currencyType==="INR"){
      self.currencyCode = '&#x20B9;'
    }
    if(localStorage.getItem('internet')==='online'){
      if (this.platform.is('ios') && planData.price !="Free") {
        this.apiService.getpriceMap(this.token).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            var priceMap = res.details;
            var planPrice = planData.price;
            planData.planvalue = self.loadData.currencyConversionUSD(planData.price,'view',priceMap[planData.price]);
            var roundPrice = planData.planvalue.toFixed(2);
            if(planData.planvalue === 0){
                planData.price = "Free";
                planData.convertingprice = 0;
            }else{
                planData.convertingprice = planData.planvalue.toFixed(2);
                planData.price = self.currencyCode+roundPrice;
            }
            //convert rupees to paisa
            if(self.currencyType === 'USD') {
              self.displayAmnt = planData.planvalue;
            } else {
              self.displayAmnt = planData.convertingprice;
            }
        },(err) => {
          // this.loadData.stopLoading();
          if(err.status === 403){
              this.loadData.forbidden();
              this.navCtrl.navigateForward('/login');
          }
        });
      }
   }else{
      let toast = await self.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
   }
  }

 async sessionCheck(type){
    if(localStorage.getItem('internet')==='online'){
      this.buttonclick = true;
      if(this.platform.is('ios')) {
        // this.loadData.startLoading();
      }
			return new Promise((resolve) => {
        this.apiService.sessionCheck(this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
            this.userCountry = res.userCountry;
            }else{
              this.loadData.forbidden();
              this.navCtrl.navigateForward('/login');
            }
          },(err) => {
            if(err.status === 403){
              // this.loadData.stopLoading();
              this.loadData.forbidden();
              this.navCtrl.navigateForward('/login');
              //this.app.getRootNav().setRoot(LoginPage);
            }
          });
      });
    }else{
      this.buttonclick = false;
      let toast = await this.toastCtrl.create({
				message: "Please check your internet connectivity and try again",
				duration: 3000
			});
			toast.present();
    }
  }

  appPayment() {
    var iosPlanID = 'net.stratfit.user.'+this.planData.id+'planid';
    if(this.userCountry === 88) {
      iosPlanID = 'net.stratfit.user.'+this.planData.id+'planid.planind';
    }
    this.iap
     .getProducts([iosPlanID]) //just ask for this one element
     .then((productData) => {
       console.log("product ID");
       console.log(productData);
       if(productData.length > 0) {
        this.iap
          .subscribe(productData[0].productId)
          .then((data) => {
            //alert('Payment success');
            this.loadData.stopLoading();
            this.createTransaction(data.transactionId); //transactionId
            this.buttonclick = true;
          })
          .catch((err) => {
            console.log(err);
            this.buttonclick = false;
            this.loadData.stopLoading();
          })
        } else {
          this.buttonclick = false;
          this.loadData.stopLoading();
          alert("This plan is still under process. You can select another plan.");
        }
      })
     .catch((err) => {
       console.log(err);
       this.buttonclick = false;
       this.loadData.stopLoading();
     });
  }



  //razorpay payment
  pay() {
    var self = this;
    this.phone = (this.phone===null || this.phone==="null" || this.phone===undefined)?'':this.phone;
    var options = {};
    if(this.displayCurr === "INR") {
      options = {
        //description: 'Credits towards consultation',
        image: this.planData.planPhoto,
        currency: 'INR',
        key: 'rzp_test_dntc87UjZscRtT',
        amount: this.razorpayprice.toString(),
        name: this.planData.planName,
        prefill: {
          email: this.loginuseremail,
          contact: this.phone,
          name: this.loginuserfirstname
        },
        theme: {
          color: '#000'
        },
        handler: function (response) {
          self.pay_id = response.razorpay_payment_id;
          self.createTransaction(self.pay_id);
        },
        modal: {
          ondismiss: function() {
            alert('dismissed')
          }
        }
      };
    } else {
      options = {
        //description: 'Credits towards consultation',
        image: this.planData.planPhoto,
        currency: 'INR',
        key: 'rzp_live_r63eAWJJlnQ2kk',
        amount: this.razorpayprice.toString(),
        display_currency:this.displayCurr,
        display_amount:this.displayAmnt,
        name: this.planData.planName,
        prefill: {
          email: this.loginuseremail,
          contact: this.phone,
          name: this.loginuserfirstname
        },
        theme: {
          color: '#000'
        },
        handler: function (response) {
          self.pay_id = response.razorpay_payment_id;
          self.createTransaction(self.pay_id);
        },
        modal: {
          ondismiss: function() {
            alert('dismissed')
          }
        }
      };
    }

    var successCallback = function(payment_id) {
      self.createTransaction(payment_id.razorpay_payment_id);
      self.buttonclick = true;
    };

    var cancelCallback = function(error) {
      self.buttonclick = false;
      alert(error.description);
    };

    this.platform.ready().then(() => {
      RazorpayCheckout.on('payment.success', successCallback);
      RazorpayCheckout.on('payment.cancel', cancelCallback);
      RazorpayCheckout.open(options);
    })
  }

  public createTransaction(transactionid){
    this.buttonclick = true;
    // this.loadData.startLoading();
    this.transactionid = transactionid;
    var creds = {transactionId:transactionid, plan_id:this.planData.id, amount:this.planData.planprice,deviceType:this.devicetype};
    return new Promise((resolve) => {
      this.apiService.ionicSaveTransactions(creds,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        this.planrenewal();
      },(err) => {
        if(err.status === 403){
          // this.loadData.stopLoading();
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
        }
      });
    })
  }

  public zeroPlanSubscription(){
    // this.loadData.startLoading();
    this.planrenewal();
  }

  async planrenewal(){
    if(localStorage.getItem('internet')==='online'){
      var date = new Date();
      this.todayDate = date.getFullYear() + '-' + ('0' +((date.getMonth() + 1))).slice(-2) + '-' +  ('0' +(date.getDate())).slice(-2);
      var data = {"planid":this.planData.id,"startdate":this.todayDate+' 00:00:00','plancomplete':this.planComplete,"deviceDate":this.todayDate+' 00:00:00','transactionId':this.transactionid};
      return new Promise((resolve) =>{
        this.apiService.updaterenewaldate(data,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            let planresponse = res;
            if(this.planComplete){
              this.sqlStorageNew.query("DELETE FROM planmesocycle");
              this.sqlStorageNew.query("DELETE FROM userplan");
              this.sqlStorageNew.query("DELETE FROM exercises where accessLevel=2");
              this.sqlStorageNew.query("DELETE FROM planmicrocycles");
              this.sqlStorageNew.query("DELETE FROM plansessions");
              this.sqlStorageNew.query("DELETE FROM exwarmup");
          		this.sqlStorageNew.query("DELETE FROM plandays");
          		this.sqlStorageNew.query("DELETE FROM planactivity");
          		this.sqlStorageNew.query("DELETE FROM planround");
          		this.sqlStorageNew.query("DELETE FROM planactions");
              this.sqlStorageNew.query("DELETE FROM planperiod").then(data=>{
                  this.checkQueryHit(planresponse);
                }               
              );
            }else{
              planresponse.data.nextRenewalDate = this.loadData.changeDateFormat(planresponse.data.nextRenewalDate,'db');
              this.sqlStorageNew.query("UPDATE userplan SET nextrenewaldate ='" + planresponse.data.nextRenewalDate + "'  WHERE plan_id = " + this.planData.id).then(data=>{
                // this.loadData.stopLoading();
                //this.navCtrl.push(TodayworkoutPage);
                this.modalCtrl.dismiss();
                this.navCtrl.navigateForward('/todayworkout');
              });
            }
          }, (err) => {
            this.loadData.stopLoading();
            if(err.status === 403){
                this.loadData.forbidden();
                this.navCtrl.navigateForward('/login');
                //this.app.getRootNav().setRoot(LoginPage);
            }
        });
      })
    }else{
      let toast = await this.toastCtrl.create({
				message: "Please check your internet connectivity and try again",
				duration: 3000
			});
			toast.present();
    }
  }
  
  async checkQueryHit(resvalue){
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

      if(resvalue.data.plans[j].status==1){
        this.cplan_id = resvalue.data.plans[j].info.id;
        this.cplan_name = resvalue.data.plans[j].info.planName;
        this.cplan_photo =resvalue.data.plans[j].info.planPhoto;
        let stDate = new Date(resvalue.data.startDate);
        let exercisesList = resvalue.data.plans[j].exercises;
        this.cplan_startdate = this.loadData.dateFormat(stDate);

        resvalue.data.startDate = this.loadData.changeDateFormat(resvalue.data.startDate,'db');
        resvalue.data.nextRenewalDate= this.loadData.changeDateFormat(resvalue.data.nextRenewalDate,'db');
        this.planDescription = resvalue.data.plans[j].info.planDescription.replace(/'/g,"''");
        resvalue.data.plans[j].info.planName = resvalue.data.plans[j].info.planName.replace(/'/g,"''");
        this.sqlStorageNew.query("INSERT INTO `userplan` (`startdate`, `nextrenewaldate`, `plan_id`, `user_id`, `status`) VALUES ('"+resvalue.data.startDate+"', '"+resvalue.data.nextRenewalDate+"', '"+resvalue.data.plans[j].plan_id+"', '"+resvalue.data.plans[j].user_id+"', '"+resvalue.data.plans[j].status+"')")
          .catch(err => {
            console.error('userplan error');
        });

        /*this.sqlStorage.query("INSERT INTO `plan` (`id`, `planName`, `planDescription`, `planStatus`, `price`, `ability`, `num_of_periods`, `num_of_sessions`, `goals`, `duration_weeks`, `planPhoto`, `programType_id`, `genWarmupVideo`, `cooldownVideo`,`createdBy`,`createdByImg`, `totalsubscribers`) VALUES ('"+resvalue.data.plans[j].info.id+"','"+resvalue.data.plans[j].info.planName+"', '"+this.planDescription+"', '"+resvalue.data.plans[j].status+"', '"+planprice+"', '"+resvalue.data.plans[j].info.ability+"', '"+resvalue.data.plans[j].info.num_of_periods+"', '"+resvalue.data.plans[j].info.num_of_sessions+"', '"+resvalue.data.plans[j].info.goals+"', '"+resvalue.data.plans[j].info.duration_weeks+"', '"+resvalue.data.plans[j].info.planPhoto+"', '"+resvalue.data.plans[j].info.programType_id+"', '"+resvalue.data.plans[j].info.genWarmupVideo+"', '"+resvalue.data.plans[j].info.cooldownVideo+"', '"+resvalue.data.plans[j].info.createdBy__first_name+"', '"+resvalue.data.plans[j].info.createdBy__avatar+"', '"+resvalue.data.plans[j].info.planUsers+"')")
        .catch(err => {
          console.error('plan error');
        });*/
        this.loadData.checkjson(resvalue.data.plans[0].plan_id);

        //this.loadData.checkQuery(false,false,false).then(data=>{
          // this.loadData.stopLoading();
          let planprogressModal = await this.modalCtrl.create({
            component: ProgressbarPage,
            componentProps:{'uplandata':{'plan_id':this.cplan_id,'planName':this.cplan_name,'planPhoto':this.cplan_photo,'startdate':this.cplan_startdate,'defaultOffDay':resvalue.data.dayoff,'firstplan':false,'exercises':exercisesList}}
          });
          planprogressModal.present();
        //});
      }
    }
  }

  onPlanImageError(){
    this.plandetails.planPhoto ="assets/images/plan_2.png";
  }

  onAvatarError(){
    this.plandetails.coachPhoto = "assets/images/icon.png";
  }
  
  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }

}
