import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ModalController,ToastController, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { Facebook ,FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ProgressloginPage } from './progresslogin/progresslogin.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // @ViewChild (Navbar) navBar : Navbar;
  // @ViewChild('input') myInput ;
  user:any=[];
  prompt;
  internetConn;
  devicetype;
  currencytype;
  tMaxData:any;
  mainlift;

	tmaxEx:any=[];
	disbaleBackNav=true;
	public type = 'password';
	public showPass = false;
	
  constructor(public nav: NavController,private apiService:ApiService,private googlePlus: GooglePlus,public modalCtrl:ModalController, private fb: Facebook,private http: HttpClient, private loadData: LoadData, private platform: Platform, private alertCtrl: AlertController, public toastCtrl: ToastController, private loadingCtrl: LoadingController,public router: Router,public route: ActivatedRoute,public sqlStorageNew:SqlStorageNew) {
  }
  ngOnInit() {
    console.log("welcome to login page");
    // this.user.email = this.route.get('chngpswd');
  if(this.platform.is('ios')){
    this.devicetype = "ios";
  }else if(this.platform.is('android')){
    this.devicetype = "android";
  }

  /*setTimeout(() => {
    this.myInput.setFocus();
  },150);*/
  if(localStorage.getItem('internet')==='online'){
    this.http.get('http://ip-api.com/json')
    .subscribe(response=>{
      console.log("country api response",response);
      const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
        if(res.country ==='India'){
          this.currencytype = 'INR';
        }else{
          this.currencytype = 'USD';
        }
    });
  }else{
    this.currencytype = 'USD';
  }

  this.sqlStorageNew.query("DELETE FROM cooldown");
  this.sqlStorageNew.query("DELETE FROM genwarmup");
  this.sqlStorageNew.query("DELETE FROM planmesocycle");
  this.sqlStorageNew.query("DELETE FROM userplan");
  this.sqlStorageNew.query("DELETE FROM exercises");
  this.sqlStorageNew.query("DELETE FROM plan");
  this.sqlStorageNew.query("DELETE FROM planmicrocycles");
  this.sqlStorageNew.query("DELETE FROM plansessions");
  this.sqlStorageNew.query("DELETE FROM exwarmup");
  this.sqlStorageNew.query("DELETE FROM planperiod");
  this.sqlStorageNew.query("DELETE FROM plandays");
  this.sqlStorageNew.query("DELETE FROM planactivity");
  this.sqlStorageNew.query("DELETE FROM planround");
  this.sqlStorageNew.query("DELETE FROM planactions");
}
  
public gotosignup(){
  this.nav.navigateForward('/signup');
}
backtowelcome() {
  this.nav.navigateForward('/slide');
}
showPassword() {
this.showPass = !this.showPass;
if (this.showPass) {
  this.type = 'text';
} else {
  this.type = 'password';
}
}
clearData(){
  this.internetConn = (localStorage.getItem('internet')==='online')?true:false;
  localStorage.clear();
  if(this.internetConn){
    localStorage.setItem('internet','online');
  }else{
    localStorage.setItem('internet','offline');
  }
}

public nativeFbLogin(){
  this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => 
    this.sociallogin('facebook', res.authResponse.accessToken, res.authResponse.userID, false)
  )
  .catch(e => {
    this.errorMsg();
  });
}

async sociallogin(socialtype, accessToken, clientid, code) {
  this.clearData();
  if (localStorage.getItem('internet') === 'online') {
    this.loadData.startLoading();
    var fbServerUrl = global.baseURL.replace('/services/services/stratservices/','');
    // var headers = new Headers();
     var creds = { backend: socialtype, clientId: clientid, redirectUri: fbServerUrl, access_token: accessToken, code: code, currencytype:this.currencytype, deviceType:this.devicetype };
    // headers.append('Content-Type', 'application/json');
    return new Promise((resolve) => {
      // this.http.post(global.baseURL + 'subscriber/socialloginnew/', creds, { headers: headers })
      //   .subscribe(res => {
      this.apiService.sociallogin(creds).subscribe((response)=>{
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          if (res.success) {
            this.loadData.loginSuccess(res);
            if (res.isProfileSet) {
              // let exerciseList = res.Exercises;
              // this.exerciseInsert(exerciseList);
              
              if (res.isPlanSet) {
                this.loadData.clearDataBaseNew();
                this.tMaxData = res.tmax;
                this.checkQueryHit(res);
              } else {
                this.loadData.getExercisesNew();
                this.loadData.stopLoading();
                this.nav.navigateForward('/store');
              }
            } else {
              this.loadData.stopLoading();
              this.nav.navigateForward('/fitnessinput');
            }
          } else {
            this.loadData.stopLoading();
            this.prompt = this.alertCtrl.create({
              // message: 'Login Failed',
              message: res.message,
              buttons: ['OK']
            });
            this.prompt.present();
          }
        }, (err) => {
          this.loadData.stopLoading();
          this.errorMsg();
         });
      })
  } else {
    let toast =await this.toastCtrl.create({
      message: "Please check your internet connectivity and try again",
      duration: 3000
    });
    toast.present();
  }
}

