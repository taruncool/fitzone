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
  dishName;
	foodid;
  items:any=[];
  @ViewChild(IonContent, { static: false }) content: IonContent;
  
  
  
  foodItems= [];
  
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
  rows = 50;
  page = 1;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiService: ApiService, public http: HttpClient, 
    public toastCtrl: ToastController, private loadData: LoadData, public modalCtrl: ModalController, 
    private ga:GoogleAnalytics 
  ) {

      this.token = localStorage.getItem('usertoken');
  
  }
  ngOnInit() {
    this.loadData.startLoading();
    this.tokken = localStorage.getItem('usertoken');
    this.apiService.getAllFood(this.tokken,{"rows":this.rows,"page":this.page}).subscribe((response)=>{
      
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      this.foodItems = res.message;
      this.addedmealslist=true;
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
       if(this.selectedFoodItemsFilter.length > 0) {
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
            mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
            mealCarbsGms += (this.selectedFoodItemsFilter[m].carbs * this.selectedFoodItemsFilter[m].foodcount);
      
           }
           this.mealCals = parseFloat(this.roundTo(mealCal,2));
           this.mealFatGmss = parseFloat(this.roundTo(mealFatGms,2));
           this.mealProGmss = parseFloat(this.roundTo(mealProGms,2));
           this.mealCarbsGmss = parseFloat(this.roundTo(mealCarbsGms,2));
         }
    
       } else {
         for(var tc=0;tc<this.foodItems.length;tc++){           
           this.foodItems[tc]["foodcount"] = 0;
         }
       }
       this.temporaryFoodItemsFilter=this.foodItems;
       console.log(this.temporaryFoodItemsFilter);
       this.foodid =1;
       this.loadData.stopLoading();
    },(err) =>{
      this.loadData.stopLoading();
        this.toastmsg("Unable to process your request. Please try again");
      if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
      }
    })

    setTimeout(() => {
        this.loadData.stopLoading();
        },1000);
    
   
    
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
        mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
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
          mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
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
      //this.loadData.startLoading();
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
  var val = this.dishName;
  //this.loadData.startLoading();
  if(val.length > 2) {
    this.apiService.getAllFood(this.tokken, {"name":val}).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        this.temporaryFoodItemsFilter = res.message;
        for(var tc=0;tc<this.temporaryFoodItemsFilter.length;tc++){           
           this.temporaryFoodItemsFilter[tc]["foodcount"] = 0;
         }
        //this.loadData.stopLoading();
      },(err) =>{
        this.loadData.stopLoading();
          this.toastmsg("Unable to process your request. Please try again");
        if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
        }
      })
  }

  // this.alertmsg =false;
  // var val = ev.target.value;

  // // if the value is an empty string don't filter the items
  // if (val && val.trim() != '') {
  //   this.temporaryFoodItemsFilter = this.foodItems.filter((item) => {
  //   return (item.name.toLowerCase().startsWith(val.toLowerCase()));
  // });
  //   if(this.foodItems.length ===0){
  //   this.alertmsg =true;
  //   this.addedmealslist=true;
  //   this.alertmsg ="Couldn't find any results";
  //   }else{
  //   this.alertmsg =false;
  //   this.addedmealslist=false;
  //   }
  // }
  // if(val===''){
  //   this.temporaryFoodItemsFilter = this.foodItems;
  //   this.addedmealslist=true;
  // }
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
      console.log("protein value normal",this.selectedFoodItemsFilter[m].protein);
      console.log("protein value parsed",parseFloat(this.selectedFoodItemsFilter[m].protein));
      mealProGms += (parseFloat(this.selectedFoodItemsFilter[m].protein) * this.selectedFoodItemsFilter[m].foodcount);
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
      mealProGms += (parseFloat(this.selectedFoodItemsFilter[m].protein) * this.selectedFoodItemsFilter[m].foodcount);
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
      mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
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
      mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
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
      mealProGms += (this.selectedFoodItemsFilter[m].protein * this.selectedFoodItemsFilter[m].foodcount);
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
