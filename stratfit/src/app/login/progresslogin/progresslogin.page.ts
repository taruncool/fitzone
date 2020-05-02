import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,NavParams, AlertController,ModalController,IonContent, ToastController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { Headers } from '@angular/http';
import { LoadData } from '../../../providers/loaddata';
import { global } from "../../../app/global";
import { ApiService } from '../../../app/api.service';

@Component({
  selector: 'app-progresslogin',
  templateUrl: './progresslogin.page.html',
  styleUrls: ['./progresslogin.page.scss'],
})
export class ProgressloginPage implements OnInit {
  percent=0;
  uplandata:any;
  hideloader;
  prompt;
  disbaleBackNav=true;

  @ViewChild('Content',{static:false}) content:IonContent;
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
  resValue:any;

  planprogressModal;
  constructor(public nav:NavController,  
    public modalCtrl: ModalController,
    private loadData: LoadData,
    // public calendarCtrl: CalendarController,
     public alertCtrl: AlertController,public params: NavParams, public toastCtrl: ToastController, private http: HttpClient, public sqlStorageNew: SqlStorageNew){
  
    this.disbaleBackNav=true;
    this.percent = 0;
    this.hideloader = false;
    this.resValue = this.params.get('resvalue');

    /*const momentDate = Moment(dateCon.toISOString());*/
    
    //var sessDate = Moment(dateCon).format("DD-MM-YYYY");
    var sessDate = this.pStartDate;
    this.pStartDate = sessDate;
  
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
      },1000);
    }else{
      console.log('---Complete---');
      this.percent = 80;
      localStorage.setItem('getpercent','0');
      //this.hideloader = true;
      //this.loadData.startLoading();
			this.sqlStorageNew.query("DELETE FROM userplan;vacuum");
			for (let i=0; i<this.resValue.plans.length; i++) {
				var startDateArr = this.loadData.changeDateFormat(this.resValue.plans[i].startDate,'db');
				var renewDateArr = this.loadData.changeDateFormat(this.resValue.plans[i].nextRenewalDate,'db');
				this.sqlStorageNew.query("INSERT INTO userplan (id,startdate, nextrenewaldate, plan_id, user_id, status,dayOff,seasonDate) VALUES ('"+this.resValue.plans[i].id+"','"+startDateArr+"', '"+renewDateArr+"', '"+this.resValue.plans[i].plan_id+"', '"+this.resValue.plans[i].user_id+"', '"+this.resValue.plans[i].status+"', '"+this.resValue.plans[i].dayOff+"', '"+this.resValue.plans[i].seasonDate+"')");
			}
			this.loadData.insertPlan(this.resValue.plans);
			this.sqlStorageNew.query("SELECT * FROM exercises where tmax=0 and accessLevel=1").then(
				sdata => {
					//this.loadData.stopLoading();
					if(sdata.res.rows.length>0){
						//this.loadData.stopLoading();
            this.nav.navigateForward('/tmax');
            this.percent = 100;
            //localStorage.setItem('getpercent','0');
            this.hideloader = true;

					}else{
						localStorage.setItem('generalwarmupcmpl','false');
            this.loadData.stopLoading();
            localStorage.setItem('fatGmsIntake','');
            localStorage.setItem('carbsGmsIntake','');
            localStorage.setItem('protienGmsIntake','');
            localStorage.setItem('calIntake','');
            localStorage.setItem('totalreps','');
            localStorage.setItem('tmax','');
            localStorage.setItem('totalweight','');
            localStorage.setItem('tonnage','');
            localStorage.setItem('work','');
            localStorage.setItem('cal','');
            setTimeout(() => {
            this.nav.navigateForward('/dashboard');
            }, 300);
            this.percent = 100;
            localStorage.setItem('getpercent','0');
            this.hideloader = true;
					}
				}
			).catch(err => {
				console.error('--10--'+JSON.stringify(err));
       this.loadData.stopLoading();
        localStorage.setItem('getpercent','0');
        this.hideloader = true;
        this.percent = 100;
      });
      
      this.modalCtrl.dismiss();
    }
    this.percent = 70;
    localStorage.setItem('getpercent','100');
    this.hideloader = true;
  }
  callFunction(){
    setTimeout(()=>{this.content.scrollToBottom();},100);
  }

}
