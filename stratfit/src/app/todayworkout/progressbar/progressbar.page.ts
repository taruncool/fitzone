import { Component, OnInit, ViewChild } from '@angular/core';
import {AlertController,ModalController,ToastController,IonContent,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { global } from "../../../app/global";
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../../providers/sql-storage-new';

// import Moment from 'moment';
import { StartdatePage } from '../../startdate/startdate.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

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
  firstname;

  planprogressModal;
  constructor(public nav:NavController, 
    private route: ActivatedRoute, private router: Router,
    public modalCtrl: ModalController, 
    private loadData: LoadData,private apiService: ApiService,
    public alertCtrl: AlertController, public toastCtrl: ToastController, private http: HttpClient, public sqlStorageNew: SqlStorageNew){
      
    this.disbaleBackNav=true;
    this.percent = 0;
    this.hideloader = false;
   

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.uplandata = this.router.getCurrentNavigation().extras.state.uplandata;
        console.log("---plan data---",this.uplandata);
        console.log("---plan data---",this.uplandata.exercises);
        this.pStartDate = this.uplandata.startdate;
        const dateCon = new Date(this.pStartDate);
        for(let i=0;i<this.uplandata.exercises.length;i++){
  
          this.uplandata.exercises[i].newExImage = this.uplandata.exercises[i].exercise_id__thumb_image;//"http://stratfit.net/newEx/"+this.planinfo.exercises[i].exercise_id+".jpg";
    
        }
        localStorage.setItem('exercise_info_plan',JSON.stringify(this.uplandata.exercises));
        /*const momentDate = Moment(dateCon.toISOString());*/
        
        //var sessDate = Moment(dateCon).format("DD-MM-YYYY");
        var sessDate = this.pStartDate;
        this.pStartDate = sessDate;
      }
    });
  
  }

  onExImageError(newEx){
    newEx.newExImage = "assets/images/icon.png";
  }
  
  ngOnInit() {
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
    setTimeout(()=>{this.content.scrollToBottom();},100);
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
  }

  async activatePlan(){
		if(localStorage.getItem('internet')==='online'){
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
			// this.loadData.startLoading();
			var data = { 'plan_id': this.uplandata.plan_id,'firstPlan':this.uplandata.firstplan ,'deviceDate':deviceDate+' 00:00:00'};
			let usertoken = localStorage.getItem('usertoken');
      this.apiService.activateuserplan(data,usertoken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        // this.loadData.stopLoading();
        if(res.success){
          localStorage.setItem('subplanid',this.uplandata.plan_id);
          localStorage.removeItem('futureplanid');
          var startDate = this.loadData.changeDateFormat(res.startDate,'db');
          var nextrenewDate = this.loadData.changeDateFormat(res.nextRenewalDate,'db');
          var dayOff = res.dayOff;
          this.sqlStorageNew.query("UPDATE userplan SET status=1,startdate = '" + startDate + "',nextrenewaldate = '" + nextrenewDate + "', dayOff = '" + dayOff +"' WHERE status=3").then(data=>{
            // this.loadData.stopLoading();
            localStorage.setItem('generalwarmupcmpl','false');
            localStorage.setItem('totalreps','');
            //localStorage.setItem('tmax','');
            localStorage.setItem('totalweight','');
            localStorage.setItem('tonnage','');
            localStorage.setItem('work','');
            localStorage.setItem('cal','');
            this.nav.navigateRoot('/tabs/tabs/dashboard');
            //this.initLoad();
          }).catch(err => {
            console.error('--12--'+JSON.stringify(err));
          });
				}else{
          // this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try after some time");
        }
        this.toastmsg(res.message);
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
}
