import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { ViewmealPage } from '../viewmeal/viewmeal.page';


@Component({
  selector: 'app-diethistory',
  templateUrl: './diethistory.page.html',
  styleUrls: ['./diethistory.page.scss'],
})
export class DiethistoryPage implements OnInit {
  s3Url:any;
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

  fooditem;
  defFood;
  finalFoodData:any=[];
  finalFoodDataByDate:any=[];
  mealList;
  date;

  fatGmsIntake = 0;
  protienGmsIntake = 0;
  carbsGmsIntake = 0;
  calIntake = 0;

  totalCalBalance;
  totalCalBalancePercent;

  fatGmsBalancePercent;
  protienGmsBalancePercent;
  carbsGmsBalancePercent;

  constructor(public nav: NavController, public navParams: NavParams, public toastCtrl: ToastController,private loadData: LoadData,private ga: GoogleAnalytics, public modalCtrl: ModalController) {
  }

  ngOnInit() {
        //this.ga.trackView('profile');
    //this.ga.setAllowIDFACollection(true);
    this.finalFoodDataByDate = [];
    this.s3Url = global.s3URL;
    this.mealList = this.navParams.get("json");

    this.date = this.navParams.get("date");
    
    this.fatCal = this.navParams.get("fatCal");
    this.fatGms = this.navParams.get("fatGms");

    this.protienCal = this.navParams.get("protienCal");
    this.protienGms = this.navParams.get("protienGms");

    this.carbsCal = this.navParams.get("carbsCal");
    this.carbsGms = this.navParams.get("carbsGms");

    this.fatPercent = this.navParams.get("fatPercent");
    this.protienPercent = this.navParams.get("protienPercent");
    this.carbsPercent = this.navParams.get("carbsPercent");

    this.calPerDay = this.navParams.get("calPerDay");

    console.log(this.mealList);

    for(let k =0;k<this.mealList.length;k++){

      var foodList = JSON.parse(this.mealList[k].mealJson);
        
      this.finalFoodDataByDate.push({id:this.mealList[k].id,
        mealName:foodList.mealName,
        mealDate:foodList.mealDate,
        mealTime:foodList.mealTime,
        mealcal:foodList.mealcal,
        mealfat:foodList.mealfat,
        mealpro:foodList.mealpro,
        mealcarb:foodList.mealcarb,
        mealData:foodList.mealData});

    }

    setTimeout(() => {
      this. macrosCalGms();
     },600);
   
    // this.getFoodData();
  }

  getFoodData(){

    var foodjson = localStorage.getItem('nutritionData');
    // console.log("nutrition data ionview did enter",this.finalFoodData);
    if(foodjson !== ""){

      this.finalFoodData = JSON.parse(foodjson);
       
      var today = new Date();
      var dayg = this.getDay(today,1);
      console.log(dayg);
      var todayMealDate = ('0' +(today.getDate())).slice(-2)+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+today.getFullYear();
      var mealtime = today.getTime();

      // console.log(todayMealDate);
      // console.log(mealtime);
      // console.log("nutrition data ionview did enter",this.finalFoodData);
      // this.finalFoodData.filter(
      //   meal => new Date(meal.mealTime).getDate() === this.store.id);
      var dayid = 0;
      for(let i =0;i<this.finalFoodData.length;i++){
        var mealDate = new Date(this.finalFoodData[i].mealTime);
        var todayDate = new Date(mealtime);
        var listDate = this.finalFoodData.filter(meal => new Date(meal.mealTime).getDate() === mealDate.getDate());
        
        if(i>0){

          var listDateTwo = this.finalFoodDataByDate.filter(meal => new Date(meal.dayInMillis).getDate() === mealDate.getDate());
          if(listDateTwo.length>0){
            console.log("Already added to day list ");
          }else{

            this.finalFoodDataByDate.push({id:dayid+1,dayDate:this.finalFoodData[i].mealDate,
              dayName:"Meals on day "+this.finalFoodData[i].mealDate,
              dayInMillis:this.finalFoodData[i].mealTime,mealData:listDate})
           
            dayid++;
          }


        }else{

          this.finalFoodDataByDate.push({id:dayid+1,dayDate:this.finalFoodData[i].mealDate,
            dayName:"Meals on day"+this.finalFoodData[i].mealDate,dayInMillis:this.finalFoodData[i].mealTime,mealData:listDate});
          
          dayid++;

        }
       
        console.log("finaldatebymeals", this.finalFoodDataByDate);

      }
      // for(let k =0;k<this.finalFoodData.length;k++){
        
      //   var mealDate = new Date(this.finalFoodData[k].mealTime);
      //   var todayDate = new Date(mealtime);

      //   console.log(mealDate);
      //   console.log(todayDate);
        
        
      //     // for(let j =0;j<this.finalFoodData.length;j++){

      //     // var mealDatePrev = new Date(this.finalFoodData[j].mealTime);
      //     // if(mealDate.getDate() == mealDatePrev.getDate()){
          
      //     //   console.log("past date ");
      //     //   this.finalFoodDataByDate.push({id:dayid+1,DayName:"Meals on day"+this.finalFoodData[],mealDate:todayMealDate,mealTime:mealtime,mealData:this.selectedFoodItems})
      //     //   }

      //     // }
     
      //   //if(mealDate.getDate() <= todayDate.getDate()){
      //     var listDate = this.finalFoodData.filter(meal => new Date(meal.mealTime).getDate() === mealDate.getDate());
         
      //     if(k>0){
            
      //       for(let j =0;j<this.finalFoodDataByDate.length;j++){

             
            
            
      //        // if(mealDate.getDate() == mealDatePrev.getDate()){
              
      //          if(this.finalFoodData[k].mealDate === this.finalFoodDataByDate[j].dayDate){
          
      //           console.log("Already added to day list ");
      
      //           }else{
      //             if(j>0){

      //               var mealDatePrev = new Date(this.finalFoodDataByDate[j].dayInMillis);
      //               var listDateTwo = this.finalFoodData.filter(meal => new Date(meal.mealTime).getDate() === mealDatePrev.getDate());
      //               console.log(this.finalFoodData[k].mealDate);
      //               console.log(this.finalFoodDataByDate[j].dayDate);
      //               if(listDateTwo.length>0){
                  
      //                 console.log("Already added to day list ");
                     
      //               }else{
      
      //                this.finalFoodDataByDate.push({id:dayid+1,dayDate:this.finalFoodData[k].mealDate,dayName:"Meals on day "+this.finalFoodData[k].mealDate,dayInMillis:this.finalFoodData[k].mealTime,mealData:listDate})
           
      //                dayid++;

      //               }
      //             }else{
                  
      //               this.finalFoodDataByDate.push({id:dayid+1,dayDate:this.finalFoodData[k].mealDate,dayName:"Meals on day "+this.finalFoodData[k].mealDate,dayInMillis:this.finalFoodData[k].mealTime,mealData:listDate})
           
      //               dayid++;

      //             }
                 
              
      //         }
           
      //       }
  
      //     }else{

      //       console.log("past date "+mealDate.getDate());

      //      //var listDate = this.finalFoodData.filter(meal => new Date(meal.mealTime).getDate() === mealDate.getDate());

      //            this.finalFoodDataByDate.push({id:dayid+1,dayDate:this.finalFoodData[k].mealDate,dayName:"Meals on day"+this.finalFoodData[k].mealDate,dayInMillis:this.finalFoodData[k].mealTime,mealData:listDate})
          
      //            dayid++;

      //            console.log("finaldatebymeals", this.finalFoodDataByDate);
      //     }
         

      //   // }else{

      //      console.log("finaldatebymeals", this.finalFoodDataByDate);
      //    //}
      
      //  }

       console.log("finaldatebymeals", this.finalFoodDataByDate);
    }
  }

