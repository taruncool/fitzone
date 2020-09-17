import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { PlanrenewalPage } from '../planrenewal/planrenewal.page';
import { SessionsummaryPage } from '../todayworkout/sessionsummary/sessionsummary.page';
// import { async } from '@angular/core/testing';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(public platform: Platform,public alertCtrl:AlertController,private apiService: ApiService,
    public toastCtrl: ToastController,public modalCtrl:ModalController,private http: HttpClient, public navCtrl: NavController,private loadData: LoadData,public router: Router,public route: ActivatedRoute,public sqlStorageNew:SqlStorageNew) {
    this.planInfo = { "id": 0, "coachName": "", "planName": "" };
    this.tokken = localStorage.getItem('usertoken');
  }
  tokken;
  prompt;
  firstname;
  lastname;
  email;
  planInfo;
  today;
  noplan;
  notActive = true;
  noPlanActive = false;
  weeks;
  totalDays;
  planDays;
  percentageDays;
  planSetStatus;
  alertApp;
  fatCal;
  fatGms;
  protienCal;
  protienGms;
  carbsCal;
  carbsGms;

  fatPercent;
  protienPercent;
  carbsPercent;
  protienCalGm = 4;
  fatCalGm = 9;
  carbCalGm = 4;


  dietType;
  totalCalBalance;
  calPerDay;
  // fatGms;
  nutritionDate;
  fatGmsBalancePercent = 0;
  protienGmsBalancePercent = 0;
  carbsGmsBalancePercent = 0;
  totalCalBalancePercent = 0;

  fatGmsIntake = 0;
  carbsGmsIntake = 0;
  protienGmsIntake = 0;
  calIntake = 0;

  finalFoodData:any=[];
  finalFoodDataByDate:any=[];

  date;

  totalreps;
  // Tmax;
  totalweight;
  Tonnage;
  Work;
  cal;
  showNutrition:boolean = true;
  planComplete:boolean = false;
  todayRestDay:boolean = false;
  todaySessionComplete:boolean = false;
  nextSessioId;
  currentMicroID;
  currentdayID;
  showNextWOBtn:boolean = true;
  barValue = 0;

  sessionData=[];
  planActivity=[];
  planRounds=[];
  actionData=[];
  planexerciseData=[];
  // sesId;
  day_id;
  tempActivity=[];
  tempExeData=[];
  tempAction=[];
  // currentactivity_id;
  currentexercise_id;
  metrics;

  nextWorkoutDateStr;

  fatCalBalance = 0;
  carbsCalBalance = 0
  protienCalBalance = 0;
  // percent;
  // hideloader;
  fatGmsBalance = 0;
  protienGmsBalance = 0;
  carbsGmsBalance = 0;

  rmrD;
  totalLoad;
  activityFactor;
  actualCalExp;

  bmi;
  heightcm;
  bmiMsg;
  dietMsg;
  genderD;
  userAge;
  weightD;

  gender:any;
  dob:any;
  weight:any;
  height:any;
  heightunit:any;
  weightunit:any;
 
  // userId:any;
  // phone:any;
  covertheight;
  heightfeet;
  heightinc;
  upavatar;
  avatar;
  s3Url;
  // coverImage;

  // if(localStorage.getItem('internet')==='online'){
  
  // }
  // backButtonAction() {
  //   this.viewCtrl.dismiss();
  // }
  //public backButtonAction(){
   // this.modalCtrl.dismiss(); 
  //}
  
   backButtonAction() {
    this.navCtrl.navigateBack('/tabs/tabs/welcome');
  }

  startWorkout(){
    this.navCtrl.navigateForward('/todayworkout');
  }

  showMeals(){
    this.navCtrl.navigateForward('/dietprofile');
  }

  gotoStore(){
    this.navCtrl.navigateRoot('tabs/tabs/store');
  }
  onAvatarError(){
    this.upavatar = "assets/images/icon.png";
  }
  // ionViewWillEnter() {
  //   this.platform.registerBackButtonAction(() => {
  //   this.closeAppAction();
  //   });
  // }
  
  public closeAppAction() {
    if (this.alertApp) {
      this.alertApp.dismiss();
      this.alertApp = null;
    } else {

      this.showAppAlert();

    }
  }

  async planRenew() {
    let modal = await this.modalCtrl.create({component:PlanrenewalPage,
      componentProps: { planComplete: this.planComplete }
    });
    modal.present();
  }

  async showAppAlert() {
    this.alertApp = await this.alertCtrl.create({
      // message: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertApp = null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            // this.platform.exitApp();
          }
        }
      ]
    });
    this.alertApp.present();
  }
  async noProgramsAlert(){
    this.prompt = await this.alertCtrl.create({
      message: 'No Subscription yet!',
      // message:'Subscribe to Stratfit program from the store to start workout.',
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
            
            this.navCtrl.navigateForward(this.router.url + '/store/');
          }
        }
      ]
    });
    this.prompt.present();
  }
