import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { global } from "../../../app/global";
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { CalendarModule } from 'ion2-calendar';
// import Moment from 'moment';
import { StartdatePage } from '../../startdate/startdate.page';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.page.html',
  styleUrls: ['./progressbar.page.scss'],
})
export class ProgressbarPage implements OnInit {
  percent=0;
  uplandata:any;
  hideloader;
  prompt;
  disbaleBackNav=true;

  // @ViewChild(Content) content: Content;
  token:any;
  userplandata:any;
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
  firstname;

  planprogressModal;
  constructor(public nav:NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    private loadData: LoadData,private apiService: ApiService,
    public calendarCtrl: CalendarModule, public alertCtrl: AlertController, public toastCtrl: ToastController, private http: HttpClient, public sqlStorageNew: SqlStorageNew){
      
    this.disbaleBackNav=true;
    this.percent = 0;
    this.hideloader = false;
    this.uplandata = this.navParams.get("uplandata");

    this.pStartDate = this.uplandata.startdate;
    const dateCon = new Date(this.pStartDate);
    localStorage.setItem('exercise_info_plan',JSON.stringify(this.uplandata.exercises));
    /*const momentDate = Moment(dateCon.toISOString());*/
    
    //var sessDate = Moment(dateCon).format("DD-MM-YYYY");
    var sessDate = this.pStartDate;
    this.pStartDate = sessDate;
  
  }

  ionViewDidLoad() {
    this.firstname=localStorage.getItem('firstname');
    this.getPercentage();
  }

  getPercentage(){
    let tempPercent = (localStorage.getItem('getpercent')!==undefined && localStorage.getItem('getpercent')!==null)?parseFloat(localStorage.getItem('getpercent')):0;
    this.percent = Math.round(tempPercent);
    let self=this;
    if(this.percent<100){
      setTimeout(function(){
        self.getPercentage();
      },10);
    }else{
      console.log('---Complete---');
      localStorage.setItem('getpercent','0');
      this.hideloader = true;
    }
    //this.percent = 70;
    //localStorage.setItem('getpercent','100');
    //this.hideloader = true;
  }
  callFunction(){
    // setTimeout(()=>{this.content.scrollToBottom();},100);
  }

  // public displayCalendar(){
  //   var fromDate;
  //   fromDate = new Date();
  //   this.calendarCtrl.openCalendar({
  //     from:fromDate,
  //     weekdays:["S","M", "T", "W", "T", "F", "S"]
  //   })
  //   .then( (res:any) => { 
  //     var date = new Date(res.string);
  //     this.pStartDate = this.loadData.changeDateFormat(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDate(),'view');
  //     console.log(this.pStartDate);
  //     const dateCon = new Date(this.pStartDate);
  //     /*const momentDate = Moment(dateCon.toISOString());*/
      
  //     var sessDate = Moment(dateCon).format("DD-MM-YYYY");
  //     var dt =new Date(this.pStartDate);
  //     this.showStartDate = this.loadData.dateFormat(dt);
  //     dt.setDate(dt.getDate() +6);
  //     var dt =new Date(this.pStartDate);
  //     this.showStartDate = this.loadData.dateFormat(dt);
  //     dt.setDate(dt.getDate() +6);
  //     this.getOffDay = dt.getDay();
      
  //     if (this.getOffDay === 0){
  //       this.offday = "Sunday";
  //     }else if(this.getOffDay === 1){
  //       this.offday = "Monday";
  //     }else if(this.getOffDay === 2){
  //       this.offday = "Tuesday";
  //     }else if(this.getOffDay === 3){
  //       this.offday = "Wednesday";
  //     }else if(this.getOffDay === 4){
  //       this.offday = "Thursday";
  //     }else if(this.getOffDay === 5){
  //       this.offday = "Friday";
  //     }else if(this.getOffDay === 6){
  //       this.offday = "Saturday";
  //     }
  //     this.callFunction();
  //     this.pStartDate = sessDate;
  //    })
  // }
  changePSDate(){
    this.modalCtrl.create({
      component:StartdatePage,
      componentProps:{'uplandata':this.uplandata,'progress':true}
    });
  }
  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  public pactivateConfirm(){

    this.activatePlan();
    // if(this.uplandata.exercises==null || this.uplandata.exercises == undefined){

    //   this.activatePlan();

    // }else{


    //   this.planprogressModal = this.modalCtrl.create(TmaxEditPopup,{'exercises':this.uplandata.exercises});
    //   this.planprogressModal.present();
    //   this.planprogressModal.onDidDismiss(data=>{
        
    //     this.activatePlan();
       
    //   });
    
    // }
   
    
  }

  async activatePlan(){
		if(localStorage.getItem('internet')==='online'){
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
			this.loadData.startLoading();
			var headers = new Headers();
			var data = { 'plan_id': this.uplandata.plan_id,'firstPlan':this.uplandata.firstplan ,'deviceDate':deviceDate+' 00:00:00'};
			// headers.append('Content-Type', 'application/json');
			let usertoken = headers.append('Authorization', localStorage.getItem('usertoken'));
			// this.http.post(global.baseURL + 'userprogram/activateuserplan/', data, { headers: headers }).subscribe(response => {
			// 	if(response.json().success){
      this.apiService.activateuserplan(data,usertoken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        this.loadData.stopLoading();
        if(res.success){
          localStorage.setItem('subplanid',this.uplandata.plan_id);
          localStorage.removeItem('futureplanid');
          var startDate = this.loadData.changeDateFormat(res.startDate,'db');
          var nextrenewDate = this.loadData.changeDateFormat(res.nextRenewalDate,'db');
          var dayOff = res.dayOff;
          this.sqlStorageNew.query("UPDATE userplan SET status=1,startdate = '" + startDate + "',nextrenewaldate = '" + nextrenewDate + "', dayOff = '" + dayOff +"' WHERE status=3").then(data=>{
            this.loadData.stopLoading();
            localStorage.setItem('generalwarmupcmpl','false');
            localStorage.setItem('totalreps','');
            //localStorage.setItem('tmax','');
            localStorage.setItem('totalweight','');
            localStorage.setItem('tonnage','');
            localStorage.setItem('work','');
            localStorage.setItem('cal','');
            this.nav.navigateForward('/dashboard');
            //this.initLoad();
          }).catch(err => {
            console.error('--12--'+JSON.stringify(err));
          });
				}else{
          this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try after some time");
          // let toast = await this.toastCtrl.create({
          //   message: "Unable to process your request. Please try after some time",
          //   duration: 3000
          // });
          // toast.present();
        }
        this.toastmsg(res.message);
				// let toast = await this.toastCtrl.create({
				// 	message: response.json().message,
				// 	duration: 3000
				// });
				// toast.present();
			},(err)=>{
        if(err.status === 403){
          this.loadData.forbidden();
          this.nav.navigateForward('/login');
        }
      });
		}else{
			let toast = await  this.toastCtrl.create({
				message: "Please check your internet connectivity and try again",
				duration: 3000
			});
			toast.present();
		}
		
	}

  /*tmaxtest(){
    this.nav.setRoot(TmaxPage);
  }*/
  ngOnInit() {
  }

}
