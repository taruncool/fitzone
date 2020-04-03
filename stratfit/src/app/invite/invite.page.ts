import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {
  tokken;
  referralCode;
  refEmail;
  clicked;
  validemail;

  constructor(public navCtrl: NavController,private apiService: ApiService, public navParams: NavParams,public http: HttpClient, public toastCtrl: ToastController,private loadData: LoadData,private ga: GoogleAnalytics, public modalCtrl: ModalController ) {}


 async ngOnInit() {
    this.clicked = false;
   
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      this.tokken = localStorage.getItem('usertoken');
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.tokken);
      // this.http.get(global.baseURL + 'campaign/getreferralcode/', { headers: headers })
      //   .subscribe(response => {
      this.apiService.getreferralcode(this.tokken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          var priceMap = res.details;
          if(res.success){
            this.referralCode = res.referralinfo;
          }else{
            console.log(res);
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
      this.loadData.stopLoading();
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }
  async validateEmail(email){
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      let toast = await this.toastCtrl.create({
        message: "Email Format Invalid",
        duration: 3000
      });
      toast.present();
      this.validemail = false;
      this.clicked = false;
    }else{
      this.clicked = true;
      this.validemail = true;
    }
  }

 async sendInvite(){
    this.clicked = true;
    if(localStorage.getItem('internet')==='online'){
      this.validateEmail(this.refEmail);
      if(this.validemail === true){
        this.loadData.startLoading();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.tokken);
        var data = { refemail: this.refEmail};
        headers.append('Content-Type', 'application/json');
        return new Promise((resolve) => {
          // this.http.post(global.baseURL + 'campaign/userReferral/', data, { headers: headers })
          //   .subscribe(res => {
          this.apiService.userReferral(data,this.tokken).subscribe((response)=>{
            const userStr = JSON.stringify(response);
              let res = JSON.parse(userStr);
              var priceMap = res.details;
              this.refEmail = '';
              this.clicked = false;
              this.loadData.stopLoading();
              if(res.success){
                this.modalCtrl.dismiss();
                this.toastmsg(res.message);
                // let toast = await this.toastCtrl.create({
                //   message: res.message,
                //   duration: 3000
                // });
                // toast.present();
              }else{
                console.log(res);
              }
            },(err) => {
              this.clicked = false;
              this.loadData.stopLoading();
              if(err.status === 403){
                  this.loadData.forbidden();
                  this.navCtrl.navigateForward('/login');
                  //this.app.getRootNav().setRoot(LoginPage);
              }
            });
          });
      }
    }else{
      this.clicked = false;
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
  
  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }

}
