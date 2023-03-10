import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController,ModalController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadData } from '../../../providers/loaddata';
import { global } from "../../../app/global";
import { ApiService } from '../../../app/api.service';

@Component({
  selector: 'app-forgotpswd',
  templateUrl: './forgotpswd.page.html',
  styleUrls: ['./forgotpswd.page.scss'],
})
export class ForgotpswdPage implements OnInit {
  email:any;
  password:any;
  confirmpassword:any;
  otpresp:any;
  pswdchng:any;
  prompt;
  logoutCall = false;
  public type = 'password';
  public type1 = 'password';
  public showPass = false;
  otp = '';
  public showConfirmPass = false;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private apiService:ApiService, public toastCtrl: ToastController, private http:HttpClient, private loadData: LoadData, private alertCtrl: AlertController){
      this.email = '';
      this.otpresp = false;
      this.pswdchng = false;
  }

  ngOnInit() {
  }

  async forgot(){
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      var creds = {email:this.email};
       this.apiService.forgotpswd(creds).subscribe((response)=>{
         console.log("response",response);
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          this.loadData.stopLoading();
          if(res.success){
            this.otpresp =true;
          }else{
            this.toastmsg(res.message);
          }
        },(err) => {
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try after some time");
          });
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
showPassword() {
  this.showPass = !this.showPass;
  if (this.showPass) {
    this.type = 'text';
  } else {
    this.type = 'password';
  }
}
showConfirmPassword(){
  this.showConfirmPass = !this.showConfirmPass;
  if (this.showConfirmPass) {
    this.type1 = 'text';
  } else {
    this.type1 = 'password';
  }
}
//Validate otp
async otpvalidate(otp){
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      var data = {"email":this.email,"code":otp};
      return new Promise((resolve) => {
        this.apiService.otpvalidate(data).subscribe((response)=>{
          const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          this.loadData.stopLoading();
          if(res.success){
              this.otpresp = false;
              this.pswdchng = true;
          }else{
            this.toastmsg(res.message);
          }
        },(err) => {
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

//Change password
async changepswd(){
    if(localStorage.getItem('internet')==='online'){
      if(this.password === this.confirmpassword){
          var creds = {"password":this.password,"email":this.email};
            this.apiService.resetpswd(creds).subscribe((response)=>{
              const userStr = JSON.stringify(response);
              let res = JSON.parse(userStr);
              if(res.success){
                this.toastmsg("Password changed successfully. Log in with your credentials.");
                this.navCtrl.navigateBack('/login');
                // this.prompt = this.alertCtrl.create({
                //   message : "Password changed successfully. Log in with your credentials." ,
                  // buttons: [
                  //     {
                  //       text: 'Ok',
                  //       handler: data => {
                  //           this.password = '';
                  //           this.confirmpassword = '';
                  //             this.navCtrl.navigateBack('/login');
                  //       }
                  //     }
                  //   ]
                    // enableBackdropDismiss: false
                  //   });
                  // this.prompt.present();
              }else{
                this.toastmsg(res.message);
                buttons: ['OK']
              }
            },(err) => {
              this.toastmsg("Unable to process your request. Please try after some time");
              buttons: ['OK']
              });

          // })
      }else{
        this.prompt = await this.alertCtrl.create({
          message: "Passwords did not match",
          buttons: ['OK']
        });
        this.prompt.present();
      }
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
}

public backButtonAction(){
    // this.modalCtrl.dismiss(); 
    this.navCtrl.navigateForward('/login');
}

}
