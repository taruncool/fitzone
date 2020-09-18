import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ProgramdetailsPage } from '../../app/programdetails/programdetails.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { CoachprofilePage } from '../coachprofile/coachprofile.page';
import { GoalPage } from '../goal/goal.page';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  devicetype:any;
  plansdata:any=[];
  purposedata:any=[];
  purposeslist:any=[];
  beginnerdata:any=[];
  intermediatedata:any=[];
  advancedata:any=[];
  recommendedData:any=[];
  filters:any={};
  currencyCode;
  activeplanid;
  futureplanid;
  planSet;
  userCurType;
  uplanstate;
  prompt;
  name;

  programstype:any;
  programLevel:any;
  isGrid = false;
  
  coachlist:any=[];
  activepurposeid = 0;

  isNetAlert = false;


  constructor(public platform: Platform,private apiService:ApiService,public navCtrl: NavController,  private alertCtrl: AlertController, public modalCtrl:ModalController, private http: HttpClient, private loadData: LoadData, public toastCtrl: ToastController,public router: Router) { 
  
  this.programstype = "beginner";

  this.programLevel = localStorage.getItem('traininglevel');
  
   console.log("program level",this.programLevel);
  
  if(this.programLevel==="1" || this.programLevel==="2"){

   this.programstype = "beginner";

  } else if(this.programLevel === "3"){

   this.programstype = "intermediate";

  }else if(this.programLevel==="4" || this.programLevel==="5"){

   this.programstype = "advanced";

  }
}
segmentChanged(ev: any) {
  console.log('Segment changed', ev);
}
 changeGridView(){

   if(this.isGrid){
     
     this.isGrid = false;

   }
   else{

     this.isGrid = true;

   }
  }

  ngOnInit() {
    if(this.platform.is('ios')){
      this.devicetype = "ios";
    }else if(this.platform.is('android')){
      this.devicetype = "android";
    }
    this.isNetAlert = false;
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
    
    this.activeplanid = localStorage.getItem('subplanid');
    this.futureplanid = localStorage.getItem('futureplanid');
    this.name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    //this.planStatusCheck();
   
      this.loadPrograms();
    
    
    setTimeout(() => {
      this.recommendedData=[];
    if(this.programLevel==="1" || this.programLevel==="2"){
         
      this.recommendedData =  this.beginnerdata;
 
    } else if(this.programLevel === "3"){
 
      this.recommendedData =  this.intermediatedata;
 
    }else if(this.programLevel==="4" || this.programLevel==="5"){
 
      this.recommendedData = this.advancedata;
 
    }

    
  if(localStorage.getItem('internet')==='online'){
    this.getCoachelists();
  }else{

    if(this.isNetAlert){

      this.activationalert();
    }
   
  }
  },1000);
}
goalclick(){
  this.navCtrl.navigateForward('/goal');
}

// newgoalclick(){
//   this.navCtrl.navigateForward('goal');
// }

  //coach lists
  public getCoachelists(){
    // this.loadData.startLoading();
    var usertoken = localStorage.getItem('usertoken');
    var data = {deviceType:this.devicetype};
    this.apiService.getcoachs(data,usertoken).subscribe((response)=>{
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      this.loadData.stopLoading();
      if(res.success){
        this.coachlist = res.coachesList;
      }else{
        this.errorMsg();
      }
    
    },(err) => {
      this.loadData.stopLoading();
      if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
      }
    });
  }

//redirecting to coachprofile page
async viewCoachPrf(coachdata){
// this.ga.trackEvent('CoachProfileView',coachdata.coachName,localStorage.getItem('email'));
let modal = await this.modalCtrl.create({component:CoachprofilePage,
  componentProps:{coachInfo:coachdata}
});
modal.present();

//this.navCtrl.push(CoachprofilePage,{coachInfo:coachdata});
}

