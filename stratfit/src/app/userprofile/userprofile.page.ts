import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { global } from "../../app/global";
import { LoadData } from '../../providers/loaddata';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { EditprofilePage } from './editprofile/editprofile.page';
import { ProfilePage } from '../profile/profile.page';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  s3Url:any;
  avatar:any;
  email:any;
  firstname:any;
  lastname:any;
  gender:any;
  dob:any;
  weight:any;
  height:any;
  heightunit:any;
  weightunit:any;
  tokken:any;
  userId:any;
  phone:any;
  covertheight;
  heightfeet;
  heightinc;
  coverImage;
  constructor(public platform: Platform,public nav: NavController, public toastCtrl: ToastController,private loadData: LoadData, public modalCtrl: ModalController) {
    this.s3Url = global.s3URL;
    this.avatar = localStorage.getItem('avatar');
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
    this.coverImage = localStorage.getItem('coverImage');
    
  }

 
  ionViewDidLeave(){

    // this.platform.backButton.unsubscribe();
 
   }
   ngOnInit() {
     //this.ga.trackView('profile');
     //this.ga.setAllowIDFACollection(true);
     
     if(this.gender==='1'){
       this.gender='Male';
     }else if(this.gender==='2'){
       this.gender='Female';
     }else{
       this.gender='N/A';
     }
 
     if(this.firstname ==='null' || this.firstname ==='' || this.firstname ==='undefined'){
       this.firstname='';
     }
     if(this.lastname ==='null' || this.lastname ==='' || this.lastname ==='undefined'){
       this.lastname='';
     }
 
     if(this.dob ==='null' || this.dob ==='' || this.dob ==='undefined'){
       this.dob='N/A';
     }else{
       var todayDate = new Date(this.dob);
       this.dob = this.loadData.dateFormat(todayDate);
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
 
     if(this.phone ==='null' || this.phone ==='' || this.phone ==='undefined'){
       this.phone = 'N/A'
     }
 
     //converting (height)cm to feet,ins
     this.covertheight = (parseFloat(this.height))/2.54;
     this.heightfeet  = (this.covertheight/12);
     this.heightfeet = parseInt(this.heightfeet,10);
     var hinc = (this.covertheight%12).toFixed(0);
     this.heightinc = parseFloat(hinc);
   }
   ionViewWillEnter() {
          
    //  this.platform.registerBackButtonAction(() => {
    //    this.viewCtrl.dismiss();
    //  });
   
   }
   public backButtonAction(){
    this.modalCtrl.dismiss();
    this.nav.navigateBack('tabs/tabs/profile');
   }

   editprofModal;
   async editProfile(){
     this.editprofModal = await this.modalCtrl.create({ component:EditprofilePage});

     await this.editprofModal.present();
     this.editprofModal.onDidDismiss(data => {
      this.ngOnInit();
    });
    
     
   }
}
