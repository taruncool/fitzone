import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, ModalController} from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {global} from "../../../app/global";
import { LoginPage } from '../../login/login.page';
import { LoadData } from '../../../providers/loaddata';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FiltercountryPage } from '../filtercountry/filtercountry.page';
import { ApiService } from '../../../app/api.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {

  email:any;
  firstname:any;
  lastname:any;
  gender:any;
  dob:any;
  weight:any;
  height:any;
  heightunit:any;
  heightunitToggle:boolean;
  weightunit:any;
  tokken:any;
  userId:any;
  phone:any;
  phcode:any;
  tempphcode;
  tempcntrychange;

  htinch;
  htfeet;
  ftinch;
  converthtcms;
  cntrycode:any;
  countrycodes:any[];
  alertmessage:any;
  prompt;
  countryModal;
  DefCountry;
  maxyear;
  todayDate;
  toast;
    constructor(public navCtrl: NavController, public navParams: NavParams,private apiService:ApiService, public http: HttpClient, public toastCtrl: ToastController, private loadData: LoadData, private ga:GoogleAnalytics, public modalCtrl: ModalController) {
    this.email = localStorage.getItem('email');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.gender = localStorage.getItem('gender');
    this.dob = localStorage.getItem('dob');
    this.weight = localStorage.getItem('weight');
    this.height = localStorage.getItem('height');
    this.heightunit = localStorage.getItem('heightunit');
    this.weightunit = localStorage.getItem('weightunit');
    this.tokken = localStorage.getItem('usertoken');
    this.userId = localStorage.getItem('userId');
    this.phone = localStorage.getItem('phone');
    this.phcode = localStorage.getItem('phonecode');
    this.tempphcode = localStorage.getItem('phonecode');
  }
  
  ngOnInit() {

    this.tokken = localStorage.getItem('usertoken');
    this.tempcntrychange =false;
    //this.ga.trackView('editprofile');
   this.todayDate = new Date();
   var year = this.todayDate.getFullYear();
   this.maxyear = (year - 16);
   console.log(this.maxyear);


    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      this.apiService.getcountrydata(this.tokken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          this.loadData.stopLoading();
          console.log("country codes----------",res);

          this.countrycodes = res;
          for(var tc=0;tc<this.countrycodes.length;tc++){
            if(this.phcode===this.countrycodes[tc].dialCode){
              this.DefCountry=this.countrycodes[tc].name+' ('+this.countrycodes[tc].dialCode+')';
            }
          }
        },(err) => {
          this.loadData.stopLoading();
          if(err.status === 403){
              this.loadData.forbidden();
              this.navCtrl.navigateRoot('/login');
          }
      });
    }else{
      this.loadData.stopLoading();
      this.toast = this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      this.toast.present();
    }

     if(this.phone ==='null' || this.phone ==='' || this.phone ==='undefined'){
      this.phone='';
    }
    
    if(this.dob ==='null' || this.dob ==='' || this.dob ==='undefined'){
      this.dob='';
    }
    if(this.height ==='null' || this.height ==='' || this.height ==='undefined'){
      this.height='';
    }
    if(this.heightunit ==='null' || this.heightunit ==='' || this.heightunit ==='undefined'){
      this.heightunit='';
    }
    if(this.weight ==='null' || this.weight ==='' || this.weight ==='undefined'){
      this.weight='';
    }
    if(this.weightunit ==='null' || this.weightunit ==='' || this.weightunit ==='undefined'){
      this.weightunit='';
    }

    if(this.weightunit ==="kgs"){
      this.weight = parseInt(this.weight).toFixed(0)
    }else{
      this.weight = parseInt(this.weight).toFixed(0)
    }

    //height unit conversion
    this.htinch = (parseFloat(this.height))/2.54;
    this.htfeet  = (this.htinch/12);
    this.htfeet = parseInt(this.htfeet,10);
    var cinc = (this.htinch%12).toFixed(0);
    this.ftinch = parseFloat(cinc);

    if(this.phcode ==='null' || this.phcode ==='' || this.phcode ==='undefined'){
      this.phcode= '';
    }else{
      this.phcode= "+"+this.phcode;
    }
  }

  public onChngGender(utype){
    if(this.gender !='' && this.gender !=null && this.gender !=undefined){
        if(utype === '1'){
          this.gender = '1';
        }
        else{
          this.gender = '2';
        }
    }
  }

  public updateProfile(){
    if(this.phcode.indexOf("+") === 0){
      this.phcode = this.phcode.replace("+","");
    }
    // if(this.tempphcode !=this.phcode){
    //     this.prompt = this.alertCtrl.create({
    //       message: "Logging Out...<br>You are required to login again",
    //       buttons: [
    //         {
    //           text: 'Cancel',
    //           handler: data => {
    //             this.phcode = this.tempphcode;
    //             this.tempupdateProfile();
    //           }
    //         },
    //         {
    //           text: 'Ok',
    //           handler: data => {
    //             this.tempcntrychange =true;
    //             this.tempupdateProfile();
    //           }
    //         }
    //       ]
    //     });
    //     this.prompt.present();
    // }else if(this.tempphcode == this.phcode){
      if( this.phcode == null){

        this.phcode = this.tempphcode;

      }
      this.tempupdateProfile();
   // }
  }

  async tempupdateProfile(){ 
   if(parseInt(this.weight,10) < 20){
     this.alertmessage = "Weight must be greater than or equal to 20.";
     this.validationAlerts(this.alertmessage);
   }else if(parseInt(this.weight,10) > 1000){
     this.alertmessage = "Weight must be less than or equal to 1000.";
     this.validationAlerts(this.alertmessage);
   }else if(parseInt(this.htfeet,10) < 4){
     this.alertmessage = "ft must be greater than or equal to 4.";
     this.validationAlerts(this.alertmessage);
   }else if(parseInt(this.htfeet,10) > 9){
     this.alertmessage = "ft must be less than or equal to 9.";
     this.validationAlerts(this.alertmessage);
   }else if(parseInt(this.ftinch,10) < -1 ){
     this.alertmessage = "inc must be greater than or equal to 0.";
     this.validationAlerts(this.alertmessage);
   }else if(parseInt(this.ftinch,10) > 11){
     this.alertmessage = "inc must be less than or equal to 11.";
     this.validationAlerts(this.alertmessage);
   }else{
     
    this.converthtcms = ((parseInt(this.htfeet,10)*12)+parseInt(this.ftinch,10))*2.54;
    if(localStorage.getItem('internet')==='online'){
    this.loadData.startLoading();
   
    var userInfo = {"id":parseInt(this.userId),"userInf":{"first_name":this.firstname,"last_name":this.lastname,"weight":this.weight,"height":this.converthtcms,"heightM":"cms","weightM":this.weightunit,"gender":this.gender,"phone":this.phone,"dob":this.dob, "countrycode":this.phcode}}
   this.apiService.fitnessprofile(userInfo,this.tokken).subscribe((response)=>{ 
    const userStr = JSON.stringify(response);
    let res = JSON.parse(userStr);
        if(res.success){
            if(this.tempcntrychange ==true){
              this.loadData.stopLoading();
              localStorage.setItem('logout','true');
              this.loadData.forbidden();
              this.navCtrl.navigateRoot('/login');
              //this.app.getRootNav().setRoot(LoginPage);
            }else{
              localStorage.setItem('firstname',this.firstname);
              localStorage.setItem('lastname',this.lastname);
              localStorage.setItem('gender',this.gender);
              localStorage.setItem('dob',this.dob);
              localStorage.setItem('weight',this.weight);
              localStorage.setItem('height',this.converthtcms);
              localStorage.setItem('heightunit','cms');
              localStorage.setItem('weightunit',this.weightunit);
              localStorage.setItem('phone',this.phone);
              localStorage.setItem('phonecode',this.phcode);
              this.loadData.stopLoading();
              this.modalCtrl.dismiss();
              // this.toast = await this.toastCtrl.create({
              //   message: res.message,
              //   duration: 3000
              // });
              // this.toast.present();
              this.toastmsg(res.message); 
            }
        }else{
          this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try after some time"); 
        }
      },(err) =>{
        this.loadData.stopLoading();
        if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateRoot('/login');
            //this.app.getRootNav().setRoot(LoginPage);
        }
      })
    }else{
      this.loadData.stopLoading();
      this.toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      this.toast.present();
    }
   }
  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async validationAlerts(alertMsg){
  
    this.toast = await this.toastCtrl.create({
      message: alertMsg,
      duration: 5000
    });
    this.toast.present();
  }

  async openContry(){
    this.countryModal = await this.modalCtrl.create({
      component:FiltercountryPage,
      componentProps: {
        'countrydata':this.countrycodes,
        'phcode':this.phcode
      }  
    });
   await this.countryModal.present();
    await this.countryModal.onDidDismiss().then((data)=>{
      if(data !==undefined){
        this.phcode = data;
        for(var tc=0;tc<this.countrycodes.length;tc++){
          if(data===this.countrycodes[tc].dialCode){
            this.DefCountry=this.countrycodes[tc].name+' ('+this.countrycodes[tc].dialCode+')';
          }
        }
      }
    });
  }

  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }

}