public loadPrograms(){
  if(localStorage.getItem('internet')==='online'){
    this.plansdata=[];
    this.purposeslist=[]
    this.purposedata=[]
    this.beginnerdata=[];
    this.intermediatedata=[];
    this.advancedata =[];
    this.loadData.startLoading();
    this.filters.deviceType = this.devicetype;
    var usertoken =  localStorage.getItem('usertoken');
    this.apiService.filtersql(usertoken,this.filters).subscribe((response)=>{
      // console.log(response);
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      // this.loadData.stopLoading();
        if(res.success){
          this.plansdata = res.filterValues;
          this.userCurType = res.luctype;
          this.purposeslist=res.parentGoals;
          if(this.userCurType==="INR"){
            this.currencyCode = '&#x20B9;'
          }else{
            this.currencyCode = '$';
          }

          for(var p=0; p<this.plansdata.length; p++){

            if(this.plansdata[p].id === parseInt(this.activeplanid,10)){
              this.plansdata[p].activestatus = true;
            }else{
              this.plansdata[p].activestatus = false;
            }
            if(this.plansdata[p].id === parseInt(this.futureplanid,10)){
              this.plansdata[p].fucturestatus = true;
            }else{
              this.plansdata[p].fucturestatus = false;
            }

            if(this.plansdata[p].price !== 'Free'){
              var tempP = (this.plansdata[p].price.toFixed(2)).split(".")[1];
              if(tempP==='00'){
                this.plansdata[p].price = parseInt(this.plansdata[p].price.toFixed(2),10);
              }else{
                this.plansdata[p].price = parseFloat(this.plansdata[p].price.toFixed(2));
              }
              this.plansdata[p].price1 = this.plansdata[p].price;
            }
            
            if(this.plansdata[p].price == 'Free'){
              this.plansdata[p].price = this.plansdata[p].price;
            }else{
              this.plansdata[p].price = this.currencyCode+this.plansdata[p].price;
              if(!this.planSet){
                this.plansdata[p].price = '<strike>'+this.plansdata[p].price+'</strike>';
              }
            }

            if(this.plansdata[p].planType ==="Beginner"){
              this.beginnerdata.push(this.plansdata[p]);
            }else if(this.plansdata[p].planType ==="Intermediate"){
              this.intermediatedata.push(this.plansdata[p]);
            }else if(this.plansdata[p].planType ==="Advanced"){
              this.advancedata.push(this.plansdata[p]);
            }
          }

          this.purposedata = this.plansdata;
          
         
       
        }else{
          this.errorMsg();
        }
        this.loadData.stopLoading();
    },(err) => {
      this.loadData.stopLoading();
      if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
      }
    });
}else{
  // this.loadData.stopLoading();
  this.activationalert();
}
}
onImageError(plan){

  plan.programPhoto = "assets/images/pcview.jpg";

}
async activationalert() {
  this.prompt = await this.alertCtrl.create({
    message: 'You do not have an active internet connection. Please try again..',
    buttons: [
      {
        text: 'Refresh',
        handler:workout =>{

          setTimeout(() => {

            this.ngOnInit();
         
            
          },80);
        }
      }
    ]
  });
  await this.prompt.present();
}
async errorMsg(){
  let toast = await this.toastCtrl.create({
    message: "Unable to process your request. Please try after some time",
    duration: 3000
  });
  toast.present();
  this.isNetAlert = true;
}

async planDetails(plan){
 // this.navCtrl.push(ProgramdetailsPage,{"plandetails":plan});
 let navigationExtras: NavigationExtras = {
  state: {
    "plandetails":plan,"frompage":3,
  }
};
this.router.navigate(['programdetails'], navigationExtras);

}
public filterPurposePrograms(purposeid){
  this.activepurposeid = purposeid;
  this.purposedata=[];
  if(purposeid == 0){

    this.purposedata = this.plansdata;

  }else{
   
  var plangoals:any=[];
  for(var p=0; p<this.plansdata.length; p++){
   
    plangoals =this.plansdata[p].parentGoal;
    for(var q=0; q<plangoals.length; q++){

      if(plangoals[q] == purposeid){

        this.purposedata.push(this.plansdata[p]);
      }

    }
  }
}


}
async noProgramsAlert(){
  this.prompt = await this.alertCtrl.create({
    // title: 'No Subscription yet!',
    message:'Subscribe to Stratfit program from the store to start workout.',
    buttons: [
      //  {
      //   text: 'Create your Workout',
      //   handler: workout => {
      //     this.navCtrl.push(UserActivityPage);
      //   }
      // },
      {
        text: 'Choose Program',
        handler: workout => {
          this.navCtrl.navigateForward('/store');
        }
      }
      
    ]
  });
  await this.prompt.present();
}
}
