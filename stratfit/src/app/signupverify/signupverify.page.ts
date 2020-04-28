import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController, Platform,IonInput, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-signupverify',
  templateUrl: './signupverify.page.html',
  styleUrls: ['./signupverify.page.scss'],
})
export class SignupverifyPage implements OnInit {
  @ViewChild('input0',{static:false}) Input0 :IonInput;
  @ViewChild('input1',{static:false}) Input1 :IonInput;
  @ViewChild('input2',{static:false}) Input2 :IonInput;
  @ViewChild('input3',{static:false}) Input3 :IonInput;
  firstN;
  secondN;
  thirdN;
  fourthN;
  finalOTP;
  user:any;
  internetConn;
  tMaxData;
  prompt;
  fatGmsBalancePercent = 0;
  protienGmsBalancePercent = 0;
  carbsGmsBalancePercent = 0;
  totalCalBalancePercent = 0;

  constructor(public navCtrl: NavController,private router: Router,private route:ActivatedRoute,public modalCtrl:ModalController, private apiService:ApiService, private loadData: LoadData, private http:HttpClient, public toastCtrl: ToastController, private alertCtrl: AlertController, public sqlStorageNew: SqlStorageNew) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user= this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  nextInput(ele,inputNumber){
    if(ele===1 && this.secondN === undefined){
      this.Input1.setFocus();
    }else if(ele===2 && this.thirdN === undefined){
      this.Input2.setFocus();
    }else if(ele===3 && this.fourthN === undefined){
      this.Input3.setFocus();
    }else if(ele===4 && this.fourthN === undefined){
      this.Input3.setFocus();
    }
    this.getOTP();
  }

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus();
     
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
      
    }
    else {
     return 0;
    } 
   // if(event.target.value.length>0){
      if(prev==='' && next === this.Input1){
        this.firstN = event.target.value;
        this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
      }else if(next===this.Input2 && prev === this.Input0){
        this.secondN = event.target.value;
        this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
      }else if(prev===this.Input1 && next === this.Input3){
        this.thirdN = event.target.value;
        this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
      }else if(next==='' && prev === this.Input2){
        this.fourthN = event.target.value;
        this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
      }
   // }

   if(event.target==this.Input3){
    this.fourthN = event.target.value;
    this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
  }
  
   this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
    //this.getOTP();
    console.log("otp inputs",this.finalOTP);
 }

  getOTP(){
    this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
    console.log("otp fourthN",this.fourthN);
    console.log("otp firstN",this.firstN);
    console.log("otp inputs",this.finalOTP);
  }
  async suotpvalidate(){
     if(localStorage.getItem('internet')==='online'){
       //this.loadData.startLoading();
      this.finalOTP = this.firstN+this.secondN+this.thirdN+this.fourthN;
      console.log("otp inputs",this.finalOTP);
      var headers = new Headers();
      var data ={otp:this.finalOTP,email:this.user.email};
      headers.append('Content-Type', 'application/json');
      return new Promise((resolve) => {
          this.apiService.validateOTP(data).subscribe((response)=>{
              const userStr = JSON.stringify(response);
              let res = JSON.parse(userStr);
              if(res.success){
                this.login(this.user);
              }else{
                 //this.loadData.stopLoading();
                this.toastmsg(res.message);
              }
        },(err) => {
           //this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try after some time");
         });
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
  
  clearData(){
		this.internetConn = (localStorage.getItem('internet')==='online')?true:false;
		localStorage.clear();
		if(this.internetConn){
			localStorage.setItem('internet','online');
		}else{
			localStorage.setItem('internet','offline');
		}
  }
  
  async login(user) {
		this.clearData();
		// if(localStorage.getItem('internet') === 'online') {
			var headers = new Headers();
			var creds = { email: user.email, password: user.password };
			headers.append('Content-Type', 'application/json');
			return new Promise((resolve) => {
        this.apiService.loginnew(creds).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
						if (res.success) {
							this.loadData.loginSuccess(res);
							if(res.isProfileSet){
								if(res.isPlanSet){
									this.tMaxData = res.tmax;
									this.checkQueryHit(res);
								}else{
									// this.loadData.stopLoading();
									this.navCtrl.navigateForward('/store');
								}
							}else{
                // this.loadData.stopLoading();
               
								this.navCtrl.navigateForward('/fitnessinput');
							}
						}else{
              // this.loadData.stopLoading();
              this.toastmsg(res.message);
							// this.prompt = await this.alertCtrl.create({
							// 	// message: 'Login Failed',
							// 	message: res.message,
							 	buttons: ['OK']
							// });
							// this.prompt.present();
						}
					}, (err) => {
						// this.loadData.stopLoading();
						this.errorMsg();
					 });
			});
		// } else {
		// 	let toast = await this.toastCtrl.create({
		// 		message: "Please check your internet connectivity and try again",
		// 		duration: 3000
		// 	});
		// 	toast.present();
		// }
  }

  public checkQueryHit(res){

    this.loadData.checkjson(res.plans[0].plan_id); 

		//this.loadData.checkQuery(this.tMaxData,false,true).then(data=>{
			this.loadData.stopLoading();
			this.sqlStorageNew.query("DELETE FROM userplan;vacuum");
			for (let i=0; i<res.plans.length; i++) {
				var startDateArr = this.loadData.changeDateFormat(res.plans[i].startDate,'db');
				var renewDateArr = this.loadData.changeDateFormat(res.plans[i].nextRenewalDate,'db');
				this.sqlStorageNew.query("INSERT INTO userplan (id,startdate, nextrenewaldate, plan_id, user_id, status,dayOff,seasonDate) VALUES ('"+res.plans[i].id+"','"+startDateArr+"', '"+renewDateArr+"', '"+res.plans[i].plan_id+"', '"+res.plans[i].user_id+"', '"+res.plans[i].status+"', '"+res.plans[i].dayOff+"', '"+res.plans[i].seasonDate+"')");
			}
			this.loadData.insertPlan(res.plans);
			this.navCtrl.navigateForward('/dashboard');
    //});
   
  }
  
  async reqNewOpt(){
    // if(localStorage.getItem('internet')==='online'){
      // this.loadData.startLoading();
      var headers = new Headers();
      var data = {"email":this.user.email};
      headers.append('Content-Type', 'application/json');
      return new Promise((resolve) => {
          // this.http.post(global.baseURL + 'subscriber/resendotp/', data, { headers: headers })
          // .subscribe(response => {
          this.apiService.resendotp(data).subscribe((response)=>{
                const userStr = JSON.stringify(response);
                let res = JSON.parse(userStr);
              // this.loadData.stopLoading();
              if(res.success){
                this.toastmsg(res.message);
                  // let toast = await this.toastCtrl.create({
                  //   message: res.message,
                  //   duration: 4000
                  // });
                  // toast.present();
              }else{
                this.toastmsg(res.message);
                // let toast = await this.toastCtrl.create({
                //   message: res.message,
                //   duration: 3000
                // });
                // toast.present();
              }
        },(err) => {
          // this.loadData.stopLoading();
          this.errorMsg();
         });
      })
    // }else{
    //   let toast = await this.toastCtrl.create({
    //     message: "Please check your internet connectivity and try again",
    //     duration: 3000
    //   });
    //   toast.present();
    // }
	}

  async errorMsg() {
		let toast = await this.toastCtrl.create({
			message: "Unable to process your request. Please try after some time",
			duration: 3000
		});
		toast.present();
	}

  backButtonAction() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