  getDay(datems,type){//type 1 is long type 2 is short

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekdayshort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if(type == 1){

      return weekdays[datems.getDay()];

    }else{

      return weekdayshort[datems.getDay()];
    }

   

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
  
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }


  // editMeal(mealid){

  //   var mealDataEdit =[];
  //   for(let k =0;k<this.finalFoodDataByDate.length;k++){

  //     if(this.finalFoodDataByDate[k].id === mealid){

  //       mealDataEdit  = this.finalFoodDataByDate[k].mealData;
        
  //     }

  //   }

  //   //this.nav.push(AddMealPage, {"isEdit":true,"mealId":mealid,"foodItems": mealDataEdit});
  //   let addMealModal = this.modalCtrl.create(ViewMealPage, {"isEdit":false,"mealId":mealid,"foodItems": mealDataEdit});
  //   addMealModal.onDidDismiss(data => {
  //     this.ionViewDidEnter();
  //   });
  //   addMealModal.present();
  // }

 async viewMeal(mealid){

    var mealDataEdit =[];
    for(let k =0;k<this.finalFoodDataByDate.length;k++){

      if(this.finalFoodDataByDate[k].id === mealid){

        mealDataEdit  = this.finalFoodDataByDate[k].mealData;
        
      }

    }

    //this.nav.push(AddMealPage, {"isEdit":true,"mealId":mealid,"foodItems": mealDataEdit});
    let viewMealModal = await this.modalCtrl.create({
      component:ViewmealPage, 
      componentProps:{"isEdit":false,"mealId":mealid,"foodItems": mealDataEdit}
    });
     viewMealModal.onDidDismiss().then(data => {
       this.ngOnInit();
      // this.getFoodData();
     });
     viewMealModal.present();
  }

  public backButtonAction(){
    this.modalCtrl.dismiss();
  }
  
  roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
  }
  public macrosCalGms(){

    this.fatCalBalance = 0;
    this.carbsCalBalance = 0
    this.protienCalBalance = 0;

    this.fatGmsBalance = 0;
    this.carbsGmsBalance = 0;
    this.protienGmsBalance = 0;

    this.fatCal = parseFloat(this.roundTo(this.fatPercent * this.calPerDay,2));
    this.fatGms = parseFloat(this.roundTo((this.fatCal/this.fatCalGm),2));

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

    console.log("fatpercent",this.fatGmsBalancePercent);
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
    
    this.fatGmsIntake = parseFloat(this.roundTo(this.fatGms - this.fatGmsBalance,2));
    this.carbsGmsIntake = parseFloat(this.roundTo(this.carbsGms - this.carbsGmsBalance,2));
    console.log(this.protienGms,this.protienGmsBalance);
    this.protienGmsIntake = parseFloat(this.roundTo(this.protienGms - this.protienGmsBalance,2));

    this.calIntake = this.calPerDay - this.totalCalBalance;

    console.log(this.fatGmsIntake,this.carbsGmsIntake,this.protienGmsIntake,this.calIntake)
  }

}
