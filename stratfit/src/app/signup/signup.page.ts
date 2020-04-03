import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user =[];
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

  constructor(private navCtrl: NavController,private apiService:ApiService, private http: HttpClient,public modalCtrl:ModalController, private alertCtrl: AlertController, public toastCtrl: ToastController, private loadData: LoadData, private platform: Platform, private loadingCtrl: LoadingController, public sqlStorageNew: SqlStorageNew) {}

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
  
  }
  ionViewDidLoad() {
		console.log('ionViewDidLoad NoticiaCompletaPage');
		// this.navBar.backButtonClick = (e:UIEvent) => {   /// add this event
			 this.navCtrl.pop();
		};
    public validateEmail(email){
      var x = email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        this.prompt = this.alertCtrl.create({
          message: 'Invalid Email Format ',
          buttons: ['OK']
        });
        this.prompt.present();
        this.validemail = false;
      }else{
        this.validemail = true; 
      }
    }
    
    public validatePassword(password){
      var x = password;
      
      if (x.length<5 || x.length>15) {
        this.prompt = this.alertCtrl.create({
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
          
        this.isTermsChecked = true;
  
      }else{
  
        this.isTermsChecked = false;
  
      }
    }
    
  
    async signup(user) {
      // if(localStorage.getItem('internet')==='online'){
        this.validateEmail(user.email);
      
        if(this.validemail === true){
          this.validatePassword(user.password);
          if(this.validpassword){
            if(this.isTermsChecked === true){
          this.loadData.startLoading();
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var data = {fname:user.firstname,email:user.email,password:user.password,currencytype:this.currencytype, deviceType:this.devicetype};
          return new Promise((resolve) =>{
            // this.http.post(global.baseURL + 'subscriber/register/', data, {headers: headers})
            //   .subscribe(response => {
            this.apiService.regiser(data).subscribe((response)=>{
                  const userStr = JSON.stringify(response);
                  let res = JSON.parse(userStr);
                  if(res.success){
                  this.loadData.stopLoading();
                  this.navCtrl.navigateForward('/signupverify');
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
      // }else{
      //   let toast = this.toastCtrl.create({
      //     message: "Please check your internet connectivity and try again",
      //     duration: 3000
      //   });
      //   toast.present();
      // }
    }
    
    async login(user) {
      this.clearData();
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
                    this.navCtrl.navigateForward('/store');
                  }
                }else{
                  this.loadData.stopLoading();
                  this.navCtrl.navigateForward('/fitnessinput');
                }
              }else{
                this.loadData.stopLoading();
                this.prompt = this.alertCtrl.create({
                  // message: 'Login Failed',
                  message: res.json().message,
                  buttons: ['OK']
                });
                this.prompt.present();
              }
            }, (err) => {
              this.loadData.stopLoading();
              this.errorMsg();
            });
        // });
    //   } else {
    //     let toast = await this.toastCtrl.create({
    //       message: "Please check your internet connectivity and try again",
    //       duration: 3000
    //     });
    //     toast.present();
    //   }
     }
     async toastmsg(msg) {
      let toast = await this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present();
    }
  
  //  async doGoogleLogin(){
  //     var self = this;
  //     let nav = this.navCtrl;
  //       let env = this;
  //     let loading = await this.loadingCtrl.create({
  //       message: 'Please wait...'
  //     });
  //     loading.present();
  //     if(this.devicetype === 'android') {
  //       this.googlePlus.login({
  //         'scopes': '',
  //         'webClientId':'542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',
  //         'offline': false
  //       })
  //       .then(function (user) {
  //         loading.dismiss();
  //         if(user !=='' && user !==null){
  //           self.sociallogin('google-oauth2',user.accessToken, '542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
  //         }
  //         console.log(user,'==google login response==');
  //       }, function (error) {
  //         console.log("google login error--3")
  //         loading.dismiss();
  //         self.errorMsg();
  //       });
  //     } else {
  //       this.googlePlus.login({
  //         'offline': false
  //       })
  //       .then(function (user) {
  //         loading.dismiss();
  //         if(user !=='' && user !==null){
  //           self.sociallogin('google-oauth2',user.accessToken, '542443556715-46gfa0kitll0o47ks64g7blaecuiel4e.apps.googleusercontent.com',user.serverAuthCode)//'798608632942-p2un0isrhgcbdaaqtf2pbf68mo4ouk4b.apps.googleusercontent.com',user.serverAuthCode)
  //         }
  //         console.log(user,'==google login response==');
  //       }, function (error) {
  //         console.log("google login error---4")
  //         loading.dismiss();
  //         self.errorMsg();
  //       });
  //     }
  //   }
  
  //   public nativeFbLogin(){
  //     this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then((res: FacebookLoginResponse) => 
  //       this.sociallogin('facebook', res.authResponse.accessToken, res.authResponse.userID, false)
  //     )
  //     .catch(e => {
  //       this.errorMsg();
  //     });
  //   }
    //(socialtype, accessToken, clientid, code)
    async sociallogin(socialtype, accessToken, clientid, code) {
      this.clearData();
      if (localStorage.getItem('internet') === 'online') {
        this.loadData.startLoading();
        var fbServerUrl = global.baseURL.replace('/services/services/stratservices/','');
        var headers = new Headers();
        var creds = { backend: socialtype, clientId: clientid, redirectUri: fbServerUrl, access_token: accessToken, code: code, currencytype:this.currencytype, deviceType:this.devicetype};
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve) => {
          // this.http.post(global.baseURL + 'subscriber/socialloginnew/', creds, { headers: headers })
          //   .subscribe(res => {
          this.apiService.sociallogin(creds).subscribe((response)=>{
                const userStr = JSON.stringify(response);
                let res = JSON.parse(userStr);
              if (res.success) {
                localStorage.setItem('isLogged', 'true');
                localStorage.setItem('usertoken', res.sessiontoken);
                localStorage.setItem('userId', res.user_id);
                localStorage.setItem('loggedAs', res.username);
                localStorage.setItem('email', res.userDetails);
                localStorage.setItem('firstname', res.first_name);
                localStorage.setItem('lastname', res.last_name);
                localStorage.setItem('avatar', res.avatar);
                localStorage.setItem('coverImage', res.coverImage);
                localStorage.setItem('orgId', res.orgId);
                localStorage.setItem('gender', res.profile.gender);
                localStorage.setItem('dob', res.profile.dob1);
                localStorage.setItem('weight', res.profile.weight);
                localStorage.setItem('height', res.profile.height);
                localStorage.setItem('heightunit', res.profile.heightUnit);
                localStorage.setItem('weightunit', res.profile.weightUnit);
                localStorage.setItem('profileSet', res.isProfileSet);
                localStorage.setItem('planSet', res.isPlanSet);
                localStorage.setItem('tmaxSet', res.isTmaxSet);
                localStorage.setItem('phone', res.phone);
                localStorage.setItem('phonecode', res.phonecode);
                localStorage.setItem('currencyType', res.currencyType);
                localStorage.setItem('otp', res.otp);
                localStorage.setItem('userType', res.userType);
                localStorage.setItem('traininglevel', res.profile.trainingLevel);
                localStorage.setItem('categorylevel', 'true');
                localStorage.setItem('isSoundOn', "false");
                localStorage.setItem('isVibrateOn', "false");
                if(res.plans.length !== 0){
                  for(var k=0; k<res.plans.length; k++){
                    if(res.plans[k].status===1){
                      var activePlanId = res.plans[k].plan_id;
                      localStorage.setItem('subplanid',activePlanId);
                    }
                    else if(res.plans[k].status===3){
                      var futureplanId = res.plans[k].plan_id;
                      localStorage.setItem('futureplanid',futureplanId);
                    }
                    else{
                      var previousplanId = res.plans[k].plan_id;
                      localStorage.setItem('previousplanid',previousplanId);
                    }
  
                  }	
                }
                if (res.isProfileSet) {
                
                  if (res.isPlanSet) {
                    localStorage.setItem('planSet','true');
                    this.tMaxData = res.json().tmax;
                    // this.checkQueryHit(res) ;
                  } else {
                    this.loadData.stopLoading();
                    this.navCtrl.navigateForward('/store');
                  }
                } else {
                  this.loadData.stopLoading();
                  this.navCtrl.navigateForward('/fitnessinput');
                }
              } else {
                this.loadData.stopLoading();
                this.toastmsg(res.message);
                // this.prompt = await this.alertCtrl.create({
                //   // message: 'Login Failed',
                //   message: res.message,
                //   buttons: ['OK']
                // });
                // this.prompt.present();
              }
            }, (err) => {
              this.loadData.stopLoading();
              this.errorMsg();
             });
        })
      // } else {
      //   let toast = await this.toastCtrl.create({
      //     message: "Please check your internet connectivity and try again",
      //     duration: 3000
      //   });
      //   toast.present();
      // }
    }
  
    // public checkQueryHit(res){
  
    //   this.loadData.checkjson(res.plans[0].plan_id);
    //   this.loadData.stopLoading();
    //   // let loginProgressModal = this.modalCtrl.create('/progresslogin',{"resvalue":res});
    // //   if(!this.showVideo){
    // //   this.myVideo = <HTMLVideoElement>document.getElementById('exc-video-' +this.activeExerciseId);
    // //   this.myVideo.muted=true;
    // //   this.myVideo.pause();
    // // }
    //   // loginProgressModal.present();
    //   // loginProgressModal.onDidDismiss(data=>{
        
    //   // });
    //   //this.loadData.checkQuery(this.tMaxData,false,true).then(data=>{
        
    //   //});
      
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
    }
    async errorMsg(){
      let toast = await this.toastCtrl.create({
        message: "Unable to process your request. Please try after some time",
        duration: 3000
      });
      toast.present();
    }
  
    public Privacyid(){
     this.navCtrl.navigateForward('/privacypolicy');
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
      this.navCtrl.navigateForward('/slide');
    }
  
}
