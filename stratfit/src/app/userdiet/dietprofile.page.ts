import { Component, OnInit, resolveForwardRef } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { global } from '../global';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { CalendarController } from "ion2-calendar/dist";
import { DiethistoryPage } from './diethistory/diethistory.page';
import { AddmealPage } from './addmeal/addmeal.page';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dietprofile',
  templateUrl: './dietprofile.page.html',
  styleUrls: ['./dietprofile.page.scss'],
})
export class DietprofilePage implements OnInit {
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

  bmi;
  heightcm;
  bmiMsg;
  dietMsg;
  genderD;
  userAge;
  weightD;
  
  PeriodDataM=[];
  MesoDataM=[];
	MicroDataM=[];
	SessionDataM=[];
	ExerciseDataM=[];
  SetDataM=[];
  planId;
  Exercises=[];

  currentSession;
  PeriodDataF=[];
  MesoDataF=[];
	MicroDataF=[];
	SessionDataF=[];
	ExerciseDataF=[];
  SetDataF=[];

  sessionCount;
  sessionCntArr=[];
  s3url;
  advValue;

  TodaySessionID;
  microcycleSessCount;

  rmrD;
  totalLoad;
  activityFactor;
  actualCalExp;
  calPerDay;

  dietType;
  fatPercent;
  protienPercent;
  carbsPercent;

  protienCalGm = 4;
  fatCalGm = 9;
  carbCalGm = 4;

  fatCal;
  fatGms;
  protienCal;
  protienGms;
  carbsCal;
  carbsGms;

  fatCalBalance = 0;
  fatGmsBalance = 0;
  protienCalBalance = 0;
  protienGmsBalance = 0;
  carbsCalBalance = 0;
  carbsGmsBalance = 0;

  
  fatGmsIntake = 0;
  protienGmsIntake = 0;
  carbsGmsIntake = 0;
  calIntake = 0;

  totalCalBalance;
  totalCalBalancePercent;

  fatGmsBalancePercent;
  protienGmsBalancePercent;
  carbsGmsBalancePercent;

  mealMsg = "Loading..";
  fooditem;
  defFood;
  finalFoodData:any=[];
  finalFoodDataByDate:any=[];

  backNav;

  prompt;
  pageType;

