import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { ApiService } from '../../app/api.service';
import { LoadData } from '../../providers/loaddata';
import { global } from "../../app/global";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
// import { ProgramdetailsPage } from '../programdetails/programdetails.page';

@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.page.html',
  styleUrls: ['./coachprofile.page.scss'],
})
export class CoachprofilePage implements OnInit {
  token:any;
  coachdata:any;
  coachData1:any = [];
  aboutCoach:any;
  s3Url:string;
  plansdata:any = [];
  coachProfile:string;
  currencyCode:any;
  currencyType:any;
  activeplanid:any;
  futureplanid:any;
  creds;
  userCurType;
  devicetype;
  rootUrl;
  prompt;
  planSet;

  constructor(public platform: Platform, public nav: NavController,private apiService: ApiService, private alertCtrl: AlertController, private http:HttpClient, private loadData: LoadData,public toastCtrl: ToastController, public modalCtrl: ModalController, private ga:GoogleAnalytics,public router: Router,private route: ActivatedRoute) {
    // this.coachdata = navParams.get("coachInfo");
    this.s3Url = global.s3URL;
    this.rootUrl = global.rootUrl;
    this.coachProfile = "programs";
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.coachdata = this.router.getCurrentNavigation().extras.state.coachInfo;
      }
      });

  }


async ngOnInit() {
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
      // this.ga.trackView('coachprofile');

      if (this.platform.is('ios')) {
        this.devicetype = "ios";
      }else if(this.platform.is('android')){
        this.devicetype = "android";
      }

      this.currencyCode = '$';
      this.token = localStorage.getItem('usertoken');
      this.currencyType = localStorage.getItem('currencyType');
      this.activeplanid = localStorage.getItem('subplanid');
      this.futureplanid = localStorage.getItem('futureplanid');

      this.loadData.startLoading();
      if(localStorage.getItem('internet')==='online'){
        if(this.coachdata.coachId !==undefined){
          this.creds = {coachid:this.coachdata.coachId,deviceType:this.devicetype};
        }else if(this.coachdata.planId !==undefined){
          this.creds = {planid:this.coachdata.planId,deviceType:this.devicetype};
        }
        return new Promise((resolve) => {
          this.apiService.individualuserplans(this.creds,this.token).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            var priceMap = res.details;
            console.log("individualuser plan",response);
              this.loadData.stopLoading();
              if(res.success){
                this.plansdata = res.details;
                this.aboutCoach = res.details[0].aboutTrainer;
                this.coachData1 = res.allCoaches[0];
                this.coachdata.coachId = this.coachData1.coachId;
                this.userCurType = res.luctype;
                this.programdetails(this.plansdata,this.userCurType);
              }else{
                this.toastmsg("Unable to process your request. Please try after some time");
                buttons: [
                  {
                    text: 'Ok',
                  }]
              }
          },(err) => {
            this.loadData.stopLoading();
            if(err.status === 403){
                this.loadData.forbidden();
                this.nav.navigateForward('/login');
                //this.app.getRootNav().setRoot(LoginPage);
            }
          });

        })
      }else{
        this.loadData.stopLoading();
        this.toastmsg("Please check your internet connectivity and try again");
      }

  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  onImageError(plan){
    plan.programPhoto = "assets/images/pcview.jpg";
  }

  onAvatarError(){
    this.coachData1.avatar = "assets/images/icon.png";
  }
  
  public programdetails(plansdata,userCType){
    if(userCType==="INR"){
      this.currencyCode = '&#x20B9;'
    }
    for(var i=0;i<plansdata.length;i++){

      if(plansdata[i].id === parseInt(this.activeplanid,10)){
        plansdata[i].activestatus = true;
      }else{
        plansdata[i].activestatus = false;
      }
      if(this.plansdata[i].id === parseInt(this.futureplanid,10)){
        this.plansdata[i].fucturestatus = true;
      }else{
        this.plansdata[i].fucturestatus = false;
      }

      if(plansdata[i].price !== 'Free'){
        var tempP = (plansdata[i].price.toFixed(2)).split(".")[1];
        if(tempP==='00'){
          plansdata[i].price = parseInt(plansdata[i].price.toFixed(2),10);
        }else{
          plansdata[i].price = parseFloat(plansdata[i].price.toFixed(2));
        }
        plansdata[i].price1 = plansdata[i].price;
      }

      if(plansdata[i].price === "Free"){
          plansdata[i].price = plansdata[i].price;
      }else{
          plansdata[i].price = this.currencyCode+plansdata[i].price;
          if(!this.planSet){
            plansdata[i].price = '<strike>'+plansdata[i].price+'</strike>';
          }
      }
    }
  }

  public opencoachurl(coachID) {
    let url = this.rootUrl+'/#/trainer/'+coachID+'?ref=app&userid='+this.token;
    window.open(url, '_blank', 'location=yes');
  }

  async viewplaninfo(plan){
    console.log("plan....",plan);
    let navigationExtras: NavigationExtras = {
      state: {
        "plandetails":plan,"frompage":1,
      }
    };
    this.router.navigate(['programdetails'], navigationExtras);
  }

  backButtonAction() {
    this.nav.navigateBack('/community');
  }
}