// ngOnInit(){
//   this.ionViewDidLoad();
// }
ngOnInit(){
    
   
    this.today = Date.now();
    var today = new Date();
    
    this.date = today.getFullYear()+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+('0' +(today.getDate())).slice(-2);
    console.log("date.........",this.date);
    // localStorage.setItem('nutritionDate',this.today);
    this.nutritionDate = localStorage.getItem('nutritionDate');
   
    console.log("nutrition date",this.nutritionDate);
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    
   
    this.totalreps = localStorage.getItem('totalreps');
    // this.Tmax = localStorage.getItem('tmax');
    this.totalweight = localStorage.getItem('totalweight');
    this.Tonnage = localStorage.getItem('tonnage');
    this.Work = localStorage.getItem('work');
    this.cal = localStorage.getItem('cal');

    this.upavatar = localStorage.getItem('avatar');
    this.avatar = localStorage.getItem('avatar');
    this.s3Url = global.s3URL;
   
    console.log("fat name",localStorage.getItem('fatpercent'));
    console.log("protien name",localStorage.getItem('carbspercent'));
    // console.log("Work",this.Work);
    // console.log("tonnage",this.Tonnage);
    console.log("fatpercent percentage",localStorage.getItem('fatDayBalGmsPercent'));

    if(this.fatGmsIntake == 0 || this.carbsGmsIntake == 0 || this.protienGmsIntake == 0 || this.calIntake== 0){
      if(this.nutritionDate ==this.date){

        this.showNutrition = false;
    this.fatGmsIntake = +localStorage.getItem('fatGmsIntake');
    this.carbsGmsIntake = +localStorage.getItem('carbsGmsIntake');
    this.protienGmsIntake = +localStorage.getItem('protienGmsIntake');
    this.calIntake = +localStorage.getItem('calIntake');
    this.fatGmsBalancePercent = +localStorage.getItem('fatpercent');
    this.protienGmsBalancePercent = +localStorage.getItem('protienpercent');
    this.carbsGmsBalancePercent = +localStorage.getItem('carbspercent');
    this.totalCalBalancePercent = +localStorage.getItem('caloriespercent');
    }else{
      this.showNutrition = true;
      this.initializeNutrition();
    }
  }
   
    this.planSetStatus = (localStorage.getItem('planSet')==='true')?true:false;
    this.noplan = false;
    this.platform.ready().then(() => {
      this.getTodayInfo();
      // setTimeout(() => {
      // if(this.totalreps == '' || this.totalweight == '' || this.Tonnage == '' || this.cal== '' || this.Work== ''){
      //   this.getAnalyticsData();
      //   }else{
      //     this.dayChange();
      //   }
      // },1000);
    });
      
    // this.initializeNutrition();
  }

  initializeNutrition(){

    this.genderD = localStorage.getItem('gender');
    this.gender = localStorage.getItem('gender');
    this.dob = localStorage.getItem('dob');
    this.weight = localStorage.getItem('weight');
    this.height = localStorage.getItem('height');
    this.heightunit = localStorage.getItem('heightunit');
    this.weightunit = localStorage.getItem('weightunit');
    // this.tokken = localStorage.getItem('usertoken');
    // this.userId = localStorage.getItem('userId');
    // this.phone = localStorage.getItem('phone');
    // this.coverImage = localStorage.getItem('coverImage');
    this.dietType = localStorage.getItem('dietType');

    if(this.gender==='1'){
      this.gender='Male';
    }else if(this.gender==='2'){
      this.gender='Female';
    }else{
      this.gender='N/A';
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
      this.weight = parseInt(this.weight).toFixed(1);
      this.weightD =  this.weight;
    }else{
      this.weight = parseInt(this.weight).toFixed(0);
      this.weightD =  Math.round(( this.weight) / 2.2046)
    }

    this.userAge = this.getAge(this.dob);
    console.log("age",this.userAge);
    console.log("height: "+this.height);
    console.log("weight: "+this.weight);
    console.log("weight: "+this.weightD);
    console.log ("dietType:"+this.dietType);
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
   
    this.dietMsg="WtM";
    if(localStorage.getItem('dietGoal') === "" || localStorage.getItem('dietGoal') === null){
      
      this.dietMsg="WtM";
     // localStorage.setItem('dietGoal',this.dietMsg);

    }else{
      
      this.dietMsg=localStorage.getItem('dietGoal');

    }
    console.log("diet goal....",this.dietMsg);
    this.bmi = this.bmi.toFixed(2);
    //converting (height)cm to feet,ins
    this.covertheight = (parseFloat(this.height))/2.54;
    this.heightfeet  = (this.covertheight/12);
    this.heightfeet = parseInt(this.heightfeet,10);
    var hinc = (this.covertheight%12).toFixed(2);
    this.heightinc = parseFloat(hinc);

    
    // this.dietType="DtMc";
  
    if(localStorage.getItem('dietType') === "" || localStorage.getItem('dietType') === null){

      this.dietType="DtMc";
     
    }else{

      this.dietType=localStorage.getItem('dietType');

    }
    //this.cent = Math.round(((parseInt(this.feet, 10) * 12) + parseInt(this.inch, 10)) * 2.54);
    console.log("diet typeee",this.dietType);
   
    setTimeout(() => {
      this.getFoodData();
     },2000);
    

  }

  calculateMacroCalGms(dtType){
    console.log("dyte type",this.dietType);

    if(dtType ==="DtKeto"){

      this.fatPercent = 0.75;
      this.protienPercent = 0.20;
      this.carbsPercent = 0.05;

      this.macrosCalGms()
    }

    if(dtType ==="DtLc"){

      this.fatPercent = 0.35;
      this.protienPercent = 0.45;
      this.carbsPercent = 0.20;

      this.macrosCalGms()
    }

    if(dtType ==="DtMlc"){
      this.fatPercent = 0.30;
      this.protienPercent = 0.40;
      this.carbsPercent = 0.30;
      this.macrosCalGms()
    }

    if(dtType ==="DtMc"){

      this.fatPercent = 0.25;
      this.protienPercent = 0.35;
      this.carbsPercent = 0.40;

      this.macrosCalGms()
    }

    if(dtType ==="DtMhc"){
      this.fatPercent = 0.20;
      this.protienPercent = 0.30;
      this.carbsPercent = 0.50;
      this.macrosCalGms()
    }

    
    if(dtType ==="DtHc"){
      this.fatPercent = 0.15;
      this.protienPercent = 0.25;
      this.carbsPercent = 0.60;
      this.macrosCalGms()

    }
  }

  calculateRMR(height, weight, age){
    var rmrs;
  if(this.genderD==='1'){
    
     rmrs = (10*weight) + (6.25*height) - (5*age) + 5;

  }else if(this.genderD==='2'){
    
     rmrs = (10*weight) + (6.25*height) - (5*age) - 161;

  }
  return rmrs;
}
  calculateCalories(wtUnits){
    console.log("dyte type....",this.dietType);


    let rmr = this.calculateRMR(this.height,this.weightD,this.userAge)
    this.rmrD = rmr;
    console.log("RMR", rmr);
    console.log("total load in diet goal change",this.totalLoad)
    if(this.totalLoad < 5 ){

      this.activityFactor = 1.2;

    }else if(this.totalLoad >18){

      this.activityFactor = 1.9;

    }else{


      this.activityFactor = (0.105+(0.3601389*this.totalLoad)) 
                            - (0.02988426 * (this.totalLoad * this.totalLoad)) 
                            + (0.0008564815 *(this.totalLoad * this.totalLoad * this.totalLoad))
    }

    this.activityFactor =  this.activityFactor.toFixed(2);
    this.actualCalExp = Math.round(rmr*this.activityFactor);

    if(wtUnits ==="WtL"){

      this.calPerDay = this.actualCalExp -100;

    }
    
    if(wtUnits ==="WtM"){

      this.calPerDay = this.actualCalExp;
    }
 
    if(wtUnits ==="WtG"){

      this.calPerDay = this.actualCalExp + 100;
    }

    this.calculateMacroCalGms(this.dietType);
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
  roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
  }
  
  getFoodData(){

    this.finalFoodDataByDate = [];

    //var foodjson = localStorage.getItem('nutritionData');
    //console.log("Nutrition data ionview did enter",this.finalFoodData);
    //if(foodjson !== ""){

      //this.finalFoodData = JSON.parse(foodjson);
      var today = new Date();
      var todayMealDate = ('0' +(today.getDate())).slice(-2)+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+today.getFullYear();
      var todayMealDateServer = today.getFullYear()+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+('0' +(today.getDate())).slice(-2);
     
      var mealtime = today.getTime();

      // console.log(todayMealDate);
      // console.log(mealtime);
      // console.log("Nutrition data ionview did enter",this.finalFoodData);

      // for(let k =0;k<this.finalFoodData.length;k++){

      //   if(this.finalFoodData[k].mealDate === todayMealDate){
          
      //     this.finalFoodDataByDate.push(this.finalFoodData[k]);

      //   }
      
      // }

      this.getMealDataServer(todayMealDateServer);
    //}
  }

  getTotalLoad(){

    var noOfSessionsInMC  =  localStorage.getItem('nworkdays');
    var sfLoadiNol = 0;
    //this.TodaySessionID = localStorage.getItem('todaySessionID');
    console.log("in else condition");
    this.totalLoad = 0;
    this.calculateCalories(this.dietMsg);
  }

  async getMealDataServer(date){
    console.log("date of nutrition.........",date);
    if(localStorage.getItem('internet')==='online'){

      var mealDateJson = {mealDate:date};

      console.log(mealDateJson);
      this.apiService.getmeal(mealDateJson,this.tokken).subscribe((response)=>{
        console.log("get meal plan response",response);
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          if(res.success){
             
                console.log(res.meals);
              
               if(res.meals.length!==0){

                console.log(res.meals[0].mealJson);
                localStorage.setItem('nutritionDate',String(date));
                // if(isHistory){

                //   let dietHistoryModal = this.modalCtrl.create(DietHistoryPage,
                //     {"json":response.json().meals,
                //     "date":date,
                //     "fatCal":this.fatCal,
                //     "fatGms":this.fatGms,
                //     "protienCal":this.protienCal,
                //     "protienGms":this.protienGms,
                //     "carbsCal":this.carbsCal,
                //     "carbsGms":this.carbsGms,
                //     "calPerDay":this.calPerDay,
                //     "fatPercent":this.fatPercent,
                //     "protienPercent":this.protienPercent,
                //     "carbsPercent":this.carbsPercent});               

                //     dietHistoryModal.present();

                //  }else{
                  this.finalFoodDataByDate = [];
                  for(let k =0;k<res.meals.length;k++){
  
                    var foodList = JSON.parse(res.meals[k].mealJson);
                      
                    this.finalFoodDataByDate.push(
                      {id:res.meals[k].id,
                      mealName:foodList.mealName,
                      mealDate:foodList.mealDate,
                      mealTime:foodList.mealTime,
                      mealcal:foodList.mealcal,
                      mealfat:foodList.mealfat,
                      mealpro:foodList.mealpro,
                      mealcarb:foodList.mealcarb,
                      mealData:foodList.mealData});
                   
                  }
                  console.log("meal date",this.finalFoodDataByDate[0].mealDate);
                    console.log("final food data by date",this.finalFoodDataByDate);
                    // let toast = this.toastCtrl.create({
                    //   message: "Retrieved data successfully",
                    //   duration: 3000
                    // });
                    // toast.present();
    
                    // setTimeout(() => {
                    //   this.getTotalLoad();
                    //  },1000);
                //  }

              //  }else{

                // if(isHistory){
                 
                //   this.loadData.stopLoading();
                //   // let toast = this.toastCtrl.create({
                //   //   message: "No meals added on "+date,
                //   //   duration: 3000
                //   // });
                //   // toast.present();
                //   this.noMealsAlert(date);

                // }else{
                //   this.mealMsg = "Please add meal for today"
                //   this.loadData.stopLoading();
                //   let toast = this.toastCtrl.create({
                //     message: "No meals added for today",
                //     duration: 3000
                //   });
                //   toast.present();

                //   setTimeout(() => {
                //     this.getTotalLoad();
                //    },1000);
                // }

                setTimeout(() => {
                  this.getTotalLoad();
                 },1000);

                }
                   
      }
    })
}else{
  this.loadData.stopLoading();
  let toast = await this.toastCtrl.create({
    message: "Please check your internet connectivity and try again",
    duration: 3000
  });
  toast.present();
}
}
  public macrosCalGms(){
  this.fatCalBalance = 0;
  this.carbsCalBalance = 0
  this.protienCalBalance = 0;
  
  this.fatGmsBalance = 0;
  this.carbsGmsBalance = 0;
  this.protienGmsBalance = 0;

  console.log("calculation fat cal",this.fatPercent);
  console.log("calculation fat cal",this.calPerDay);

  console.log("calculation fat cal",this.fatPercent * this.calPerDay);
  
  this.fatCal = parseFloat(this.roundTo(this.fatPercent * this.calPerDay,2));
  this.fatGms = parseFloat(this.roundTo((this.fatCal/this.fatCalGm),2));

  console.log("finalfood data for fatgms",this.fatGms);
  console.log("finalfood data for fatgms",this.fatCal);

  this.protienCal = parseFloat(this.roundTo(this.protienPercent * this.calPerDay,2));
  this.protienGms = parseFloat(this.roundTo(this.protienCal/this.protienCalGm,2));

  this.carbsCal = parseFloat(this.roundTo(this.carbsPercent * this.calPerDay,2));
  this.carbsGms = parseFloat(this.roundTo(this.carbsCal/this.carbCalGm,2));
  
  if(this.finalFoodDataByDate){
      
    for(let k =0;k<this.finalFoodDataByDate.length;k++){

      for(let l =0;l<this.finalFoodDataByDate[k].mealData.length;l++){
        
        this.finalFoodDataByDate[k].mealData[l].calories;
        
        this.fatGmsBalance += (this.finalFoodDataByDate[k].mealData[l].fat * this.finalFoodDataByDate[k].mealData[l].foodcount) ;
        this.carbsGmsBalance += (this.finalFoodDataByDate[k].mealData[l].carbs * this.finalFoodDataByDate[k].mealData[l].foodcount);
        this.protienGmsBalance += (this.finalFoodDataByDate[k].mealData[l].protien * this.finalFoodDataByDate[k].mealData[l].foodcount);
        
        var fatcal = this.roundTo(((this.finalFoodDataByDate[k].mealData[l].fatPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2);
        var carbcal = this.roundTo(((this.finalFoodDataByDate[k].mealData[l].carbPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2);
        var protiencal = this.roundTo(((this.finalFoodDataByDate[k].mealData[l].protienPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2);
        
        this.fatCalBalance += (parseFloat(fatcal)) * this.finalFoodDataByDate[k].mealData[l].foodcount;
        this.carbsCalBalance += (parseFloat(carbcal)) * this.finalFoodDataByDate[k].mealData[l].foodcount;
        this.protienCalBalance += (parseFloat(protiencal)) * this.finalFoodDataByDate[k].mealData[l].foodcount;

      }
      
    }

   }
  console.log("total fal balance",this.fatCalBalance);
  console.log("total carbs balance",this.carbsCalBalance);
 
  this.fatCalBalance = this.fatCal - this.fatCalBalance;
  this.carbsCalBalance = this.carbsCal - this.carbsCalBalance;
  this.protienCalBalance = this.protienCal - this.protienCalBalance;
  console.log("carbs balance",this.carbsCal);
  console.log("protienCal balance",this.protienCal);

  this.fatGmsBalance = parseFloat(this.roundTo((this.fatGms - this.fatGmsBalance),2));
  this.carbsGmsBalance = parseFloat(this.roundTo((this.carbsGms - this.carbsGmsBalance),2));
  this.protienGmsBalance = parseFloat(this.roundTo(this.protienGms - this.protienGmsBalance,2));

  this.fatGmsBalancePercent = 100 - ((this.fatGmsBalance/this.fatGms)*100);
  this.carbsGmsBalancePercent = 100 - ((this.carbsGmsBalance/this.carbsGms)*100);
  this.protienGmsBalancePercent = 100 - ((this.protienGmsBalance/this.protienGms)*100);

  this.totalCalBalance = this.fatCalBalance + this.carbsCalBalance + this.protienCalBalance;
  this.totalCalBalancePercent = 100 - ((this.totalCalBalance/this.calPerDay)*100);

  console.log("fat balance",this.fatCal);
  console.log("total cal balance percent",this.totalCalBalancePercent);
  console.log("total protien balance percent",this.protienGmsBalancePercent);
  if(this.fatGmsBalancePercent>100){
    this.fatGmsBalancePercent =100;
  }
  console.log("carbspercent",this.carbsGmsBalancePercent);
  if(this.carbsGmsBalancePercent>100){
    this.carbsGmsBalancePercent =100;
  }
  console.log("protienpercent",this.protienGmsBalancePercent);
  if(this.protienGmsBalancePercent>100){
    this.protienGmsBalancePercent = 100;
  }
  console.log("caloriespercent",this.totalCalBalancePercent);
  if(this.totalCalBalancePercent>100){
    this.totalCalBalancePercent = 100;
  }

 
  if(isNaN(this.fatGmsBalancePercent)){
    this.fatGmsBalancePercent = 0;
  }
 
  if(isNaN(this.carbsGmsBalancePercent)){
    this.carbsGmsBalancePercent = 0;
  }
 
  if(isNaN(this.protienGmsBalancePercent)){
    this.protienGmsBalancePercent = 0;
  }
 
  if(isNaN(this.totalCalBalancePercent)){
    this.totalCalBalancePercent = 0;
  }
   localStorage.setItem('fatpercent', String(this.fatGmsBalancePercent));
  console.log(localStorage.setItem('fatpercent', String(this.fatGmsBalancePercent)));
   localStorage.setItem('carbspercent', String(this.carbsGmsBalancePercent));
  console.log(localStorage.setItem('carbspercent', String(this.carbsGmsBalancePercent)));
   localStorage.setItem('protienpercent', String(this.protienGmsBalancePercent));
  console.log("protienpercent",this.protienGmsBalancePercent);
   localStorage.setItem('caloriespercent', String(this.fatGmsBalancePercent));
  console.log("caloriespercent",this.totalCalBalancePercent);
 
  
  this.fatGmsIntake = parseFloat(this.roundTo(this.fatGms - this.fatGmsBalance,2));
  this.carbsGmsIntake = parseFloat(this.roundTo(this.carbsGms - this.carbsGmsBalance,2));
  console.log(this.protienGms,this.protienGmsBalance);
  this.protienGmsIntake = parseFloat(this.roundTo(this.protienGms - this.protienGmsBalance,2));

  this.calIntake = parseFloat(this.roundTo(this.calPerDay - this.totalCalBalance,2));

  console.log(this.fatGmsIntake,this.carbsGmsIntake,this.protienGmsIntake,this.calIntake);

  localStorage.setItem('fatGmsIntake',String(this.fatGmsIntake));
  localStorage.setItem('carbsGmsIntake',String(this.carbsGmsIntake));
  localStorage.setItem('protienGmsIntake',String(this.protienGmsIntake));
  localStorage.setItem('calIntake',String(this.calIntake));
  this.showNutrition = false;
  if(isNaN(this.fatGmsIntake || this.carbsGmsIntake || this.protienGmsIntake || this.calIntake)){
    this.showNutrition = true;
  }else{
    this.showNutrition = false;
  }
}

  async opensessionPopup(sessionId,currentdayID){

    let modal = await this.modalCtrl.create({component:SessionsummaryPage,
      componentProps:{fromPage:"dashboard",day_id:this.currentdayID,session_id:sessionId}
    });

    modal.present();

  }

  getAnalyticsData(){
    this.day_id =localStorage.getItem('todayDayId');
     console.log("day id for analytics",this.day_id);
       if(this.totalreps == '' || this.totalweight == '' || this.Tonnage == '' || this.cal== '' || this.Work== ''){
        this.sqlStorageNew.query("select * from planactivity where day_id = "+this.day_id).then(
          activityData => {

            for(let mi = 0; mi < activityData.res.rows.length; mi++) {
              
              this.planActivity.push(activityData.res.rows.item(mi));
            
            }          
            
          }
        );
        console.log("day id for analytics",this.day_id);
        this.sqlStorageNew.query("select * from planactions where day_id ="+this.day_id).then(
          planactionData => {
            for(let mi = 0; mi < planactionData.res.rows.length; mi++) {
              this.actionData.push(planactionData.res.rows.item(mi));
            }
          }
        );
        
        this.sqlStorageNew.query("select * from exercises").then(
          exerciseData => {
            for(let mi = 0; mi < exerciseData.res.rows.length; mi++) {
              
              this.planexerciseData.push(exerciseData.res.rows.item(mi));
            }
          });
        
        setTimeout(() => {
           this.getActivity(this.day_id);
            this.loadData.stopLoading();
         }, 500);
  
     }
  }
  dayChange(){
    // this.notActive = false;
    this.day_id =localStorage.getItem('todayDayId');
    console.log("dayChange day id",this.day_id);
    this.sqlStorageNew.query("select * from planactivity where day_id = "+this.day_id).then(
      activityData => {
        for(let mi = 0; mi < activityData.res.rows.length; mi++) {
          this.planActivity.push(activityData.res.rows.item(mi));
        }
        if(this.planActivity[0].status == 1){ 
          this.notActive = false;
          console.log("show Analytics");
          if(isNaN(this.totalweight || this.Tonnage || this.Work || this.cal)){
            this.notActive = true;
          }
          }else{
          this.notActive = true;
        }         
      }
    );
    this.loadData.stopLoading(); 
  }

  getTodayInfo() {
    setTimeout(() => {
      this.sqlStorageNew.query("select p.*, u.nextrenewaldate, u.dayOff from userplan u left join plan p on u.plan_id = p.id where u.status = 1").then(
        data => {
          console.log("plan info...",data);
          if(data.res.rows.length > 0){
            // this.planInfo="";
            this.planInfo = { "id": data.res.rows.item(0).id, 
            // "planPhoto": data.res.rows.item(0).planPhoto,
              "planName": data.res.rows.item(0).planName,
            //  "coachPhoto":global.s3URL +data.res.rows.item(0).createdByImg,
              "coachName":data.res.rows.item(0).createdBy,
              "durationWeeks":data.res.rows.item(0).duration_weeks};
            // this.coachPhoto=data.res.rows.item(0).createdByImg;
            var todayDate1 = new Date();
            let todayDate1Obj = new Date(todayDate1.getFullYear(), todayDate1.getMonth(), todayDate1.getDate());
            if(todayDate1Obj.getDay() === data.res.rows.item(0).dayOff) {
              console.log("Rest Day 1");
              this.todayRestDay = true;
              this.showNextWOBtn = false;
              var nextDay = new Date(todayDate1.getTime() + 1*24*60*60*1000);
              this.nextWorkoutDateStr = ('0' +(nextDay.getDate())).slice(-2) + '-' + ('0' +(nextDay.getMonth()+1)).slice(-2) + '-' +nextDay.getFullYear() 
              //this.showNextWorkoutDateRestDay();
              // this.loadData.stopLoading();  
            } else {                  
               this.loadData.startLoading();         
              this.sqlStorageNew.query("select * from plandays where status = 1 order by day_id desc").then(
                planCompletedDay => {
                  if(planCompletedDay.res.rows.length > 0) {
                    let offDayNext = data.res.rows.item(0).dayOff;
                    var dispDate = new Date();
                    var todayDate = dispDate.getFullYear() + '-' + ('0' +(dispDate.getMonth()+1)).slice(-2) + '-' + ('0' +(dispDate.getDate())).slice(-2);
                    let todayDateObj = new Date(dispDate.getFullYear(), dispDate.getMonth(), dispDate.getDate());
                    let iosFormatDate = this.loadData.changeDateFormat(planCompletedDay.res.rows.item(0).date, "ios")
                    var lastWDate = new Date(iosFormatDate);
                    console.log("lastWDate", lastWDate);
                    let lastWorkDate = lastWDate.getFullYear() + '-' + ('0' +(lastWDate.getMonth()+1)).slice(-2) + '-' + ('0' +(lastWDate.getDate())).slice(-2);
                    let lastWorkDateObj = new Date(lastWDate.getFullYear(), lastWDate.getMonth(), lastWDate.getDate());
                    var Difference_In_Time = todayDateObj.getTime() - lastWorkDateObj.getTime();   
                    // To calculate the no. of days between two dates 
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    this.currentdayID = planCompletedDay.res.rows.item(0).day_id;
                    if(todayDate === lastWorkDate) {
                      let todayDayId = planCompletedDay.res.rows.item(0).day_id;
                      this.sqlStorageNew.query("select * from planactions where day_id = " + this.currentdayID + " and status = 1 order by action_id desc").then(         
                      lastActionData => {
                        let lastCompletedActionID = 0;
                        if(lastActionData.res.rows.length > 0) {
                          lastCompletedActionID = lastActionData.res.rows.item(0).action_id;
                        }
                        this.sqlStorageNew.query("select * from planactions where day_id = "+this.currentdayID+" AND  action_id > "+lastCompletedActionID+" AND status = 0 order by day_id desc").then(
                          sessioncompleteObj => {
                            if(sessioncompleteObj.res.rows.length === 0) {
                              this.todaySessionComplete = true;
                              localStorage.setItem('todayDayId',todayDayId);
                              this.showNextWorkoutDate(todayDayId);
                               this.loadData.stopLoading();
                            } else {
                              localStorage.setItem('todayDayId',todayDayId);
                               this.loadData.stopLoading();
                            }
                          });
  
                           this.loadData.stopLoading();
                      });
                      
                    } else {
                      let dispDate2 = new Date();
                      let todayDate2 = dispDate2.getFullYear() + '-' + ('0' +(dispDate2.getMonth()+1)).slice(-2) + '-' + ('0' +(dispDate2.getDate())).slice(-2);
                      for(let k = 0; k < planCompletedDay.res.rows.length; k++) {
                        let lastiosWDate2 = this.loadData.changeDateFormat(planCompletedDay.res.rows.item(k).date, "ios");
                        var lastWDate2 = new Date(lastiosWDate2);
                        let lastWorkDate2 = lastWDate2.getFullYear() + '-' + ('0' +(lastWDate2.getMonth()+1)).slice(-2) + '-' + ('0' +(lastWDate2.getDate())).slice(-2);
                        if(todayDate2 === lastWorkDate2) {
                          this.todaySessionComplete = true;
                          localStorage.setItem('todayDayId',planCompletedDay.res.rows.item(k).day_id);
                          this.showNextWorkoutDate(planCompletedDay.res.rows.item(k).day_id);
                           this.loadData.stopLoading();
                        }
                      }                    
                      setTimeout(() => {
                        if(this.todaySessionComplete === false) {
                              var totalOffdays = 0;
                              for (var i = lastWorkDateObj; i <= todayDateObj; ){
                                  if (i.getDay() == offDayNext){
                                      totalOffdays++;
                                  }
                                  i.setTime(i.getTime() + 1000*60*60*24);
                              }
                              console.log("Difference_In_Days", Difference_In_Days)
                              if(Math.floor(Difference_In_Days) >= 1) {
                                if(totalOffdays === 0) {
                                  let daysLeft = this.getNextDayOfWeek(dispDate, offDayNext);
                                  this.sqlStorageNew.query("select COUNT(DISTINCT day_id) as totalWDays from planactions where micro_id = " + planCompletedDay.res.rows.item(0).micro_id + " AND day_id > " + planCompletedDay.res.rows.item(0).day_id + " AND status = 0 GROUP BY day_id").then(
                                    workoutLeftObj => {
                                      if(workoutLeftObj.res.rows.length === 0) {
                                        console.log("Rest Day 2");
                                        this.todayRestDay = true;
                                        this.showNextWOBtn = false;
                                        this.currentMicroID = planCompletedDay.res.rows.item(0).micro_id;
                                        this.showNextWorkoutDateRestDay();
                                         this.loadData.stopLoading();                              
                                      } else {
                                        let workoutLeftDays = workoutLeftObj.res.rows.item(0).totalWDays;
                                        if(daysLeft >= workoutLeftDays ){
                                          this.sqlStorageNew.query("select * from planactions where micro_id = " + planCompletedDay.res.rows.item(0).micro_id + " AND day_id > " + planCompletedDay.res.rows.item(0).day_id + " AND status = 0").then(
                                            laodWDataObj => {
                                              let idDiff = laodWDataObj.res.rows.item(0).day_id - planCompletedDay.res.rows.item(0).day_id;
                                              if(idDiff > Math.floor(Difference_In_Days)) {
                                                console.log("Rest Day 3");
                                                this.todayRestDay = true;
                                                this.nextSessioId = laodWDataObj.res.rows.item(0).day_id;
                                                this.currentMicroID = planCompletedDay.res.rows.item(0).micro_id;
                                                this.showNextWorkoutDateRestDay();
                                                 this.loadData.stopLoading();
                                              } else {
                                                let todayDayId = laodWDataObj.res.rows.item(0).day_id;
                                                localStorage.setItem('todayDayId',todayDayId);
                                                 this.loadData.stopLoading();
                                              }
                                          });
                                        } else {
                                          console.log("Selected Micro ID", planCompletedDay.res.rows.item(0).micro_id);
                                          this.sqlStorageNew.query("select day_id from planactions where micro_id = " + planCompletedDay.res.rows.item(0).micro_id + " AND status = 0 GROUP BY day_id ORDER BY day_id LIMIT " + workoutLeftDays).then(
                                            laodWData1Obj => {
                                              console.log("Workout Left Days", workoutLeftDays);
                                              let workoutIndex = workoutLeftDays - 1;
                                              console.log(workoutIndex);
                                              let todayDayId = laodWData1Obj.res.rows.item(workoutIndex).day_id;
                                              localStorage.setItem('todayDayId',todayDayId);
                                               this.loadData.stopLoading();
                                            }
                                          );
                                        }
                                      }
                                    }
                                  );
                                } else {
                                  let daysLeft = this.getNextDayOfWeek(dispDate, offDayNext);
                                  this.sqlStorageNew.query("SELECT micro_id from planmicrocycles where micro_id > " + planCompletedDay.res.rows.item(0).micro_id + " ORDER BY micro_id LIMIT 1").then(
                                    nextMicrodata => {
                                      if(nextMicrodata.res.rows.length === 0) {
                                        this.planComplete = true;
                                         this.loadData.stopLoading();
                                      } else {
                                        let nextMicroID = nextMicrodata.res.rows.item(0).micro_id;
                                      
                                        this.sqlStorageNew.query("select COUNT(DISTINCT day_id) as totalWDays from planactions where micro_id = " + nextMicroID + " AND status = 0 GROUP BY day_id").then(
                                          workoutLeftObj => {
                                            if(workoutLeftObj.res.rows.length === 0) {
                                              console.log("Rest Day 4");
                                              this.todayRestDay = true;
                                              this.showNextWOBtn = false;
                                              this.currentMicroID = nextMicroID;
                                              this.showNextWorkoutDateRestDay();
                                               this.loadData.stopLoading();                              
                                            } else {
                                              let workoutLeftDays = workoutLeftObj.res.rows.item(0).totalWDays;
                                              if(daysLeft >= workoutLeftDays ){
                                                this.sqlStorageNew.query("select * from planactions where micro_id = " + nextMicroID + " AND day_id > " + planCompletedDay.res.rows.item(0).day_id + " AND status = 0").then(
                                                  laodWDataObj => {
                                                    let idDiff = laodWDataObj.res.rows.item(0).day_id - planCompletedDay.res.rows.item(0).day_id;
                                                    if(idDiff > Math.floor(Difference_In_Days)) {
                                                      console.log("Rest Day 5");
                                                      this.todayRestDay = true;
                                                      this.nextSessioId = laodWDataObj.res.rows.item(0).day_id;
                                                      this.currentMicroID = nextMicroID;
                                                      this.showNextWorkoutDateRestDay();
                                                       this.loadData.stopLoading();
                                                    } else {
                                                      let todayDayId = laodWDataObj.res.rows.item(0).day_id;
                                                      localStorage.setItem('todayDayId',todayDayId);
                                                       this.loadData.stopLoading();
                                                    }
                                                });
                                              } else {
                                                console.log("Selected Micro ID", nextMicroID);
                                                this.sqlStorageNew.query("select day_id from planactions where micro_id = " + nextMicroID + " AND status = 0 GROUP BY day_id ORDER BY day_id LIMIT " + workoutLeftDays).then(
                                                  laodWData1Obj => {
                                                    console.log("Workout Left Days", workoutLeftDays);
                                                    let workoutIndex = workoutLeftDays - 1;
                                                    console.log(workoutIndex);
                                                    let todayDayId = laodWData1Obj.res.rows.item(workoutIndex).day_id;
                                                    localStorage.setItem('todayDayId',todayDayId);
                                                    this.loadData.stopLoading();
                                                  }
                                                );
                                              }
                                            }
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              } else {
                                this.sqlStorageNew.query("select * from plandays where status = 0 and day_id > " + planCompletedDay.res.rows.item(0).day_id + " limit 1").then(
                                  planNextDay => {
                                    if(planNextDay.res.rows.length > 0) {
                                      let todayDayId = planNextDay.res.rows.item(0).day_id;
                                      localStorage.setItem('todayDayId',todayDayId);
                                      this.sqlStorageNew.query("select * from plansessions where day_id = " + todayDayId).then(
                                        sessions => {
                                          if(sessions.res.rows.length === 0) {
                                            console.log("Rest Day 6");
                                            this.todayRestDay = true;
                                            this.currentMicroID = planNextDay.res.rows.item(0).micro_id;
                                            
                                            var todayDate = new Date();
                                            //console.log("day count session---", todayDate);
                                           
                                            var nextWorkoutDate = new Date(todayDate.getTime() + 1*24*60*60*1000);
                                            
                                            //console.log("day count session---",nextWorkoutDate);  
                                     
                                            this.nextWorkoutDateStr = ('0' +(nextWorkoutDate.getDate())).slice(-2) + '-' + ('0' +(nextWorkoutDate.getMonth()+1)).slice(-2) + '-' +nextWorkoutDate.getFullYear() ;
                                            
                                            //this.showNextWorkoutDateRestDay();
                                            //this.noplan = true;
                                            //this.sqlStorageNew.query("update plandays set status = 1 where day_id = " + todayDayId)
                                          }
                                           this.loadData.stopLoading();
                                      });
                                    } else {
                                      this.planComplete = true;
                                       this.loadData.stopLoading();
                                    }
                                    this.loadData.stopLoading();
                                });
                              }
                          }
                      }, 500);
                    }
                  } else {
                    this.sqlStorageNew.query("select * from plandays").then(
                      planFirstDay => {
                      
                        let todayDayId = planFirstDay.res.rows.item(0).day_id;
                        localStorage.setItem('todayDayId',todayDayId);
                        this.loadData.stopLoading();
                    });
                    
                  }
                  this.sqlStorageNew.query("select * from planactions").then(
                    planTotalDay => {
                      this.sqlStorageNew.query("select * from planactions where status = 1").then(
                        planDoneDays => {
                          this.percentageDays = ((planDoneDays.res.rows.length/planTotalDay.res.rows.length)*100).toFixed();
                        }
                      );
                      
                  });
              });
            }
          
            setTimeout(() => {
             this.loadData.stopLoading();
            }, 300);
            
            this.barValue = this.percentageDays/100;
            console.log("percentage days",this.percentageDays);
            console.log("plan name dashboard...",data.res.rows.item(0).planName);
            console.log(this.planInfo);
            this.platform.ready().then(() => {
            setTimeout(() => {
               this.loadData.startLoading(); 
              if(this.totalreps == '' || this.totalweight == '' || this.Tonnage == '' || this.cal== '' || this.Work== ''){
                this.getAnalyticsData();
                }else{
                  this.dayChange();
                }
              }, 1000);
            });
          } else {

            this.sqlStorageNew.query("select p.*, u.nextrenewaldate, u.dayOff from userplan u left join plan p on u.plan_id = p.id where u.status = 3").then(
              data => {

               
                if(data.res.rows.length > 0){
                  this.planInfo = { "id": data.res.rows.item(0).id, 
                  // "planPhoto": data.res.rows.item(0).planPhoto,
                    "planName": data.res.rows.item(0).planName,
                  //  "coachPhoto":global.s3URL +data.res.rows.item(0).createdByImg,
                    "coachName":data.res.rows.item(0).createdBy,
                    "durationWeeks":data.res.rows.item(0).duration_weeks};
                  this.noPlanActive = true;
                
                }else{

                  this.noplan = true;
                }

              });
            
            
             this.loadData.stopLoading();
          }
        }
      ).catch(err => {
        console.error('--2--'+JSON.stringify(err));
         this.loadData.stopLoading();
      });
     
    }, 500);
  }
 
  showNextWorkoutDateRestDay(){

    var dayCount = 0;
    this.sqlStorageNew.query("select * from plandays where num_of_sessions > 0 and status = 1").then(

      plandaysCompleted=> {

        //console.log("days in plan---", plandaysCompleted);

        var lastDayId = plandaysCompleted.res.rows.item(plandaysCompleted.res.rows.length-1).day_id;
        //console.log("day count session---", lastDayId);
        this.sqlStorageNew.query("select * from plandays where num_of_sessions > 0 and status = 0").then(

          plandaysRemaining=> {

            var nextDayId = plandaysRemaining.res.rows.item(0).day_id;
            //console.log("day count session---", nextDayId);
            dayCount = (nextDayId-lastDayId);        
            console.log("day count session---", dayCount);
            console.log("day count session day name---", plandaysRemaining.res.rows.item(0).day_name);

            if(plandaysRemaining.res.rows.item(0).day_name === "Rest Day"){

              dayCount = dayCount+1;
              console.log("day count session inside if condition ---", dayCount);

            }

            var restDaycount = 0;
            this.sqlStorageNew.query("select * from plandays where num_of_sessions = 0 and micro_id = "+plandaysRemaining.res.rows.item(0).micro_id).then(

              planrestdays=> {


                restDaycount = planrestdays.plandays.res.rows.length;


              });

            dayCount = dayCount + restDaycount;
           console.log("day count session---", restDaycount);
           var todayDate = new Date(plandaysCompleted.res.rows.item(plandaysCompleted.res.rows.length-1).date);
           //console.log("day count session---", todayDate);
      
           var nextWorkoutDate = new Date(todayDate.getTime() + dayCount*24*60*60*1000);
       
           console.log("day count session---",nextWorkoutDate.getDay());
           var nextDayDate = nextWorkoutDate.getDay();
           
           var dayOff = 0;
           this.sqlStorageNew.query("select * from userplan").then(

            userplans=> {


               dayOff = userplans.res.rows.item(0).dayOff;
               console.log("day count session---",dayOff);

               if(dayOff == nextWorkoutDate.getDay()){

                nextWorkoutDate = new Date(nextWorkoutDate.getTime() + 1*24*60*60*1000);
                
                }
                 
              //console.log("day count session---",nextWorkoutDate);        
              //console.log("day count session---",this.nextWorkoutDateStr);

              var today = new Date();

             if(today.getDate() == nextWorkoutDate.getDate() || today.getTime() > nextWorkoutDate.getTime()){

              var nextDay = new Date(today.getTime() + 1*24*60*60*1000);
              this.nextWorkoutDateStr = ('0' +(nextDay.getDate())).slice(-2) + '-' + ('0' +(nextDay.getMonth()+1)).slice(-2) + '-' +nextDay.getFullYear() ;

              }else{

              this.nextWorkoutDateStr = ('0' +(nextWorkoutDate.getDate())).slice(-2) + '-' + ('0' +(nextWorkoutDate.getMonth()+1)).slice(-2) + '-' +nextWorkoutDate.getFullYear() ;

              }

            });

          });

      });
      this.checkPlanEnd();
  }

  checkPlanEnd(){


    this.sqlStorageNew.query("select * from planmicrocycles").then(

      planmicros=> {


        if(planmicros.res.rows.item(planmicros.res.rows.length-1).status ==="true"){
          
          var microid = planmicros.res.rows.item(planmicros.res.rows.length-1).micro_id;
      
          this.sqlStorageNew.query("select * from plandays where num_of_sessions > 0 and status = 0 and micro_id = "+microid).then(
 
           plantdays=> {
 
             console.log("plan days last micro id",plantdays);
            
             if(plantdays.res.rows.length == 0){

              this.planComplete = true;
              this.todayRestDay = false;
              this.todaySessionComplete = false;

             }
 
             
           });

        }
       

      });
  }

  showNextWorkoutDate(todayDayId){

    var dayCount = 0;
    this.sqlStorageNew.query("select * from plandays where num_of_sessions > 0").then(

      plandays=> {

        console.log("days in plan---", plandays);

        for(let i =0;i<plandays.res.rows.length;i++){

          if(plandays.res.rows.item(i).day_id == todayDayId ){

            console.log("day count session---", plandays.res.rows.item(i).day_id);
            console.log("day count session---", plandays.res.rows.item(i+1).day_id);
            var restDaycount = 0;
            this.sqlStorageNew.query("select * from plandays where num_of_sessions = 0 and micro_id = "+plandays.res.rows.item(i).micro_id).then(

              planrestdays=> {


                restDaycount = planrestdays.plandays.res.rows.length;


              });

            dayCount = (plandays.res.rows.item(i+1).day_id - plandays.res.rows.item(i).day_id) + restDaycount;

          }

        }

        // console.log("day count session---", dayCount);
        
        var todayDate = new Date();
        var nextWorkoutDate = new Date(todayDate.getTime() + dayCount*24*60*60*1000);
        
        console.log("day count session---",nextWorkoutDate);  

        this.nextWorkoutDateStr = ('0' +(nextWorkoutDate.getDate())).slice(-2) + '-' + ('0' +(nextWorkoutDate.getMonth()+1)).slice(-2) + '-' +nextWorkoutDate.getFullYear() ;
        
        console.log("day count session before day off---",this.nextWorkoutDateStr);  
        console.log("day count session---",nextWorkoutDate.getDay());
           var nextDayDate = nextWorkoutDate.getDay();
           
           var dayOff = 0;
           this.sqlStorageNew.query("select * from userplan").then(

            userplans=> {


               dayOff = userplans.res.rows.item(0).dayOff;
               console.log("day count session---",dayOff);

               if(dayOff == nextWorkoutDate.getDay()){

                nextWorkoutDate = new Date(nextWorkoutDate.getTime() + 1*24*60*60*1000);
                
                }
                 
              //console.log("day count session---",nextWorkoutDate);        
              //console.log("day count session---",this.nextWorkoutDateStr);

              var today = new Date();

             if(today.getDate() == nextWorkoutDate.getDate() || today.getTime() > nextWorkoutDate.getTime()){

              var nextDay = new Date(today.getTime() + 1*24*60*60*1000);
              this.nextWorkoutDateStr = ('0' +(nextDay.getDate())).slice(-2) + '-' + ('0' +(nextDay.getMonth()+1)).slice(-2) + '-' +nextDay.getFullYear() ;

              }else{

              this.nextWorkoutDateStr = ('0' +(nextWorkoutDate.getDate())).slice(-2) + '-' + ('0' +(nextWorkoutDate.getMonth()+1)).slice(-2) + '-' +nextWorkoutDate.getFullYear() ;
              console.log("day count session day off---",this.nextWorkoutDateStr);
              }

            });   


      });

      this.checkPlanEnd();

  }
  async activatePlan(){

		if(localStorage.getItem('internet')==='online'){
      var dDate = new Date();
      var deviceDate = dDate.getFullYear() + '-' + ('0' +((dDate.getMonth() + 1))).slice(-2) + '-' +  ('0' +(dDate.getDate())).slice(-2);
			 this.loadData.startLoading();
			
			var data = { 'plan_id':  this.planInfo.id,'firstPlan': "false" ,'deviceDate':deviceDate+' 00:00:00'};
       this.apiService.activatePlan(this.tokken,data).subscribe((response)=>{
         console.log("activate plan response",response);
         const userStr = JSON.stringify(response);
         let res = JSON.parse(userStr);
				if(res.success){
          localStorage.setItem('subplanid',this.planInfo.id);
          localStorage.removeItem('futureplanid');
          var startDate = this.loadData.changeDateFormat(res.startDate,'db');
          var nextrenewDate = this.loadData.changeDateFormat(res.nextRenewalDate,'db');
          var dayOff = res.dayOff;
          this.sqlStorageNew.query("UPDATE userplan SET status=1,startdate = '" + startDate + "',nextrenewaldate = '" + nextrenewDate + "', dayOff = '" + dayOff +"' WHERE status=3").then(data=>{
             this.loadData.stopLoading();
            localStorage.setItem('generalwarmupcmpl','false');
            this.navCtrl.navigateForward(this.router.url + '/dashboard/');
            //this.initLoad();
          }).catch(err => {
            console.error('--12--'+JSON.stringify(err));
          });
				}else{
           this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try after some time");
        
        }
        this.toastmsg(res.message);
				
			},(err)=>{
        if(err.status === 403){
          this.loadData.forbidden();
          // this.navCtrl.navigateForward(LoginPage);
        }
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
  getNextWorkout() {

    this.sqlStorageNew.query("select * from planactions where micro_id = " + this.currentMicroID + " AND status = 0 AND day_id > "+this.currentdayID+" ORDER BY day_id ASC").then(
      nextWorkoutObj => {
        let todayDayId = nextWorkoutObj.res.rows.item(0).day_id;
        localStorage.setItem('todayDayId',todayDayId);
        this.navCtrl.navigateForward('/todayworkout');
      }
    );

  }
  getNextDayOfWeek(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    var Difference_In_Time = resultDate.getTime() - date.getTime(); 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
    return Difference_In_Days;
  }
  sessionSummary() {

    let todayDayId = localStorage.getItem('todayDayId');

    this.sqlStorageNew.query("select * from plansessions where day_id = " + todayDayId + " AND status = 1 ORDER BY day_id ASC").then(
      sessionObj => {
        if(sessionObj.res.rows.length > 0){
          let sessionId = sessionObj.res.rows.item(sessionObj.res.rows.length-1).session_id;
          this.opensessionPopup(sessionId,this.currentdayID);
        }
        
      });
    console.log("Session Completed");
  }
  dietInfo(){
   this.navCtrl.navigateForward('/dietprofile');
  } 
  public getActivity(day_id){
      this.tempActivity = [];
      // this.notActive = true;
      // this.notActive = false;
      // console.log("getActivity method session....id ",day_id);
      for(let i=0;i<this.planActivity.length;i++){
        if(this.planActivity[i].day_id == day_id){
          if(this.planActivity[i].status == 1){
          this.tempActivity.push(this.planActivity[i]);
           this.notActive = false;
          }
        }else{
          this.notActive = true;
      }
    }
      for(let i=0;i<this.tempActivity.length;i++){
      setTimeout(() => {
         this.getAction(day_id);
         this.tempActivity[0].Activity_type;
        console.log("show activity ",this.tempActivity);
      }, 300)
     }
    }

    public getAction(day_id){
      // console.log("action data,round id....",day_id);
       this.tempAction = [];
      
      for(let i=0;i<this.actionData.length;i++){
        if(this.actionData[i].day_id== day_id){
          if(this.actionData[i].status == 1){
           this.tempAction.push(this.actionData[i]);
          }
        }
      }
/*Calculating total reps,avg Weight*/
    this.totalweight = 0;
    var totalrepss = 0;
    var totalweightt = 0;
    var count = 0;
     for(let ia=0; ia < this.tempAction.length; ia++){
      // console.log("reps done",this.tempAction[ia].repsdone);
     
      totalrepss =  totalrepss + this.tempAction[ia].repsdone;
     
       if(this.tempAction[ia].action_type === "MainSet"){
        count = count + 1;
        totalweightt = (totalweightt + this.tempAction[ia].workweight);
      }
      // this.totalweight = (totalweightt/count).toFixed();
  }
  this.totalreps = totalrepss;
  this.totalweight = (totalweightt/count).toFixed();
/*  calculation end */
    if(this.tempActivity[0].Activity_type === "Simple"){
      this.tempExeData = []; 
      // console.log("simple activity");     
      setTimeout(() => {
        // console.log("inside if get action condition",this.tempAction[0].action_id)
        this.getExercise(this.tempAction[0].exercise_id);
    }, 300)

    }else{
      console.log("complex activity");  
      this.tempExeData = [];
      for(let i=0;i<this.tempAction.length;i++){
      // console.log("inside if condition on getAction method",this.tempAction)
      setTimeout(() => {
      // console.log("inside if get action condition",this.tempAction[0].action_id)

      this.getExercise(this.tempAction[i].exercise_id);
      }, 300)
      }
    }
  }
public getExercise(exercise_id){
  // console.log("ex data of exercise_id",exercise_id);
  
  for(let i=0;i<this.planexerciseData.length;i++){
    if(this.planexerciseData[i].id== exercise_id){
      this.tempExeData.push(this.planexerciseData[i]);
    }
  }
 
  /*Calculating Tonnage, Work, Calories */
  this.Tonnage=0;
  this.Work= 0;
  var calories = 0;
  var stressFactor = this.tempExeData[0].stressFactor;
  var weight = this.loadData.convertWeight(weight,'db');
    console.log("stress factor",stressFactor);
  var totalTonnage = parseFloat(((this.totalweight*this.totalreps)/1000).toFixed(2));
  var totalwork = Math.round(9.8*this.totalweight*this.totalreps);
    // if(this.metrics =='Lb'){
  calories = Math.round(totalwork * 0.238902957619); /* converting lbs to kgs for calculations */
    // }else{
    //    this.cal=Math.round(totalwork);
    // }
  this.Tonnage = totalTonnage ;
  this.Work = totalwork ;
  this.cal = calories;
  console.log("tonnage",this.Tonnage);
  console.log("tonnage",this.Work);
    // if(this.totalweight == NaN || this.Tonnage == NaN || this.Work == NaN || this.cal == NaN){
    if(isNaN(this.totalweight || this.Tonnage || this.Work || this.cal)){
      this.notActive = true;
       this.loadData.stopLoading();
    }else{
    localStorage.setItem('totalreps',this.totalreps);
    // localStorage.setItem('tmax',this.Tmax);
    localStorage.setItem('totalweight',this.totalweight);
    localStorage.setItem('tonnage',this.Tonnage);
    localStorage.setItem('work',this.Work);
    localStorage.setItem('cal',this.cal);
    this.notActive = false;
    }
     this.loadData.stopLoading();
}
openTab(page){
  if(page==='store'){
    this.navCtrl.navigateRoot('tabs/tabs/store');
  }else if(page==='dietprofile'){
    this.navCtrl.navigateRoot('tabs/tabs/dietprofile');
  }else if(page==='workout'){
    this.navCtrl.navigateForward('todayworkout');
  }else if(page==='settings'){
    this.navCtrl.navigateRoot('tabs/tabs/profile');
  }else if(page==='analytics'){
    if(this.planSetStatus){

      this.navCtrl.navigateRoot('tabs/tabs/analytics');

    }else{

      this.noProgramsAlert();
      
    }
}    
}
}
