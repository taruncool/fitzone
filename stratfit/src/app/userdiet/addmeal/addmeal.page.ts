import { Component, OnInit, ViewChild  } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController,IonContent } from '@ionic/angular';
import { global } from "../../../app/global";
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FilterfoodPage } from '../filterfood/filterfood.page';

@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.page.html',
  styleUrls: ['./addmeal.page.scss'],
})
export class AddmealPage implements OnInit {
  tokken:any;
  token;
  foodModal;
  selectedFoodItems=[];
  defFood;
  addedmealslist=true;
  countrydata;
	tempcountrydata;
	countrysearch;
	alertmsg;
	foodid;
  items:any=[];
  @ViewChild(IonContent, { static: false }) content: IonContent;
  
  
  
  foodItems= [{id:2,name:"Pineapple",calories:48,protien:0.5,fat:0.12,carbs:12.63,fatPercent:0.91,carbPercent:95.32,protienPercent:3.77},
  {id:3,name:"Pear",calories:96,protien:0.63,fat:0.2,carbs:25.66,fatPercent:0.76,carbPercent:96.87,protienPercent:2.38},
  {id:4,name:"Orange",calories:62,protien:1.23,fat:0.16,carbs:15.39,fatPercent:0.95,carbPercent:91.72,protienPercent:7.33},
  {id:5,name:"Watermelon",calories:30,protien:0.61,fat:0.15,carbs:7.55,fatPercent:1.81,carbPercent:90.85,protienPercent:7.34},
  {id:6,name:"Kiwi",calories:46,protien:0.87,fat:0.4,carbs:11.14,fatPercent:3.22,carbPercent:89.77,protienPercent:7.01},
  {id:7,name:"Peaches",calories:38,protien:0.89,fat:0.24,carbs:9.35,fatPercent:2.29,carbPercent:89.22,protienPercent:8.49},
  {id:8,name:"Litchi",calories:6,protien:0.8,fat:0.04,carbs:1.59,fatPercent:1.65,carbPercent:65.43,protienPercent:32.92},
  {id:9,name:"Sweet lime (mosambi)",calories:32,protien:0.61,fat:0.21,carbs:8.95,fatPercent:2.15,carbPercent:91.61,protienPercent:6.24},
  {id:10,name:"Lime",calories:20,protien:0.61,fat:0.21,carbs:8.95,fatPercent:2.15,carbPercent:91.61,protienPercent:6.24},
  {id:11,name:"Tomato",calories:22,protien:1.08,fat:0.25,carbs:4.82,fatPercent:4.07,carbPercent:78.37,protienPercent:17.56},
  {id:12,name:"Blueberries",calories:57,protien:0.74,fat:0.33,carbs:14.49,fatPercent:2.12,carbPercent:93.12,protienPercent:4.76},
  {id:13,name:"Strawberries",calories:32,protien:0.67,fat:0.3,carbs:7.68,fatPercent:3.47,carbPercent:88.79,protienPercent:7.75},
  {id:14,name:"Fig",calories:30,protien:0.3,fat:0.12,carbs:7.67,fatPercent:1.48,carbPercent:94.81,protienPercent:3.71},
  {id:15,name:"Muskmelon",calories:34,protien:0.84,fat:0.19,carbs:8.16,fatPercent:2.07,carbPercent:88.79,protienPercent:9.14},
  {id:16,name:"Papaya",calories:39,protien:0.61,fat:0.14,carbs:9.81,fatPercent:1.33,carbPercent:92.9,protienPercent:5.78},
  {id:17,name:"Jackfruit",calories:94,protien:1.47,fat:0.3,carbs:24.01,fatPercent:1.16,carbPercent:93.13,protienPercent:5.7},
  {id:18,name:"Cherry",calories:63,protien:1.06,fat:0.2,carbs:16.01,fatPercent:1.16,carbPercent:92.7,protienPercent:6.14},
  {id:19,name:"Coconut meat",calories:354,protien:3.33,fat:33.49,carbs:15.23,fatPercent:64.34,carbPercent:29.26,protienPercent:6.4},
  {id:20,name:"Banana",calories:105,protien:1.29,fat:0.39,carbs:26.95,fatPercent:1.36,carbPercent:94.13,protienPercent:4.51},
  {id:21,name:"Dragon fruit",calories:60,protien:2,fat:1.5,carbs:9,fatPercent:12,carbPercent:72,protienPercent:16},
  {id:22,name:"Plum",calories:46,protien:0.7,fat:0.28,carbs:11.42,fatPercent:2.26,carbPercent:92.1,protienPercent:5.65},
  {id:23,name:"Passion fruit",calories:17,protien:0.4,fat:0.13,carbs:4.21,fatPercent:2.74,carbPercent:88.82,protienPercent:8.44},
  {id:24,name:"Avocado",calories:160,protien:14.66,fat:2,carbs:8.53,fatPercent:7.94,carbPercent:33.86,protienPercent:58.2},
  {id:25,name:"Apricot",calories:17,protien:0.49,fat:0.14,carbs:3.89,fatPercent:3.1,carbPercent:86.06,protienPercent:10.84},
  {id:26,name:"Grapes",calories:69,protien:0.72,fat:0.16,carbs:18.1,fatPercent:0.84,carbPercent:95.36,protienPercent:3.79},
  {id:108,name:"Apple",calories:72,protien:0.3,fat:0.2,carbs:19.6,fatPercent:1,carbPercent:97.51,protienPercent:1.49},
  {id:109,name:"Mango ripe",calories:65,protien:0.51,fat:0.27,carbs:17,fatPercent:1.52,carbPercent:95.61,protienPercent:2.87},
  {id:110,name:"Raw Mango",calories:18,protien:0,fat:0,carbs:5,fatPercent:0,carbPercent:0,protienPercent:0},
  {id:111,name:"Guava",calories:68,protien:2.55,fat:0.95,carbs:14.32,fatPercent:5.33,carbPercent:80.36,protienPercent:14.31},
  {id:112,name:"Custard Apple",calories:94,protien:2.1,fat:0.3,carbs:24,fatPercent:1.14,carbPercent:90.91,protienPercent:7.95},
  {id:113,name:"Chikkoo (sapota)",calories:83,protien:0.44,fat:1.1,carbs:19.96,fatPercent:5.12,carbPercent:92.84,protienPercent:2.05},
  {id:114,name:"Green Olives",calories:41,protien:0.29,fat:4.34,carbs:1.09,fatPercent:75.87,carbPercent:19.06,protienPercent:5.07},
  {id:115,name:"Black Olives",calories:30,protien:0.25,fat:2.7,carbs:1.72,fatPercent:57.82,carbPercent:36.83,protienPercent:5.35},
  {id:116,name:"Raspberries",calories:52,protien:1.2,fat:0.65,carbs:11.94,fatPercent:4.71,carbPercent:86.58,protienPercent:8.7},
  {id:117,name:"Pomegranate",calories:68,protien:0.95,fat:0.3,carbs:17.17,fatPercent:1.63,carbPercent:93.21,protienPercent:5.16},
  {id:118,name:"Mangosteen",calories:55,protien:0.3,fat:0.4,carbs:14,fatPercent:2.72,carbPercent:95.24,protienPercent:2.04},
  {id:119,name:"Grape fruit",calories:41,protien:0.81,fat:0.13,carbs:10.34,fatPercent:1.15,carbPercent:91.67,protienPercent:7.18},
  {id:120,name:"Nectraine",calories:60,protien:1.44,fat:0.44,carbs:14.35,fatPercent:2.71,carbPercent:88.42,protienPercent:8.87},
  {id:121,name:"Strafruit",calories:28,protien:0.95,fat:0.3,carbs:6.12,fatPercent:4.07,carbPercent:83.04,protienPercent:12.89},
  {id:122,name:"Wood apple",calories:134,protien:7,fat:3,carbs:18,fatPercent:10.71,carbPercent:64.29,protienPercent:25},
  {id:123,name:"Rambutan",calories:78,protien:0.62,fat:0.2,carbs:19.88,fatPercent:0.97,carbPercent:96.04,protienPercent:3},
  {id:124,name:"Gooseberries",calories:44,protien:0.88,fat:0.58,carbs:10.18,fatPercent:4.98,carbPercent:87.46,protienPercent:7.56},
  {id:125,name:"Permission",calories:127,protien:0.8,fat:0.4,carbs:34,fatPercent:1.14,carbPercent:96.59,protienPercent:2.27},
  {id:127,name:"Cranberry",calories:46,protien:0.39,fat:0.13,carbs:12.2,fatPercent:1.02,carbPercent:95.91,protienPercent:3.07},
  {id:128,name:"Gojiberry",calories:59,protien:2.4,fat:0.1,carbs:13,fatPercent:0.65,carbPercent:83.87,protienPercent:15.48},
  {id:129,name:"Sugarcane",calories:58,protien:0.16,fat:0.4,carbs:13.11,fatPercent:2.93,carbPercent:95.9,protienPercent:1.17},
  {id:130,name:"Craisins",calories:308,protien:0.07,fat:1.37,carbs:82.36,fatPercent:1.63,carbPercent:98.28,protienPercent:0.08},
  {id:131,name:"Pumpkin",calories:26,protien:1,fat:0.1,carbs:6.5,fatPercent:1.32,carbPercent:85.53,protienPercent:13.16},
  {id:132,name:"Butternut squash",calories:45,protien:1,fat:0.1,carbs:11.69,fatPercent:0.78,carbPercent:91.4,protienPercent:7.82},
  {id:133,name:"Corn",calories:86,protien:3.22,fat:1.18,carbs:19.02,fatPercent:5.04,carbPercent:81.21,protienPercent:13.75}];
  
