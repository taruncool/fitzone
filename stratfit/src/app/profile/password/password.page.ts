import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController,ToastController,NavParams, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers } from '@angular/http';
import { LoadData } from '../../../providers/loaddata';
import { global } from "../../../app/global";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  chngpwd=[];
  token;
  userId;
  public type = 'password';
  public type1 = 'password';
  public type2 = 'password';
  public showPass = false;
  public showNewPass = false;
  public showConfirmPass = false;

  constructor(public navCtrl: NavController, public params: NavParams,private apiService:ApiService, public modalCtrl: ModalController, public toastCtrl: ToastController, private http:HttpClient, private loadData: LoadData){
  }

  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.userId = localStorage.getItem('userId');
  }
  async updatePwd(pwddata) {
    // if(localStorage.getItem('internet')==='online'){
      if(pwddata.newpswd === pwddata.confirmpswd){
          console.log('password match');
          var headers = new Headers();
          var creds = {oldPassword:pwddata.oldpswd,newPassword:pwddata.newpswd,userId:this.userId};
          headers.append('Content-Type', 'application/json');
          // headers.append('Authorization', localStorage.getItem('usertoken'));
          return new Promise((resolve) => {
              // this.http.post(global.baseURL + 'subscriber/changePassword/', creds, { headers: headers })
              // .subscribe(response => {
              this.apiService.changePassword(creds,this.token).subscribe((response)=>{
                console.log("response",response);
                const userStr = JSON.stringify(response);
                let res = JSON.parse(userStr);
                if(res.success){
                    pwddata ='';
                    this.toastmsg(res.message);
                    // let toast = await this.toastCtrl.create({
                    //   message: res.message,
                    //   duration: 3000
                    // });
                    // toast.present();
                    this.modalCtrl.dismiss();
                }else{
                  this.toastmsg(res.message);
                    // let toast = await this.toastCtrl.create({
                    //   message: res.message,
                    //   duration: 3000
                    // });
                    // toast.present();
                }
            },(err) => {
                if(err.status === 403){
                  this.loadData.forbidden();
                  this.navCtrl.navigateForward('/login');
                  //this.app.getRootNav().setRoot(LoginPage);
                }
            });
        })
      }else{
        let toast = await this.toastCtrl.create({
          message: "Passwords did not match",
          duration: 3000
        });
        toast.present();
      }
    // }else{
    //   let toast = await this.toastCtrl.create({
		// 		message: "Please check your internet connectivity and try again",
		// 		duration: 3000
		// 	});
		// 	toast.present();
    // }
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
  showNewPassword(){
    this.showNewPass = !this.showNewPass;
    if (this.showNewPass) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }
  showConfirmPassword(){
    this.showConfirmPass = !this.showConfirmPass;
    if (this.showConfirmPass) {
      this.type2 = 'text';
    } else {
      this.type2 = 'password';
    }
  }
  public backButtonAction(){
      this.modalCtrl.dismiss(); 
  }

}
