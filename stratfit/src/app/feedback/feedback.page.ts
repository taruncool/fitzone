import { Component, OnInit } from '@angular/core';
import { ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  email;
  firstname;
  feedback=[];

  constructor(public navCtrl: NavController,private apiService: ApiService, public navParams: NavParams, public modalCtrl: ModalController, public http:HttpClient, public toastCtrl: ToastController, private loadData: LoadData) {
    this.email = localStorage.getItem('email');
    this.firstname = localStorage.getItem('firstname');
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
  }
  async submitFb(feedback) {
    if(localStorage.getItem('internet')==='online'){
      var headers = new Headers();
      var creds = {"name":this.firstname,"email":this.email,"feedback":feedback};
      // headers.append('Content-Type', 'application/json');
      return new Promise((resolve) => {
        // this.http.post(global.baseURL + 'campaign/feedback/', creds, { headers: headers })
        // .subscribe(response => {
        //   if(response.json().success){
        this.apiService.feedback(creds).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            var priceMap = res.details;
              if(res.success){
              this.feedback =[];
              this.toastmsg(res.message);
              // let toast = await this.toastCtrl.create({
              //   message: res.message,
              //   duration: 3000
              // });
              // toast.present();
              this.navCtrl.pop();
          }else{
            this.toastmsg("Unable to process your request. Please try after some time");
            // let toast = await this.toastCtrl.create({
            //   message: "Unable to process your request. Please try after some time",
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

  ngOnInit() {
  }

}