  isEdit = false;
  mealIdEdit;
  mealDate;
  mealTime;
  mealCount;
  mealName;

  
  temporaryFoodItemsFilter=[];
  selectedFoodItemsFilter=[];

  fatDayBalGms=0;
  proDayBalGms=0;
  carbsDayBalGms=0;
  calDayBal=0;
  fatDayBalGmsPercent=0;
  proDayBalGmsPercent=0;
  carbsDayBalGmsPercent=0;
  calDayBalPercent=0;

  mealCals=0;
  mealFatGmss=0;
  mealProGmss=0;
  mealCarbsGmss=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService: ApiService, public http: HttpClient, 
    public toastCtrl: ToastController, private loadData: LoadData, public modalCtrl: ModalController, 
    private ga:GoogleAnalytics 
  ) {

      this.token = localStorage.getItem('usertoken');
  
  }
  ngOnInit() {
    this.addedmealslist=true;
    this.tokken = localStorage.getItem('usertoken');
   this.isEdit = this.navParams.get("isEdit");

   if(this.isEdit){
    
    this.selectedFoodItems = this.navParams.get("foodItems");
    
    this.mealIdEdit = this.navParams.get("mealId");
    this.mealDate = this.navParams.get("mealDate");
    this.mealTime = this.navParams.get("mealTime");
   
    this.mealName = this.navParams.get("mealName");
   
    console.log(this.selectedFoodItems); 
    console.log("is edit",this.mealIdEdit); 
    console.log("is edit",this.mealName); 

   }

   

   this.mealCount = this.navParams.get("mealCount");
   this.fatDayBalGms = this.navParams.get("fatDayBalGms");
   this.proDayBalGms = this.navParams.get("proDayBalGms");
   this.carbsDayBalGms = this.navParams.get("carbsDayBalGms");

   this.calDayBal = this.navParams.get("calDayBal");

   this.fatDayBalGmsPercent = this.navParams.get("fatDayBalGmsPercent");
   this.proDayBalGmsPercent = this.navParams.get("proDayBalGmsPercent");
   this.carbsDayBalGmsPercent = this.navParams.get("carbsDayBalGmsPercent");
   
   this.calDayBalPercent = this.navParams.get("calDayBalPercent");
   
   this.selectedFoodItemsFilter = this.selectedFoodItems;
    
   console.log("Selected items",this.selectedFoodItemsFilter);
   for(var tc=0;tc<this.foodItems.length;tc++){
     
     this.foodItems[tc]["foodcount"] = 0;
         
     for(var j=0;j<this.selectedFoodItemsFilter.length;j++){
           
          if(this.selectedFoodItemsFilter[j].id==this.foodItems[tc].id){

            this.foodItems[tc]["foodcount"] = this.selectedFoodItemsFilter[j].foodcount;

          }
       
       }
     }

     var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;

    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){

      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

     }

   // this.bmi = this.bmi.toFixed(2);
    this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));
   // for(let i = 0; i < this.foodItems.length; i++){

   // 	this.foodItems[i]["isChecked"] = false;
   // }
   //console.log("All food items",this.foodItems);
  //  for(let n = 0; n < 50; n++) {
  //    this.temporaryFoodItemsFilter.push(this.foodItems[n]);
  //  }
   this.temporaryFoodItemsFilter=this.foodItems;
   this.foodid =1;
   
    
  }

  mealsList() {
    this.addedmealslist=false;
   }

  roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return (Math.round(n) / multiplicator).toFixed(2);
}
  saveEditMeal(){

    if(this.isEdit){

      this.editMeal();

    }else{

      this.saveMeal();
    }
  }

 async editMeal(){

    if(this.selectedFoodItemsFilter.length!==0){

      var jsonFoodData = JSON.stringify(this.selectedFoodItemsFilter);     
      //var finalFoodData:any = [];

   // if(localStorage.getItem('nutritionData')!==""){

     // var foodjson = localStorage.getItem('nutritionData');
     // var finalFoodData = JSON.parse(foodjson);
     // console.log(finalFoodData);
      
      var mealNameA = this.mealName;
      var mealDataEdit =[];

      var mealCal=0;
      var mealFatGms = 0;
      var mealProGms = 0;
      var mealCarbsGms = 0;

      for(let m =0;m<this.selectedFoodItemsFilter.length;m++){

        mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
        mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
        mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
        mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

      }

      var mealCals = parseFloat(this.roundTo(mealCal,2));
      var mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
      var mealProGmss = parseFloat(this.roundTo(mealProGms,2));
      var mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

     

      var jsonFood = {id:this.mealIdEdit,mealJson:{mealName:this.mealName,
        mealDate:this.mealDate,
        mealTime:this.mealTime,
        mealcal:mealCals,
        mealfat:mealFatGmss,
        mealpro:mealProGmss,
        mealcarb:mealCarbsGmss,
        mealData:this.selectedFoodItemsFilter}};

      // for(let k = 0;k<finalFoodData.length;k++){
  
      //   if(finalFoodData[k].id === this.mealIdEdit){
  
      //      finalFoodData[k].mealData = this.selectedFoodItemsFilter;
      //      finalFoodData[k].mealcal = this.mealCals;
      //      finalFoodData[k].mealfat = this.mealFatGmss;
      //      finalFoodData[k].mealpro = this. mealProGmss;
      //      finalFoodData[k].mealcarb = this.mealCarbsGmss;

      //      jsonFood = {id:this.mealIdEdit,mealJson:finalFoodData[k]};
          
      //   }
  
      // }
      //finalFoodData.push({id:finalFoodData.length+1,mealName:mealNameA,mealData:this.selectedFoodItems});
      // var jsonFoodData = JSON.stringify(finalFoodData);

      // console.log(jsonFoodData);

      // localStorage.setItem('nutritionData',jsonFoodData);

      console.log(jsonFood);
      this.saveMealToServer(jsonFood);
      //this.navCtrl.push(DietprofilePage); 
      
    

   // }
  
      console.log("Check on edit",localStorage.getItem('nutritionData'));
  }else{
    this.loadData.stopLoading();
       let toast = await this.toastCtrl.create({
         message: "Please add your meal and try again",
        duration: 3000
      });
      toast.present();
  }
  
  }

 async saveMeal(){

    var today = new Date();
    var todayMealDate = ('0' +(today.getDate())).slice(-2)+"-"+('0' +(today.getMonth()+1)).slice(-2)+"-"+today.getFullYear();
    var mealtime = today.getTime();
    console.log(todayMealDate);
    console.log(mealtime);
    var mealCal=0;
    var mealFatGms = 0;
    var mealProGms = 0;
    var mealCarbsGms = 0;

    if(this.selectedFoodItemsFilter.length!==0){

        var jsonFoodData = JSON.stringify(this.selectedFoodItemsFilter);
       
        console.log(this.selectedFoodItemsFilter);

        for(let m =0;m<this.selectedFoodItemsFilter.length;m++){

          mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
          mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
          mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
          mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);


        }

        var mealCals = parseFloat(this.roundTo(mealCal,2));
        var mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
        var mealProGmss = parseFloat(this.roundTo(mealProGms,2));
        var mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

       // var finalFoodData:any = [];
        
        console.log(localStorage.getItem('nutritionData'));
        
      if(this.mealCount!==0){

        // var foodjson = localStorage.getItem('nutritionData');
        // var finalFoodData = JSON.parse(foodjson);
        // console.log(finalFoodData);
        var jsonFoodDataMeala = [];
        
        // for(var i =0;i<this.selectedFoodItems.length;i++){

        //   jsonFoodDataMeala.push(this.selectedFoodItems[i]);

        // }

        // var mealNo = 0;
        // if(finalFoodData === null){

        //   mealNo = 0;
        //   var finalFoodData:any = [];
        // }else{

        //   mealNo = finalFoodData.length;

        // }

        var mealNameA = "Meal " +(this.mealCount+1);
        console.log(this.mealCount);
        console.log(this.mealCount+1);        // finalFoodData.push({mealName:mealNameA,mealDate:todayMealDate,mealTime:mealtime,
        //   mealcal:mealCals,mealfat:mealFatGmss,mealpro:mealProGmss,mealcarb:mealCarbsGmss,
        //   mealData:this.selectedFoodItemsFilter});

          var jsonFood = {mealJson:{mealName:this.mealName,mealDate:todayMealDate,mealTime:mealtime,
            mealcal:mealCals,mealfat:mealFatGmss,mealpro:mealProGmss,mealcarb:mealCarbsGmss,
            mealData:this.selectedFoodItemsFilter}};
          
        //var jsonFoodData = JSON.stringify(finalFoodData);
        
        //console.log(jsonFoodData);

        //localStorage.setItem('nutritionData',jsonFoodData);


        console.log(jsonFoodData);
        this.saveMealToServer(jsonFood);
        
        //this.navCtrl.push(DietprofilePage); 
        
        // let currentIndex = this.navCtrl.getActive().index;
        // this.navCtrl.push(DietprofilePage).then(() => {
        // this.navCtrl.remove(currentIndex);
        // });

      }else{

        var mealNameA = "Meal " +1;
        // finalFoodData.push({id:finalFoodData.length+1,
        //   mealName:mealNameA,
        //   mealDate:todayMealDate,mealTime:mealtime,
        //   mealcal:mealCals,mealfat:mealFatGmss,mealpro:mealProGmss,mealcarb:mealCarbsGmss,
        //   mealData:this.selectedFoodItemsFilter});
        // var jsonFoodDataMeal = JSON.stringify(finalFoodData);
        // localStorage.setItem('nutritionData',jsonFoodDataMeal);

        var jsonFood = {mealJson:{mealName:this.mealName,mealDate:todayMealDate,mealTime:mealtime,
          mealcal:mealCals,mealfat:mealFatGmss,mealpro:mealProGmss,mealcarb:mealCarbsGmss,
          mealData:this.selectedFoodItemsFilter}};
        //this.viewCtrl.dismiss(); 

        this.saveMealToServer(jsonFood);
        
        //this.navCtrl.push(DietprofilePage); 
        // let currentIndex = this.navCtrl.getActive().index;
        // this.navCtrl.push(DietprofilePage).then(() => {
        //   this.navCtrl.remove(currentIndex);
        // });
      }
    
      console.log("Check on save",localStorage.getItem('nutritionData'));
 
    }else{
      this.loadData.stopLoading();
         let toast = await this.toastCtrl.create({
           message: "Please add your meal and try again",
          duration: 3000
        });
        toast.present();
    }
    //localStorage.setItem('nutritionData',jsonFoodData);

  }

  async saveMealToServer(mealInfoJson){

    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      this.apiService.addmeal(mealInfoJson,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
          if(res.success){
            
                this.loadData.stopLoading();
                this.toastmsg(res.message);
                // this.toastmsg("Something went wrong! Please try again");
                // let currentIndex = this.navCtrl.getActive().index;
                this.navCtrl.navigateBack('/userdiet').then(() => {
                  // this.navCtrl.remove(currentIndex);
                });
                this.modalCtrl.dismiss();
              
          }else{
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try after some time");
          }
        },(err) =>{
          this.loadData.stopLoading();
          if(err.status === 403){
              this.loadData.forbidden();
              this.navCtrl.navigateForward('/login');
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

  async addFoodItem(){

    this.foodModal = await this.modalCtrl.create({
      component : FilterfoodPage,
      componentProps:{"fooditems": this.selectedFoodItemsFilter }
    });
    this.foodModal.present();
    this.foodModal.onDidDismiss().then((data)=>{
      if(data !== undefined){
        console.log(data);
        this.selectedFoodItems = data;
      //   for(var tc=0;tc<this.foodItems.length;tc++){
      //     for(var tj=0;tj<this.selectedFoodItems.length;tj++){
      //     if(this.selectedFoodItems[tj].id==this.foodItems[tc].id){
      //       this.defFood=this.foodItems[tc].name+' ('+this.foodItems[tc].id+')';
      //     }
      //   }}
       }
    });
  }


  async validationAlerts(alertMsg){
    let toast = await this.toastCtrl.create({
      message: alertMsg,
      duration: 5000
    });toast.present();
  }

 

  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }


  public dismiss(){
    this.modalCtrl.dismiss(); 
  }
  dishes(){
    this.addedmealslist=true;
  }
getItems(ev) {
  this.alertmsg =false;
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.temporaryFoodItemsFilter = this.foodItems.filter((item) => {
    return (item.name.toLowerCase().startsWith(val.toLowerCase()));
  });
    if(this.foodItems.length ===0){
    this.alertmsg =true;
    this.addedmealslist=true;
    this.alertmsg ="Couldn't find any results";
    }else{
    this.alertmsg =false;
    this.addedmealslist=false;
    }
  }
  if(val===''){
    this.temporaryFoodItemsFilter = this.foodItems;
    this.addedmealslist=true;
  }
}

public addFood(foodItem){

  // if(foodItem.isChecked == false){

  // 	foodItem.isChecked = true;
  // }else{

  // 	foodItem.isChecked = false;
  // } 
 
  if(foodItem.foodcount===null){
    foodItem["foodcount"]=0;
  }
  
  console.log("Food item check",foodItem.foodcount);
  if(foodItem.foodcount === 0){
    
    foodItem.foodcount = 1;
    this.selectedFoodItemsFilter.push(foodItem);
    var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;
    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){
      if(this.selectedFoodItemsFilter[m].id==foodItem.id){
        this.selectedFoodItemsFilter[m].foodcount = foodItem.foodcount;
      }
      console.log(this.selectedFoodItemsFilter[m].foodcount);
      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      console.log("protien value normal",this.selectedFoodItemsFilter[m].protien);
      console.log("protien value parsed",parseFloat(this.selectedFoodItemsFilter[m].protien));
      mealProGms += (parseFloat(this.selectedFoodItemsFilter[m].protien) * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);


     }

     this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));;
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

  }else if(foodItem.foodcount > 0){

    foodItem.foodcount = foodItem.foodcount + 1;
    console.log(foodItem.foodcount);
    var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;
    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){
      if(this.selectedFoodItemsFilter[m].id==foodItem.id){
        this.selectedFoodItemsFilter[m].foodcount = foodItem.foodcount;
      }
      console.log(this.selectedFoodItemsFilter[m].foodcount);
      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      mealProGms += (parseFloat(this.selectedFoodItemsFilter[m].protien) * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

     }

     this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

    
  }

  console.log("Selected Food items",this.selectedFoodItemsFilter);
  
}