  constructor(public platform: Platform, 
     public nav: NavController,
    
     public sqlStorageNew: SqlStorageNew,   
     public toastCtrl: ToastController,
     private loadData: LoadData,
     private ga: GoogleAnalytics, 
     public modalCtrl: ModalController, 
     public http: HttpClient,
     public apiService: ApiService,
     public alertCtrl:AlertController,
     public router: Router,private route: ActivatedRoute,
     public calendarCtrl: CalendarController,
     ) {//public calendarCtrl: CalendarModule
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.pageType = this.router.getCurrentNavigation().extras.state.page;
        }
        });
  }

  ngOnInit() {
        // this.platform.ready().then(() => {
    //   let randomnumber = Math.random() * 9804;
    //   let randomnumber1 = randomnumber.toFixed(0);
    //   let emailid = 'raj' + randomnumber1 + '@gmail.com';

    //   console.log('Flow reached here.. 101 ', emailid);
    //   this.intercom.reset().then(() =>
    //     this.intercom.registerIdentifiedUser({ userId: emailid , email: emailid  }).then(() => {
    //       console.log('Flow reached here.. 103 ', randomnumber);
    //       this.intercom.setLauncherVisibility('VISIBLE');
    //       // this.intercom.displayMessageComposerWithInitialMessage('Hello, I need help with Nutrition!')
    //       // this.intercom.setInAppMessageVisibility;
    //       // this.intercom.displayMessenger( );
    //     })
    //   );
    // });

    this.ga.trackView('profile');
    this.ga.setAllowIDFACollection(true);
    this.s3Url = global.s3URL;
    this.avatar = localStorage.getItem('avatar');
    this.email = localStorage.getItem('email');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.genderD = localStorage.getItem('gender');
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
    this.dietType = localStorage.getItem('dietType');
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
    // this.backNav = this.navParams.get("page");
    // if(this.dob ==='null' || this.dob ==='' || this.dob ==='undefined'){
    //   this.dob='N/A';
    // }else{
    //   var todayDate = new Date(this.dob);
    //   this.dob = this.loadData.dateFormat(todayDate);
    // }

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

    if(this.phone ==='null' || this.phone ==='' || this.phone ==='undefined'){
      this.phone = 'N/A'
    }
    //--------diet params
  
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
      localStorage.setItem('dietGoal',this.dietMsg);

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
      this.getFoodData();
  }

  async viewHistory(){

    let dietHistoryModal = await this.modalCtrl.create({component:DiethistoryPage});
    dietHistoryModal.present();

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

      console.log(todayMealDate);
      console.log(mealtime);
      // console.log("Nutrition data ionview did enter",this.finalFoodData);

      // for(let k =0;k<this.finalFoodData.length;k++){

      //   if(this.finalFoodData[k].mealDate === todayMealDate){
          
      //     this.finalFoodDataByDate.push(this.finalFoodData[k]);

      //   }
      
      // }

       this.getMealDataServer(todayMealDateServer,false);
    //}
  }

  async getMealDataServer(date,isHistory){
    console.log("date of nutrition.........",date);
    if(localStorage.getItem('internet')==='online'){
      var mealDateJson = {mealDate:date};
      console.log(mealDateJson);
      this.apiService.getmeal(mealDateJson,this.tokken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          if(resolveForwardRef){
             
                console.log(res.meals);
              
               if(res.meals.length!==0){

                console.log(res.meals[0].mealJson);
                localStorage.setItem('nutritionDate',String(date));
                if(isHistory){

                  let dietHistoryModal = this.modalCtrl.create({component:DiethistoryPage,
                    componentProps:
                    {"json":res.meals,
                    "date":date,
                    "fatCal":this.fatCal,
                    "fatGms":this.fatGms,
                    "protienCal":this.protienCal,
                    "protienGms":this.protienGms,
                    "carbsCal":this.carbsCal,
                    "carbsGms":this.carbsGms,
                    "calPerDay":this.calPerDay,
                    "fatPercent":this.fatPercent,
                    "protienPercent":this.protienPercent,
                    "carbsPercent":this.carbsPercent}
                  });               

                    // dietHistoryModal.present();

                 }else{
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
                    console.log("final food data by date",this.finalFoodDataByDate);
                    setTimeout(() => {
                      this.getTotalLoad();
                     },1000);
                 }

               }else{

                if(isHistory){
                 
                  this.loadData.stopLoading();
                  this.noMealsAlert(date);

                }else{
                  this.mealMsg = "Please add meal for today"
                  this.loadData.stopLoading();
                  this.toastmsg("No meals added for today");
                  setTimeout(() => {
                    this.getTotalLoad();
                   },1000);
                }
      
               }
                       
          }else{
            
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try again");
          }
        },(err) =>{
          this.loadData.stopLoading();

          setTimeout(() => {
            this.getTotalLoad();
           },1000);
           this.toastmsg("Unable to process your request. Please try again");
          if(err.status === 403){
              this.loadData.forbidden();
              this.nav.navigateForward('/login');
              //this.app.getRootNav().setRoot(LoginPage);
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
  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
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

  public onChangeWtUnits(wtUnits){

    this.calculateCalories(wtUnits);

  }

  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }
  public macrosCalGms(){
    console.log("finalfood data",this.finalFoodDataByDate);
    this.fatCalBalance = 0;
    this.carbsCalBalance = 0
    this.protienCalBalance = 0;

    this.fatGmsBalance = 0;
    this.carbsGmsBalance = 0;
    this.protienGmsBalance = 0;

    this.fatCal = parseFloat(this.roundTo(this.fatPercent * this.calPerDay,2));
    this.fatGms = parseFloat(this.roundTo((this.fatCal/this.fatCalGm),2));

    console.log("finalfood data for fatgms",this.fatGms);
    console.log("finalfood data for fatgms",this.fatCal);

    this.protienCal = parseFloat(this.roundTo(this.protienPercent * this.calPerDay,2));
    this.protienGms = parseFloat(this.roundTo(this.protienCal/this.protienCalGm,2));

    this.carbsCal = parseFloat(this.roundTo(this.carbsPercent * this.calPerDay,2));
    this.carbsGms = parseFloat(this.roundTo(this.carbsCal/this.carbCalGm,2));

    console.log("finalfood data",this.finalFoodDataByDate);
    //this.fatCalBalance
    if(this.finalFoodDataByDate){
      
      for(let k =0;k<this.finalFoodDataByDate.length;k++){

        for(let l =0;l<this.finalFoodDataByDate[k].mealData.length;l++){
          
          this.finalFoodDataByDate[k].mealData[l].calories;
          
          this.fatGmsBalance += (this.finalFoodDataByDate[k].mealData[l].fat * this.finalFoodDataByDate[k].mealData[l].foodcount) ;
          this.carbsGmsBalance += (this.finalFoodDataByDate[k].mealData[l].carbs * this.finalFoodDataByDate[k].mealData[l].foodcount);
          this.protienGmsBalance += (this.finalFoodDataByDate[k].mealData[l].protien * this.finalFoodDataByDate[k].mealData[l].foodcount);
          
          var fatcal = parseFloat(this.roundTo(((this.finalFoodDataByDate[k].mealData[l].fatPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2));
          var carbcal = parseFloat(this.roundTo(((this.finalFoodDataByDate[k].mealData[l].carbPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2));
          var protiencal = parseFloat(this.roundTo(((this.finalFoodDataByDate[k].mealData[l].protienPercent * this.finalFoodDataByDate[k].mealData[l].calories)/100),2));
          
          this.fatCalBalance += (fatcal * this.finalFoodDataByDate[k].mealData[l].foodcount);
          this.carbsCalBalance += (carbcal * this.finalFoodDataByDate[k].mealData[l].foodcount);
          this.protienCalBalance += (protiencal * this.finalFoodDataByDate[k].mealData[l].foodcount);

        }
        
      }
  
    }
   
    this.fatCalBalance = this.fatCal - this.fatCalBalance;
    this.carbsCalBalance = this.carbsCal - this.carbsCalBalance;
    this.protienCalBalance = this.protienCal - this.protienCalBalance;

    this.fatGmsBalance = parseFloat(this.roundTo((this.fatGms - this.fatGmsBalance),2));
    this.carbsGmsBalance = parseFloat(this.roundTo((this.carbsGms - this.carbsGmsBalance),2));
    this.protienGmsBalance = parseFloat(this.roundTo(this.protienGms - this.protienGmsBalance,2));

    this.fatGmsBalancePercent = 100 - ((this.fatGmsBalance/this.fatGms)*100);
    this.carbsGmsBalancePercent = 100 - ((this.carbsGmsBalance/this.carbsGms)*100);
    this.protienGmsBalancePercent = 100 - ((this.protienGmsBalance/this.protienGms)*100);

    this.totalCalBalance = this.fatCalBalance + this.carbsCalBalance + this.protienCalBalance;
    this.totalCalBalancePercent = 100 - ((this.totalCalBalance/this.calPerDay)*100);
    
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
     localStorage.setItem('fatpercent', this.fatGmsBalancePercent);
    console.log(localStorage.setItem('fatpercent', this.fatGmsBalancePercent));
     localStorage.setItem('carbspercent', this.carbsGmsBalancePercent);
    console.log(localStorage.setItem('carbspercent', this.carbsGmsBalancePercent));
     localStorage.setItem('protienpercent', this.protienGmsBalancePercent);
    console.log("protienpercent",this.protienGmsBalancePercent);
     localStorage.setItem('caloriespercent', this.fatGmsBalancePercent);
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
  }

  public onChangeDietType(dtType){

    this.calculateMacroCalGms(dtType);

  }

 async noMealsAlert(date){
    this.prompt = await this.alertCtrl.create({
      // title: 'No meals',
      message:'No meals added on '+date,
      buttons: [
        {
          text: 'Ok',
          handler: workout => {
            
            this.prompt.dismiss();

          }
        }
      ]
    });
    this.prompt.present();
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

  calculateRMR(height, weight, age){
      var rmrs;
    if(this.genderD==='1'){
      
       rmrs = (10*weight) + (6.25*height) - (5*age) + 5;

    }else if(this.genderD==='2'){
      
       rmrs = (10*weight) + (6.25*height) - (5*age) - 161;

    }
    return rmrs;
  }

  getTotalLoad(){

    var noOfSessionsInMC  =  localStorage.getItem('nworkdays');
    var sfLoadiNol = 0;
    this.TodaySessionID = localStorage.getItem('todaySessionID');
    console.log("in else condition");
    this.totalLoad = 0;
    this.calculateCalories(this.dietMsg);
    //  if(localStorage.getItem('planSet')==='true'){
      
    //   setTimeout(() => {
    //   this.sqlStorageNew.query("select * from userplan where status = 1").then(
    //     userplanData => {
    //       var periodCount = -1;
    //         if(userplanData.res.rows.length>0){
    //         var planId = userplanData.res.rows.item(0).plan_id;
    //       console.log(userplanData);
       
    //       if(this.TodaySessionID!==null){
    //       if(this.TodaySessionID !== 0 ){
    //         console.log("session id is there");
    //         this.sqlStorage.query("select id, microcycle_id, (select count(*) from plansession b  where a.id >= b.id) as sessionCount from plansession a where a.id = " + this.TodaySessionID).then(
    //           sessCntData => {
    //             console.log(sessCntData);
    //             console.log(sessCntData.res.rows.item(0).microcycle_id);

    //             this.sqlStorage.query("select no_of_sessions,totalInol,id,mesocycle_id,dayOff,status from planmicrocycle a where a.id = " + sessCntData.res.rows.item(0).microcycle_id).then(
    //               microData => {
    //                 console.log(microData);
    //                 var noOfSessions = microData.res.rows.item(0).no_of_sessions;
    //                 //noOfSessionsInMC = noOfSessions;
    //                 var loadInol = microData.res.rows.item(0).totalInol;
    //                 sfLoadiNol = loadInol;
    //                 var totalLoad = noOfSessionsInMC+sfLoadiNol;
    //                 console.log(totalLoad);
    //                 this.totalLoad = totalLoad;
    //                 this.calculateCalories(this.dietMsg);

    //                 //this.calculateMacroCalGms(this.dietType);
    //               }
    //             );
    //             this.sessionCntArr =[];
    //             this.sessionCount = sessCntData.res.rows.item(0).sessionCount;
    //             for(let scnt = 1; scnt <= this.sessionCount; scnt++) {
    //               this.sessionCntArr.push(scnt);
    //             }
    //           }
    //         );
    //       }else{
    //         console.log("session id not there");
    //         this.sqlStorage.query("select id,microcycle_id, (select count(*) from plansession b  where a.id >= b.id) as sessionCount from plansession a where a.id = (select max(id) from plansession where status = 1)").then(
    //           sessCntData => {
    //             console.log(sessCntData);
    //             this.sqlStorage.query("select no_of_sessions,totalInol,id,mesocycle_id,dayOff,status from planmicrocycle a where a.id = " + sessCntData.res.rows.item(0).microcycle_id).then(
    //               microData => {
                  
    //                console.log(microData);
    //                var noOfSessions = microData.res.rows.item(0).no_of_sessions;
    //               // noOfSessionsInMC = noOfSessions;
    //                var loadInol = microData.res.rows.item(0).totalInol;
    //                sfLoadiNol = loadInol;
    //                var totalLoad = noOfSessionsInMC+sfLoadiNol;
    //                console.log(totalLoad);
    //                this.totalLoad = totalLoad;
    //                this.calculateCalories(this.dietMsg);

    //                //this.calculateMacroCalGms(this.dietType);
    //               }
    //             );
    //             this.sessionCntArr =[];
    //             this.sessionCount = sessCntData.res.rows.item(0).sessionCount;
    //             for(let scnt = 1; scnt <= this.sessionCount; scnt++) {
    //               this.sessionCntArr.push(scnt);
    //             }
    //           }
    //         );
    //       }
    //     }else{
    //       console.log("session id not there");
    //       this.sqlStorage.query("select id,microcycle_id, (select count(*) from plansession b  where a.id >= b.id) as sessionCount from plansession a where a.id = (select max(id) from plansession where status = 1)").then(
    //         sessCntData => {
    //           console.log(sessCntData);
              
    //           this.sqlStorage.query("select no_of_sessions,totalInol,id,mesocycle_id,dayOff,status from planmicrocycle a where a.id = " + sessCntData.res.rows.item(0).microcycle_id).then(
    //             microData => {
                
    //              console.log(microData);
    //              var noOfSessions = microData.res.rows.item(0).no_of_sessions;
    //              //noOfSessionsInMC = noOfSessions;
    //              var loadInol = microData.res.rows.item(0).totalInol;
    //              sfLoadiNol = loadInol;
    //              var totalLoad = noOfSessionsInMC+sfLoadiNol;
    //              console.log(totalLoad);
    //              this.totalLoad = totalLoad;
    //              this.calculateCalories(this.dietMsg);

    //              //this.calculateMacroCalGms(this.dietType);
    //             });
    //           this.sessionCntArr =[];
    //           this.sessionCount = sessCntData.res.rows.item(0).sessionCount;
    //           for(let scnt = 1; scnt <= this.sessionCount; scnt++) {
    //             this.sessionCntArr.push(scnt);
    //           }
    //         }
    //       );

    //     }
         
    //     }
    //   } }
    //     });
    //   },1000);
    //  }
    // else{

    //   console.log("in else condition");
    //   this.totalLoad = 0;
    //   this.calculateCalories(this.dietMsg);

    //   //this.calculateMacroCalGms(this.dietType);
    // }

    // var totalLoad = noOfSessionsInMC+sfLoadiNol;
    // console.log(totalLoad);
    // return totalLoad;

  }

 async editMeal(mealid){

    console.log("meal id",mealid);
    var mealDataEdit =[];
    var mealDetailsEdit:any =[];
    for(let k =0;k<this.finalFoodDataByDate.length;k++){

      if(this.finalFoodDataByDate[k].id === mealid){

        mealDataEdit  = this.finalFoodDataByDate[k].mealData;
        mealDetailsEdit = this.finalFoodDataByDate[k];
        
      }

    }

    //this.nav.push(AddMealPage, {"isEdit":true,"mealId":mealid,"foodItems": mealDataEdit});
    let addMealModal = await this.modalCtrl.create({component:AddmealPage,
                                  componentProps: 
                                  {"isEdit":true,
                                  "mealId":mealid,
                                  "mealCount":this.finalFoodDataByDate.length,
                                  "mealDate":mealDetailsEdit.mealDate,
                                  "mealTime":mealDetailsEdit.mealTime,
                                  "mealName":mealDetailsEdit.mealName,
                                  "foodItems": mealDataEdit,
                                  "fatDayBalGms":this.fatGms,
                                  "proDayBalGms":this.protienGms,
                                  "carbsDayBalGms":this.carbsGms,
                                  "calDayBal":this.calPerDay,
                                  "fatDayBalGmsPercent":this.fatGmsBalancePercent,
                                  "proDayBalGmsPercent":this.protienGmsBalancePercent,
                                  "carbsDayBalGmsPercent":this.carbsGmsBalancePercent,
                                  "calDayBalPercent":this.totalCalBalancePercent}
                                });
    addMealModal.onDidDismiss().then((data) => {
       this.getFoodData();
    });
    addMealModal.present();
  }

 async addMeal(){
   
   // this.nav.push(AddMealPage, {"isEdit":false});
    let addMealModal = await this.modalCtrl.create({component:AddmealPage,
                componentProps:
                 {"isEdit":false,
                 "mealCount":this.finalFoodDataByDate.length,
                 "fatDayBalGms":this.fatGms,
                 "proDayBalGms":this.protienGms,
                 "carbsDayBalGms":this.carbsGms,
                 "calDayBal":this.calPerDay,
                 "fatDayBalGmsPercent":this.fatGmsBalancePercent,
                 "proDayBalGmsPercent":this.protienGmsBalancePercent,
                 "carbsDayBalGmsPercent":this.carbsGmsBalancePercent,
                 "calDayBalPercent":this.totalCalBalancePercent}
                });
    addMealModal.onDidDismiss().then(data => {
     // this.ionViewDidEnter();
      this.getFoodData();
    });
    addMealModal.present();
  
  }

  public backButtonAction(){

      if( this.pageType==='settings'){
        this.nav.navigateForward('tabs/tabs/profile');
       }else{
        this.nav.navigateForward('tabs/tabs/dashboard');
       }
  }
  
  // public openMessanger() {
    // this.intercom.setLauncherVisibility('VISIBLE');
    //this.intercom.displayMessenger();
    // this.intercom.reset().then(() =>
    // {
    //   this.intercom.registerIdentifiedUser({email:"user.email1@gmail.com", userID: "123456"}).then(() =>
    //   {
    //     this.intercom.setLauncherVisibility('VISIBLE');
    //   });      
    // });
    
  // }

  // showintercommessenger() {
  //     let randomnumber = Math.random() * 9804;
  //     let randomnumber1 = randomnumber.toFixed(0);
  //     let emailid = 'raj' + randomnumber1 + '@gmail.com';

  //     console.log('Flow reached here.. 101 ', emailid);
  //     this.intercom.reset().then(() =>
  //       this.intercom.registerIdentifiedUser({ userId: emailid , email: emailid  }).then(() => {
  //         console.log('Flow reached here.. 103 ', randomnumber);
  //         this.intercom.setLauncherVisibility('VISIBLE');
  //         // this.intercom.displayMessageComposerWithInitialMessage('Hello, I need help with Nutrition!')
  //         // this.intercom.setInAppMessageVisibility;
  //         // this.intercom.displayMessenger( );
  //       })
  //     );
  // }
  
  public displayCalendar(){

    var fromDate;
    var toDate;
    toDate = new Date();
    fromDate = new Date();
    toDate.setDate(toDate.getDate() - 1);
    fromDate.setDate(fromDate.getDate() - 10);

    this.calendarCtrl.openCalendar({
      title:"Select Date",
      from:fromDate,
      to:toDate,      
      weekdays:["S","M", "T", "W", "T", "F", "S"]
    })
    .then( (res:any) => { 
      var date = new Date(res.string);
      var todayMealDateServer = date.getFullYear()+"-"+('0' +(date.getMonth()+1)).slice(-2)+"-"+('0' +(date.getDate())).slice(-2);
      console.log(todayMealDateServer);
      this.loadData.stopLoading();
      //console.log("history date",date)
      this.getMealDataServer(todayMealDateServer,true);
      //var pStartDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +  date.getDate();
     

     })
  }
}
