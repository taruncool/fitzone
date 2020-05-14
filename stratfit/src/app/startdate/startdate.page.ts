import { Component, OnInit,ViewChild } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,IonContent,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { CalendarModule ,CalendarComponentOptions, DayConfig, CalendarResult} from "ion2-calendar";


@Component({
  selector: 'app-startdate',
  templateUrl: './startdate.page.html',
  styleUrls: ['./startdate.page.scss'],
})
export class StartdatePage implements OnInit {
  @ViewChild('Content',{static:false}) content: IonContent;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService: ApiService, public toastCtrl: ToastController, public http: HttpClient, 
    public sqlStorageNew: SqlStorageNew, private loadData: LoadData , public calendarCtrl: CalendarModule, private ga:GoogleAnalytics) {
    //this.ga.trackView('startdate');
    this.progressPage = navParams.get("progress");
    this.userplandata = navParams.get("uplandata");
    this.token = localStorage.getItem('usertoken');
    this.selectedSeasonDate = null;
  }

  ngOnInit() {
  }
  callFunction(){
     setTimeout(()=>{this.content.scrollToBottom();},100);
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
  //    })
  // }

  async checkSeason(){
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      var creds = {"planid":this.userplandata.plan_id};
      this.apiService.checkinseason(creds,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          this.loadData.stopLoading();
          if(res.success){
            this.enableInseason = true;
            this.microCycleCount = res.mcCount;
          }else{
            this.updateStartDate();
          }
      },(err) =>{
          this.loadData.stopLoading();
          if(err.status === 403){
            this.loadData.forbidden();
            // this.app.getRootNav().navigateForward('/login');
          }
      })
    }else{
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
  public seasonStartDate(){
    var fromDate = new Date(this.pStartDate);
    var toDate = new Date(this.pStartDate);
    var totalDays = this.microCycleCount * 7;
    var disableDates = [0,1,2,3,4,5,6];
    var seasonDate = this.getOffDay+1;
    if(seasonDate>6){
      seasonDate = 0;
    }
    disableDates.splice(seasonDate, 1);
    toDate.setDate(toDate.getDate()+totalDays);
      // this.calendarCtrl.openCalendar({
      //   from:fromDate,
      //   to:toDate,
      //   weekdays:["S","M", "T", "W", "T", "F", "S"],
      //   disableWeeks:disableDates
      // }).then( (res:any) => { 
      //     var sdate = new Date(res.string);
      //     this.selectedSeasonDate = sdate.getFullYear() + '-' + (sdate.getMonth() + 1) + '-' +  sdate.getDate();
      //     this.showseasondate = this.loadData.dateFormat(sdate);
      //     this.callFunction();
      // });
  }

  public nothanks(){
    this.selectedSeasonDate = null;
    this.updateStartDate();
  }

  async updateStartDate(){
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      var self = this;
      this.loadData.stopLoading();
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
      var userInfo = {"startdate":self.loadData.changeDateFormat(self.pStartDate,'db'),"planid":self.userplandata.plan_id,"dayoff":self.getOffDay, "seasonDate":self.selectedSeasonDate,'deviceDate':deviceDate+' 00:00:00'};
      this.apiService.updatestartdate(userInfo,self.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            this.loadData.stopLoading();
            if(res.success){
            let planresponse = res;
            self.pStartDate = self.loadData.changeDateFormat(self.pStartDate,'db');
            planresponse.data.nextRenewalDate = self.loadData.changeDateFormat(planresponse.data.nextRenewalDate,'db');
            self.sqlStorageNew.query("UPDATE userplan SET startdate = '" + self.pStartDate + "',nextrenewaldate = '" + planresponse.data.nextRenewalDate + "', dayOff = '" + self.getOffDay +"', seasonDate = '" + self.selectedSeasonDate + "'  WHERE plan_id = " + planresponse.data.planId);
            this.toastmsg("Startdate updated successfully");
            // let toast = await self.toastCtrl.create({
            //   message: "Startdate updated successfully",
            //   duration: 3000
            // });
            // toast.present();
            if(this.progressPage){
              self.navCtrl.navigateForward('/todayworkout');
            }else{
              self.navCtrl.pop();
            }
        }else{
          this.toastmsg("Please check your internet connectivity and try again");
          // let toast = await self.toastCtrl.create({
          //   message: "Unable to process your request. Please try after some time",
          //   duration: 3000
          // });
          // toast.present();  
        }
      },(err) =>{
        this.loadData.stopLoading();
        if(err.status === 403){
          
            self.loadData.forbidden();
            self.navCtrl.navigateForward('/login');
            //self.app.getRootNav().setRoot(LoginPage);
        }
      })
    }else{
      let toast = await self.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

}