public removeFoodItem(foodItem){
 
  if(foodItem.foodcount===null){
    foodItem["foodcount"]=0;
  }

  if(foodItem.foodcount === 1){

    for(var j=0;j<this.selectedFoodItemsFilter.length;j++){
      
     if(this.selectedFoodItemsFilter[j].id==foodItem.id){
      foodItem.foodcount = 0;
      this.selectedFoodItemsFilter.splice(j,1);

      }
  
    }
    var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;
    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){
      if(this.selectedFoodItemsFilter[m].id==foodItem.id){
        this.selectedFoodItemsFilter[m].foodcount = foodItem.foodcount;
      }
      console.log(this.selectedFoodItemsFilter[m].foodcount);
      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

     }

     this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

  }else if(foodItem.foodcount>1){

    foodItem.foodcount = foodItem.foodcount - 1;
    var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;
    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){
      if(this.selectedFoodItemsFilter[m].id==foodItem.id){
        this.selectedFoodItemsFilter[m].foodcount = foodItem.foodcount;
      }
      console.log(this.selectedFoodItemsFilter[m].foodcount);
      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

     }

     this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));

  }

  console.log("Selected Food items",this.selectedFoodItemsFilter);
}


public removeFullFoodItem(foodItem){
  
      var mealCal=0,mealFatGms=0,mealProGms=0,mealCarbsGms=0;
      if(foodItem.foodcount===null){
         foodItem["foodcount"]=0;
      }


    for(var j=0;j<this.selectedFoodItemsFilter.length;j++){
      
     if(this.selectedFoodItemsFilter[j].id==foodItem.id){
      
      foodItem.foodcount = 0;
      this.selectedFoodItemsFilter.splice(j,1);

      }
  
    }

    for(let m =0;m<this.selectedFoodItemsFilter.length;m++){

      mealCal += (this.selectedFoodItemsFilter[m].calories * this.selectedFoodItemsFilter[m].foodcount);
      mealFatGms += (this.selectedFoodItemsFilter[m].fat * this.selectedFoodItemsFilter[m].foodcount);
      mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
      mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);

     }

     this.mealCals = parseFloat(this.roundTo(mealCal,2));
     this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
     this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
     this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));
 
}

public searchCountry(countrysearch){
    /*var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', this.token);
  var creds= {countryname:countrysearch,appreq:1};
  this.http.post(global.baseURL + 'stratadmin/countrySearch/', creds, { headers: headers })
  .subscribe(response => {
    this.countrydata = response.json();
    this.alertmsg =false;
    if(this.countrydata.length ==0){
      this.alertmsg =true;
      this.alertmsg ="Couldn't find any results";
    }
   });*/
}

public submit(){
  //console.log(this.phcode);
  this.modalCtrl.dismiss(this.selectedFoodItemsFilter);
}

}
