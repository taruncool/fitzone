import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController,IonContent, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ImagepreviewPage } from './imagepreview/imagepreview.page';
import { ImageProvider } from '../../providers/image/image';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  prompt;
  token;
  s3Url;
  avatar;
  coverImage;
  firstname;
  lastname;
  currencyType;
  userId;
  weight;
  weightunit;
  preMetric;
  uploadType;
  uploadModal;
  plancheck;
  subscriptionplanid;
  futureplanid;
  email:any;
  planSet;

  isSoundOn;
  isVibrateOn;

  soundText;
  vibrateText;

  dietType;
  weightD;
  bmi;
  heightcm;
  bmiMsg;
  dietMsg;
  genderD;
  gender:any;
  userAge;
  dob:any;
  
  height:any;
  heightunit:any;

  selectOptions;
  selectOptions2;
  selectOptions3;

  noOfWorkDays;

  response;
  responseExercises;
  plan;
  planperiods:any=[];
  plan_messocycle:any=[];
  plan_microcycle:any=[];
  plan_days:any=[];
  plan_sessions:any=[];
  plan_activity:any=[];
  plan_round:any=[];
  plan_actions:any=[];

  plan_exercises:any=[];

  trainingLevelitems;
  trainingLevelcode;
  
  sexCoef;

  bpTmax; 
  bpStressFactor;
  imgPreview;
  imageSet = false;
  
  @ViewChild('Content',{static:false}) content: IonContent;

  constructor(public navCtrl: NavController, public nav: NavController, private googlePlus: GooglePlus, public imageProvider: ImageProvider,public alertCtrl:AlertController, public toastCtrl: ToastController,private apiService:ApiService, private loadData: LoadData, private ga: GoogleAnalytics, public http: HttpClient, public modalCtrl: ModalController, private camera: Camera,public sqlStorageNew : SqlStorageNew,public router: Router) {
  
  }

  ngOnInit() {
    // this.content.resize();
    
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
   
    this.token = localStorage.getItem('usertoken');
    this.s3Url = global.s3URL;
    this.avatar = localStorage.getItem('avatar');
    this.userId = localStorage.getItem('userId');
    this.coverImage = localStorage.getItem('coverImage');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.currencyType = localStorage.getItem('currencyType');
    this.weight = localStorage.getItem('weight');
    this.weightunit = localStorage.getItem('weightunit');
    this.height = localStorage.getItem('height');
    this.heightunit = localStorage.getItem('heightunit');
    this.preMetric = this.weightunit;
    this.subscriptionplanid = localStorage.getItem('subplanid');
    this.futureplanid = localStorage.getItem('futureplanid');
    
    this.genderD = localStorage.getItem('gender');
    this.gender = localStorage.getItem('gender');
    this.dob = localStorage.getItem('dob');

    this.noOfWorkDays = localStorage.getItem("nworkdays");

    console.log(this.noOfWorkDays);

    this.trainingLevelcode = localStorage.getItem('traininglevel');
    if(localStorage.getItem('isSoundOn')==="true"){

      this.isSoundOn = true;

    }else{

      this.isSoundOn = false;

    }
    if(localStorage.getItem('isVibrateOn')==="true"){

      this.isVibrateOn  = true;
   
    }else{

      this.isVibrateOn  = false;

    }
 
    if(this.isSoundOn){

      this.soundText = "Sound Enabled";

    }else{

      this.soundText = "Sound Disabled";

    }

    if(this.isVibrateOn){

      this.vibrateText = "Vibration Enabled";

    }else{

      this.vibrateText = "Vibration Disabled";

    }
    
    if(this.subscriptionplanid !='' && this.subscriptionplanid !=null && this.subscriptionplanid !=undefined){
      this.plancheck =true;
    }else if(this.futureplanid !='' && this.futureplanid !=null && this.futureplanid !=undefined){
      this.plancheck =true;
    }else{
      this.plancheck =false;
    }

    if(this.weightunit ==="kgs"){
      this.weight = parseInt(this.weight).toFixed(1);
      this.weightD =  this.weight;
    }else{
      this.weight = parseInt(this.weight).toFixed(0);
      this.weightD =  Math.round(( this.weight) / 2.2046)
    }

    this.dietType="DtMc";
    if(localStorage.getItem('dietType') === "" || localStorage.getItem('dietType') === null){

      this.dietType="DtMc";
     
     // localStorage.setItem('dietType',this.dietType);

    }else{

      this.dietType=localStorage.getItem('dietType');

    }
   
    this.userAge = this.getAge(this.dob);
    console.log("age",this.userAge);
    console.log("height: "+this.height);
    console.log("weight: "+this.weight);
    console.log("weight: "+this.weightD);
    this.bmi = (this.weightD/(this.height * this.height))*10000;
    if(this.bmi<18.5){
      this.dietMsg="WtG"
      this.bmiMsg = "You are underweight. We suggest you to choose Weight Gain diet goal";

    }else if(this.bmi>18.5 && this.bmi < 25){
      this.dietMsg="WtM" 
      this.bmiMsg = "You have normal BMI. We suggest you to choose Weight Maintenance diet goal";

    }else if(this.bmi>=25 && this.bmi < 30){
      this.dietMsg="WtL" 
      this.bmiMsg = "You are overweight. We suggest you to choose Weight Loss diet goal";

    }else if(this.bmi>=30){
      this.dietMsg="WtL"
      this.bmiMsg = "You are obese according to your BMI. We suggest you to choose Weight Loss diet goal";

    }
    
    
    if(localStorage.getItem('dietGoal') === "" || localStorage.getItem('dietGoal') === null){

      this.dietMsg="WtM";
      //localStorage.setItem('dietGoal',this.dietMsg);

    }else{

      this.dietMsg=localStorage.getItem('dietGoal');

    }

    this.bmi = this.bmi.toFixed(2);
    //converting (height)cm to feet,ins
    this.selectOptions = {
      title: 'Dietary Goal',
      backdropDismiss: false,
      subTitle: 'Help StratFit regulate your daily calorie intake as per your dietary goals, set your dietary goals to get daily calorie recommendations.'
      
    };

    this.selectOptions2 = {
      title: 'Diet Type',
      backdropDismiss: false,
      subTitle: 'Add your meals and we will help you track your daily macronutrient intake accordingly.'
      
    };

    this.selectOptions3 = {
      title: 'Do you have active physical job?',
      backdropDismiss: false,
      subTitle: 'How many days per week do you do physical activities (Atheletic practice, Recreational sports, Physical work, etc)'
      
    };

    this.trainingLevelitems = [
      {title:"Untrained",desc:"I haven't done any resistance training in over 6 months and have a non-physical job.",expanded: false,value:1},
      {title:"Beginner",desc:"I have been consistently doing resistance training for less than 6 months, or I don't train but have a physical job.",expanded: false,value:2},
      {title:"Intermediate",desc:"I have consistently doing resistance training for between 6 and 12 months.",expanded: false,value:3},
      {title:"Advanced",desc:"I have been consistently on a organised barbell lifting program for over 12 months.",expanded: false,value:4},
      {title:"Elite",desc:"I have been consistently on an organised barbell lifting program for multiple years and/or am a competitive Strength athlete.",expanded: false,value:5}
    ];
   
  }

  getAge(dateString) {
    
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  public profileinfo(){
    this.navCtrl.navigateForward('/userprofile');
  }

  public fatlevel(){
    this.nav.navigateForward('/dietprofile/fatlevel');
  }

  public bmicalculator(){
    this.navCtrl.navigateForward('/bmicalculator');
  }

  public dietInfo(){

    if(this.planSet){

      // this.navCtrl.navigateForward('/dietprofile');
      let navigationExtras: NavigationExtras = {
        state: {
          "page":"settings"
        }
      };
      this.router.navigate(['dietprofile'], navigationExtras);
    }else{

      this.noProgramsAlert();

    }
    

  }

  
  public chngepassword(){
    this.navCtrl.navigateForward('/password');
  }

  public openAbout() {
    this.navCtrl.navigateForward('/about');
  }
  public traininglevel(){
    this.navCtrl.navigateForward('/tlevel');
  }
  public openPlateWts(){
    this.navCtrl.navigateForward('/plateweights');
  }
  public openInviteFriend(){
    this.navCtrl.navigateForward('/invite');
  }
  public mysubscription(){

    if(this.planSet){

      this.navCtrl.navigateForward('/mysubscription');

    }else{

      this.noProgramsAlert();
    }
    
  }
  public openTmax(){
    this.navCtrl.navigateForward('/tmaxsummary');
  }
  public openfeedback(){
    this.navCtrl.navigateForward('/feedback');
  }
  public openfaqs(){
    this.navCtrl.navigateForward('/faqs');
  }
  public dietKiran(){
    //this.navCtrl.push(DietPage);
  }
  
  public onChangeDtGoal(dtGoal){

    console.log("Diet goal",dtGoal);
    localStorage.setItem('dietGoal',dtGoal);

  }

  public onChangeDtType(dtType){

    console.log("Diet Type",dtType);
    localStorage.setItem('dietType',dtType);

  }

  public onChangeWorkDays(workDays){

    console.log("No of work days",workDays);
    localStorage.setItem('nworkdays',workDays);
    
  }

  //onchange weightunits
  public onChangeWtUnits(wtUnits){
    if(this.weight !='' && this.weight !=null && this.weight !=undefined){
      if(this.preMetric!==wtUnits){
       if(wtUnits==='kgs'){
         this.weight = (this.weight)/2.2046
         this.updateMetrics();
       }else{
         this.weight = (this.weight)*2.2046
         this.updateMetrics();
       }
      }
      this.preMetric=wtUnits;
    }
  }

  public analytics(){
    this.navCtrl.navigateForward('/analytics');
  }

  //update weight && wtunits
  async updateMetrics(){
    if(localStorage.getItem('internet')==='online'){
      var userInfo = {"id":parseInt(this.userId),"userInf":{"weightM":this.weightunit,"weight":this.weight}}
      this.apiService.fitnessprofile(userInfo,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        if(res.success){  
        localStorage.setItem('weightunit',this.weightunit);
        localStorage.setItem('weight',this.weight);
        }
      },(err) =>{
        if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
        }
      })
    }else{

      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  //onchange currencyType
  public onChngCtype(ctype){
    if(this.currencyType !='' && this.currencyType !=null && this.currencyType !=undefined){
      if(ctype==='INR'){
        this.currencyType="INR";
        this.updateCurrencyType();
      }else{
        this.currencyType="USD";
        this.updateCurrencyType();
      }
    }
  }

  //update currencyType
  async updateCurrencyType(){
    if(localStorage.getItem('internet')==='online'){
      var userInfo = {"id":parseInt(this.userId),"userInf":{"currencytype":this.currencyType}}
      this.apiService.fitnessprofile(userInfo,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        localStorage.setItem('currencyType',this.currencyType);
      },(err) =>{
        if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
        }
      })
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  public async loadModal(base64Image){
    if(this.uploadType =='cover'){
      var uploadCover =true;
    }else{
      var uploadCover =false;
    }
    // this.loadData.stopLoading();
    this.uploadModal = await this.modalCtrl.create({
      component:ImagepreviewPage,
      componentProps:{'base64img':base64Image,'uploadtype':uploadCover}
    }).then(a => {

      a.present();

        a.onDidDismiss().then((dis) => {
          console.log('modal dismissed!');
          this.ngOnInit();
        });
      
    });
   
  }

   /*--- user logout ---*/
   async logout(){
     if(localStorage.getItem('internet')==='online'){
      //navigator.vibrate(0);
      //this.timer.pauseTimer();
      this.prompt = await this.alertCtrl.create({
        message: 'Are you sure you want to logout?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
                localStorage.setItem('logout','true');
                this.loadData.userlogout();
                this.googlePlus.logout()
                .then(res => {
                  //user logged out so we will remove him from the NativeStorage
                  console.log(res);
                }, err => {
                  console.log(err);
                });
                this.navCtrl.navigateRoot('/login');
                //this.app.getRootNavs()[0].setRoot(LoginPage);
              }
            },
            {
              text: 'No',
              handler: () => {
              }
            }
        ]
    });
    await this.prompt.present();
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  openWhatsApp(){

    var url = "https://wa.me/0918801462421";
    
    window.open(url, "_blank");
    
  }

  changeSoundSettings(){
    
    
    if(this.isSoundOn){
     
      this.isSoundOn = false;
      this.soundText = "Sound Disabled";
      localStorage.setItem('isSoundOn', "false");

    }else{
      
      this.isSoundOn = true;
      this.soundText = "Sound Enabled";
      localStorage.setItem('isSoundOn', "true");

    }

  }

  changeVibrateSettings(){
    
    
    if(this.isVibrateOn){

      this.isVibrateOn = false;
      this.vibrateText = "Vibration Disabled";
      localStorage.setItem('isVibrateOn', "false");

    }else{

      this.isVibrateOn = true;
      this.vibrateText = "Vibration Enabled";
      localStorage.setItem('isVibrateOn', "true");

    }
  
  }
  changeSound($event) {
    console.log($event);
    
   this.changeSoundSettings();

  }
  changeVibrate($event) {
    console.log($event);
    
    this.changeVibrateSettings();
  
  }
  async getPhoto() {
    let prompt = await this.alertCtrl.create({
      // message: 'Upload Picture',
      message: 'Upload Your Profile Image',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Camera ',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto('', this.camera.PictureSourceType.CAMERA).then(data => {
              this.imgPreview = data;
             
              this.loadModal(data);
              this.imageSet = true;
            });
          }
        },
        {
          text: 'Upload',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.imageProvider.setProfilePhoto('', this.camera.PictureSourceType.PHOTOLIBRARY).then(data => {
              this.imgPreview = data;
              
              this.loadModal(data);
              this.imageSet = true;
            });
          }
        }
        
      ]
    });
    prompt.present();
  }
  

  onAvatarError(){
    this.avatar = "assets/images/icon.png";
  }


 async noProgramsAlert(){
    this.prompt = await this.alertCtrl.create({
      // title: 'No Subscription yet!',
      message:'Subscribe to Stratfit program from the store to start workout.',
      backdropDismiss: false,
      buttons: [
        // {
        //   text: 'Create your Workout',
        //   handler: workout => {
            
        //     this.navCtrl.push(UserActivityPage);
        //   }
        // },
        {
          text: 'Store',
          handler: workout => {
            
            this.navCtrl.navigateRoot('tabs/tabs/store');
          }
        }
      ]
    });
    this.prompt.present();
  }


}