async doGoogleLogin(){
  var self = this;
  let nav = this.nav;
    let env = this;
  let loading =await this.loadingCtrl.create({
    message: 'Please wait...'
  });
  loading.present();
  if(this.devicetype === 'android') {
    this.googlePlus.login({
      'scopes': '',
      'webClientId':'542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',
      'offline': false
    })
    .then(function (user) {
      loading.dismiss();
      if(user !=='' && user !==null){
        self.sociallogin('google-oauth2',user.accessToken, '542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
      }
      console.log(user,'==google login response==');
    }, function (error) {
      console.log("google login error--3")
      loading.dismiss();
      self.errorMsg();
    });
  } else {
    this.googlePlus.login({
      'offline': false
    })
    .then(function (user) {
      loading.dismiss();
      if(user !=='' && user !==null){
        self.sociallogin('google-oauth2',user.accessToken, '542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
      }
      console.log(user,'==google login response==');
    }, function (error) {
      console.log("google login error---4")
      loading.dismiss();
      self.errorMsg();
    });
  }
}

async login(user) {
  console.log("login page.....");
  this.clearData();
   if (localStorage.getItem('internet') === 'online'){
    this.loadData.startLoading();
    // var headers = new Headers();
     var creds = { email: user.email, password: user.password, deviceType:this.devicetype };
    // var creds = { email: "siriprathapreddy@gmail.com", password: "123456", deviceType:"android" };
    
    // headers.append('Content-Type', 'application/json');
    // return new Promise((resolve) => {
      // this.http.post(global.baseURL + 'subscriber/logInnew/', creds, { headers: headers })
      //   .subscribe(res => {
        console.log("login....",creds);
      this.apiService.loginnew(creds).subscribe((response)=>{
        console.log("loginnew response",response);
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
           if(res.success){
             let loggedUser = res;
        //     this.intercom.reset().then(() =>
        //     {
        //       this.intercom.registerIdentifiedUser({email:user.email, userID: loggedUser.user_id});
        //     });
            this.loadData.loginSuccess(res);
            if(res.isProfileSet){
              if(res.isPlanSet){
                this.loadData.clearDataBaseNew();
                this.tMaxData = res.tmax;
                this.checkQueryHit(res);
              }else{
                this.loadData.getExercisesNew();
                this.loadData.stopLoading();
                this.nav.navigateForward('/store');
              }
            }else{
              this.loadData.stopLoading();
              this.nav.navigateForward('/fitnessinput');
            }
            
          }else if(res.is_active === 0){
            this.loadData.stopLoading();
            this.prompt = this.alertCtrl.create({
              message: 'Email id is not verified for this account. Do you want to verify?',
              buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  //console.log('Cancel clicked');
                }
              },
              {
                text: 'Ok',
                handler: () => {
                   this.nav.navigateForward('/signinverify') 
                }
              }
              ]
            });
            this.prompt.present();
          }else{
            this.loadData.stopLoading();
            this.toastmsg(res.message);
            // this.prompt = await this.alertCtrl.create({
            //   // title: 'Login Failed',
            //   message: res.message,
            //   buttons: ['OK']
            // });
            // this.prompt.present();
          }
        }, (err) => {
          this.loadData.stopLoading();
          this.errorMsg();
         });
      // });
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

  async checkQueryHit(res){

  this.loadData.checkjson(res.plans[0].plan_id);
  this.loadData.stopLoading();
  let loginProgressModal = await this.modalCtrl.create({component:ProgressloginPage,
    componentProps:{"resvalue":res}
  });

  loginProgressModal.present();
  loginProgressModal.onDidDismiss().then(data=>{
    
  });
 
}

  async errorMsg() {
  let toast = await this.toastCtrl.create({
    message: "Unable to process your request. Please try after some time",
    duration: 3000
  });
  toast.present();
}

public forgot_pwd(){
  this.user.email ="";
  this.user.password="";
  this.nav.navigateForward('/forgotpswd');
}
}
