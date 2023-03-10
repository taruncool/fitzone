import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { ApiService } from '../../app/api.service';
import { LoadData } from '../../providers/loaddata';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CoachprofilePage } from '../coachprofile/coachprofile.page';
import { FeedbackPage } from '../feedback/feedback.page';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  community:any;
  coachlist:any=[];
  gymlists:any=[];
  devicetype;
  currentUserId;
  token;
  prompt;
  planSet;
  hideMe;

  constructor(public navCtrl: NavController,private apiService: ApiService, private http: HttpClient, private loadData: LoadData, public platform: Platform, public toastCtrl: ToastController, public alertCtrl: AlertController, private ga: GoogleAnalytics, public modalCtrl:ModalController,public router: Router) {
    this.community = "coachelists";
  
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
   
    if(this.platform.is('ios')){
      this.devicetype = "ios";
    }else if(this.platform.is('android')){
      this.devicetype = "android";
    }
    this.currentUserId = localStorage.getItem('userId');
    this.token = localStorage.getItem('usertoken');
  }
  ngOnInit() {
    
    if(localStorage.getItem('internet')==='online'){
      this.getCoachelists();
    }else{

      this.activationalert();
    }
  }
  async activationalert() {
    this.prompt = await this.alertCtrl.create({
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
  //coach lists
  public getCoachelists(){
    this.loadData.startLoading();
    var data = {deviceType:this.devicetype};
    this.apiService.getcoachs(data,this.token).subscribe((response)=>{
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      var priceMap = res.details;
      this.loadData.stopLoading();
      if(res.success){
        this.coachlist = res.coachesList;
      }else{
        this.errorMsg();
      }
      // this.getGymlists();
    },(err) => {
      this.loadData.stopLoading();
      if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
      }
    });
  }

  //gym lists
  async getGymlists(){
    this.loadData.startLoading();
    this.apiService.gymLists(this.token).subscribe((response)=>{
      const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        var priceMap = res.details;
        this.loadData.stopLoading();
        if(res.success){
          this.gymlists = res.gymValues;
        }else{
          this.errorMsg();
        }
    },(err) => {
      this.loadData.stopLoading();
      if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
      }
    });
  }

  async errorMsg(){
		let toast = await this.toastCtrl.create({
			message: "Unable to process your request. Please try after some time",
			duration: 3000
		});
		toast.present();
  }
  
  //redirecting to coachprofile page
  async viewCoachPrf(coachdata){
    let navigationExtras: NavigationExtras = {
      state: {
        "coachInfo":coachdata
      }
    };
    this.router.navigate(['coachprofile'], navigationExtras);
  }
   
 async noProgramsAlert(){
    this.prompt = await this.alertCtrl.create({
      // message: 'No Subscription yet!',
      message:'Subscribe to Stratfit program from the store to start workout.',
      buttons: [
        // {
        //   text: 'Create your Workout',
        //   handler: workout => {
        //     this.navCtrl.push(UserActivityPage);
        //   }
        // },
        {
          text: 'Choose Program',
          handler: workout => {
            this.navCtrl.navigateRoot('/tabs/tabs/store');
          }
        }
      ]
    });
    this.prompt.present();
  }

  hide() {
    this.hideMe = true;
  }


  backButtonAction() {
    this.navCtrl.navigateRoot('/tabs/tabs/welcome');
  }

  async openfeedback(){
    //this.navCtrl.navigateForward('/feedback');
    let modal = await this.modalCtrl.create({component:FeedbackPage,
      componentProps: {  }
    });
    modal.present();
  }
}
