import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { Facebook ,FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ProgressloginPage } from '../login/progresslogin/progresslogin.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user:any=[];
  prompt:any;
	validemail;
	validpassword;
  devicetype:any;
	currencytype:any;
	tMaxData;
	internetConn;
	disbaleBackNav=true;
	mainlift;
	tmaxEx:any=[];
	public type = 'password';
  public showPass = false;

	isTermsChecked = false;
	Terms_and_Conditions ="terms";

  constructor(private navCtrl: NavController,private apiService:ApiService, private http: HttpClient,public modalCtrl:ModalController, private alertCtrl: AlertController,private router: Router, public toastCtrl: ToastController, private loadData: LoadData, private platform: Platform, private loadingCtrl: LoadingController, public sqlStorageNew: SqlStorageNew,private googlePlus: GooglePlus, private fb: Facebook) {}

  ngOnInit() {
    if(localStorage.getItem('internet')==='online'){
			this.http.get('http://ip-api.com/json')
			.subscribe(response=>{
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
		if(this.platform.is('ios')){
			this.devicetype = "ios";
		}else if(this.platform.is('android')){
			this.devicetype = "android";
    }
	// 	 this.navBar.backButtonClick = (e:UIEvent) => {   /// add this event
	// 		 this.navCtrl.pop();
  // };
}
  
    async validateEmail(email){
      var x = email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        this.prompt = await this.alertCtrl.create({
          message: 'Invalid Email Format ',
          buttons: ['OK']
        });
        this.prompt.present();
        this.validemail = false;
      }else{
        this.validemail = true; 
      }
    }
    
    async validatePassword(password){
      var x = password;
      
      if (x.length<5 || x.length>15) {
        this.prompt = await this.alertCtrl.create({
          message: 'Password must be more than 5 and less than 15 letters.',
          buttons: ['OK']
        });
        this.prompt.present();
        this.validpassword = false;
      }else{
        this.validpassword = true;
      }
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
    
    selectCheckbox(ev) {
      if(ev.value) {
          
        this.isTermsChecked = false;
        console.log("checked true");
  
      }else{
  
        this.isTermsChecked = true;
        console.log("checked false..");
  
      }
    }
    
  
    async signup(user) {
      if(localStorage.getItem('internet')==='online'){
        this.validateEmail(user.email);
      
        if(this.validemail === true){
          this.validatePassword(user.password);
          if(this.validpassword){
            if(this.isTermsChecked === true){
          this.loadData.startLoading();
          var data = {fname:user.firstname,email:user.email,password:user.password,currencytype:this.currencytype, deviceType:this.devicetype};
          return new Promise((resolve) =>{
            this.apiService.regiser(data).subscribe((response)=>{
                  const userStr = JSON.stringify(response);
                  let res = JSON.parse(userStr);
                  if(res.success){
                  this.loadData.stopLoading();
                  // this.router.navigate(['/signupverify',user]);
                  let navigationExtras: NavigationExtras = { state: { user: user } };
                  this.router.navigate(['/signupverify'], navigationExtras);
                  // this.login(user);
                }else{
                  this.loadData.stopLoading();
                  this.toastmsg(res.message);
                  // this.prompt = await this.alertCtrl.create({
                  //   message:res.message,
                  //   buttons: ['OK']
                  // });
                  // this.prompt.present();
                }
              }, (err) => {
                this.loadData.stopLoading();
                this.errorMsg();
               });
          })
        }else{
  
          this.prompt = await this.alertCtrl.create({
            message: 'Please accept terms & conditions',
            buttons: ['OK']
          });
          this.prompt.present();
  
  
        }
      }/*}else{
          if(user.password != user.comfpswd){
            this.prompt = this.alertCtrl.create({
              subTitle: 'Passwords are not matching, please try again',
              buttons: ['OK']
            });
            this.prompt.present();
          }
        } */
      }
      }else{
        let toast = await this.toastCtrl.create({
          message: "Please check your internet connectivity and try again",
          duration: 3000
        });
        toast.present();
      }
    }
    
    async login(user) {
      this.clearData();
      if(localStorage.getItem('internet') === 'online') {
        this.loadData.startLoading();
        var creds = { email: user.email, password: user.password };
          this.apiService.loginnew(creds).subscribe((response)=>{
                console.log("loginnew response",response);
                const userStr = JSON.stringify(response);
                let res = JSON.parse(userStr);
                if(res.success){
                this.loadData.loginSuccess(res);
                if(res.isProfileSet){
                  if(res.isPlanSet){
                    this.tMaxData = res.tmax;
                    // this.checkQueryHit(res);
                  }else{
                    this.loadData.stopLoading();
                    this.navCtrl.navigateForward('/goal');
                  }
                }else{
                  this.loadData.stopLoading();
                  this.navCtrl.navigateForward('/fitnessinput');
                }
              }else{
                this.loadData.stopLoading();
                this.toastmsg(res.message);
                buttons: ['OK']
              }
            }, (err) => {
              this.loadData.stopLoading();
              this.errorMsg();
            });
        // });
      } else {
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
  
   async doGoogleLogin(){
      var self = this;
      let nav = this.navCtrl;
        let env = this;
      let loading = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      loading.present();
      if(this.devicetype === 'android') {
        this.googlePlus.login({
          'scopes': '',
          'webClientId':'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',
          'offline': false
        })
        .then(function (user) {
          loading.dismiss();
          if(user !=='' && user !==null){
            self.sociallogin('google-oauth2',user.accessToken, '798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
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
            self.sociallogin('google-oauth2',user.accessToken, '798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
          }
          console.log(user,'==google login response==');
        }, function (error) {
          console.log("google login error---4")
          loading.dismiss();
          self.errorMsg();
        });
      }
    }
  
    public nativeFbLogin(){
      this.fb.logout().then(() => { 
        this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => 
          this.sociallogin('facebook', res.authResponse.accessToken, res.authResponse.userID, false)
        )
        .catch(e => {
          this.errorMsg();
        });
      }).catch(() => { });
    }
    //(socialtype, accessToken, clientid, code)
    async sociallogin(socialtype, accessToken, clientid, code) {
      this.clearData();
      if (localStorage.getItem('internet') === 'online') {
        this.loadData.startLoading();
        var fbServerUrl = global.baseURL.replace('/services/services/stratservices/','');
        var creds = { backend: socialtype, clientId: clientid, redirectUri: fbServerUrl, access_token: accessToken, code: code, currencytype:this.currencytype, deviceType:this.devicetype};
        return new Promise((resolve) => {
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
                      this.navCtrl.navigateForward('/goal');
                    }
                  } else {
                    this.loadData.stopLoading();
                    this.navCtrl.navigateForward('/fitnessinput');
                  }
                } else {
                  this.loadData.stopLoading();
                  this.toastmsg(res.message);
                  buttons: ['OK']
                }
            }, (err) => {
              this.loadData.stopLoading();
              this.errorMsg();
             });
        })
      } else {
        let toast = await this.toastCtrl.create({
          message: "Please check your internet connectivity and try again",
          duration: 3000
        });
        toast.present();
      }
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
  
    // async checkQueryHit(res){
  
    //   this.loadData.checkjson(res.plans[0].plan_id);
    //   this.loadData.stopLoading();
    //   let loginProgressModal = await this.modalCtrl.create({component:ProgressloginPage,
    //     componentProps:{"resvalue":res}
    //   });
    
    //   loginProgressModal.present();
      // loginProgressModal.onDidDismiss(data=>{
        
      // });
      //this.loadData.checkQuery(this.tMaxData,false,true).then(data=>{
        
      //});
      
    // }
  
    // public checkQueryHit(res){
    // 	this.loadData.checkjson(res.plans[0].plan_id);
      
    // 	//this.loadData.checkQuery(this.tMaxData,false,true).then(data=>{
    // 		this.sqlStorageNew.query("DELETE FROM userplan;vacuum");
    // 		for (let i=0; i<res.plans.length; i++) {
    // 			var startDateArr = this.loadData.changeDateFormat(res.plans[i].startDate,'db');
    // 			var renewDateArr = this.loadData.changeDateFormat(res.plans[i].nextRenewalDate,'db');
    // 			this.sqlStorageNew.query("INSERT INTO userplan (id,startdate, nextrenewaldate, plan_id, user_id, status,dayOff,seasonDate) VALUES ('"+res.plans[i].id+"','"+startDateArr+"', '"+renewDateArr+"', '"+res.plans[i].plan_id+"', '"+res.plans[i].user_id+"', '"+res.plans[i].status+"', '"+res.plans[i].dayOff+"', '"+res.plans[i].seasonDate+"')");
    // 		}
    // 		this.loadData.insertPlan(res.plans);
    // 		this.loadData.stopLoading();
    // 		this.navCtrl.setRoot(DashboardPage);
    // 	//});
    // }
    // }
    async errorMsg(){
      let toast = await this.toastCtrl.create({
        message: "Unable to process your request. Please try after some time",
        duration: 3000
      });
      toast.present();
    }
  
    public Privacyid(msg){
    //  this.navCtrl.navigateForward('/privacypolicy');
     let navigationExtras: NavigationExtras = {
      state: {
        "heading":msg,"frompage":1,
      }
    };
    this.router.navigate(['privacypolicy'], navigationExtras);
    }
  
    async disclaimerid(){
      this.prompt = await this.alertCtrl.create({
        message: 'StratFit strongly recommends that you consult with your physician before beginning any exercise program.if you engage in these exercise or any exercise program,you agree that you do so at your own risk, are voluntarily participating in these activities, assume all risk of injury to yourself, and agree to release and discharge StratFit from any and all claims or causes of action.',
        buttons: ['OK']
      });
      this.prompt.present();
    }
    
  
    public gotologin(){
      this.navCtrl.navigateForward('/login');
    }
  
    backtowelcome() {
      this.navCtrl.navigateForward('');
    }
  
}
