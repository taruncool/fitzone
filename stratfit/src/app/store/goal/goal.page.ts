import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ProgramdetailsPage } from '../../../app/programdetails/programdetails.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadData } from '../../../providers/loaddata';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { global } from "../../../app/global";
import { ApiService } from '../../../app/api.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.page.html',
  styleUrls: ['./goal.page.scss'],
})
export class GoalPage implements OnInit {
  devicetype:any;
  currencyCode;
  activeplanid;
  futureplanid;
  planSet;
  userCurType;
  prompt;
  isGrid = false;
  purposedata = [];
  plansdata:any=[];
purposeslist:any=[];
beginnerdata:any=[];
intermediatedata:any=[];
advancedata:any=[];
recommendedData:any=[];
filters:any={};
isNetAlert = false;
isGoalsExist = true;
activepurposeid = 0;

  constructor(public platform: Platform,public modalCtrl:ModalController,public router: Router,private apiService:ApiService, public navCtrl: NavController, private alertCtrl: AlertController,public toastCtrl: ToastController,private loadData: LoadData,private http: HttpClient){}

  ngOnInit(){
      console.log("ion view did enter");
      if(this.platform.is('ios')){
        this.devicetype = "ios";
      }else if(this.platform.is('android')){
        this.devicetype = "android";
      }
      this.isNetAlert = false;
      this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
      
      this.activeplanid = localStorage.getItem('subplanid');
      this.futureplanid = localStorage.getItem('futureplanid');
      // this.planStatusCheck();
     
      this.loadPrograms();
  }
  
  onImageError(plan){
    plan.programPhoto = "assets/images/pcview.jpg";
  }
  
  public loadPrograms(){
      console.log("load program");
      if(localStorage.getItem('internet')==='online'){
        this.plansdata=[];
        this.purposeslist=[]
        this.purposedata=[]
        this.beginnerdata=[];
        this.intermediatedata=[];
        this.advancedata =[];
        this.loadData.startLoading();
        this.filters.deviceType = this.devicetype;
        
        var usertoken = localStorage.getItem('usertoken');
          this.apiService.filtersql(usertoken,this.filters).subscribe((response)=>{
            // console.log(response);
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
              if(res.success){
            //   console.log("json response",response);
            // if(response.json().success){
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
                console.log("plansdata for loop",this.plansdata);
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
              
             if(this.purposedata.length > 0){

              this.isGoalsExist = true;

             }else{

              this.isGoalsExist = false;

             }
              
            }else{
              this.errorMsg();
            }
             this.loadData.stopLoading();
        },(err) => {
          this.loadData.stopLoading();
          if(err.status === 403){
              // this.loadData.forbidden();
              this.navCtrl.navigateForward('/login');
              //this.app.getRootNav().setRoot(LoginPage);
          }
        });
    }else{
      // let toast = this.toastCtrl.create({
      //   message: "Please check your internet connectivity and try again",
      //   duration: 3000
      // });
      // toast.present();
      this.activationalert();
    }
     }
     async activationalert() {
      this.prompt =await  this.alertCtrl.create({
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
      this.prompt.present();
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

        let navigationExtras: NavigationExtras = {
          state: {
            "plandetails":plan,"frompage":2,
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

  var elementId = "goal"+purposeid;
  const el = document.getElementById(elementId);
  
  el.scrollIntoView({behavior: 'smooth',inline: "center"});
  }
  

  changeGridView(){
    setTimeout(() => { 
    if(this.isGrid){
      
      this.isGrid = false;

    }
    else{

      this.isGrid = true;

    }
  },200);
    
  }

  backButtonAction() {
    setTimeout(() => { 
    this.navCtrl.navigateBack('tabs/tabs/store');
    },200);
    //this.navCtrl.setRoot(StorePage);
  }
  
    
  // ngOnInit() {
  // }

}
