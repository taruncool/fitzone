import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { HttpClient } from '@angular/common/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-addweightbmi',
  templateUrl: './addweightbmi.page.html',
  styleUrls: ['./addweightbmi.page.scss'],
})
export class AddweightbmiPage implements OnInit {
  token;
	countrydata;
	tempcountrydata;
	countrysearch;
	alertmsg;
	foodid;
	items:any=[];

	userId;
  weight;
	weightunit;
	
	prompt;
  s3Url;
  avatar;
  coverImage;
  firstname;
  lastname;
  currencyType;
 
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

	foodItems=[{id:1,name:'Apple',calories:72,fat:0.23,carbs:19.06,protien:0.36, fatPercent:3,carbPercent:95,protienPercent:2},
	{id:2,name:'Banana',calories:89,fat:0.33,carbs:22.84,protien:1.09, fatPercent:3,carbPercent:93,protienPercent:4},
	{id:3,name:'Mango',calories:135,fat:0.56,carbs:35.19,protien:1.06, fatPercent:3,carbPercent:94,protienPercent:3},
	{id:4,name:'Papaya - One Cup Mashed',calories:90,fat:0.32,carbs:22.56,protien:1.40, fatPercent:3,carbPercent:91,protienPercent:6},
	{id:5,name:'Carrot',calories:30,fat:0.32,carbs:22.56,protien:1.4, fatPercent:3,carbPercent:91,protienPercent:6},
	{id:6,name:'Cucumber',calories:45,fat:0.33,carbs:10.93,protien:1.96, fatPercent:5,carbPercent:80,protienPercent:14},
 	{id:7,name:'Tea - with milk and sugar',calories:30,fat:0.82,carbs:4.97,protien:0.93, fatPercent:24,carbPercent:64,protienPercent:12},
	{id:8,name:'Roti',calories:106,fat:0.52,carbs:22.32,protien:3.84, fatPercent:4,carbPercent:82,protienPercent:14},
	{id:9,name:'Naan',calories:137,fat:5.1,carbs:18.8,protien:3.74, fatPercent:34,carbPercent:55,protienPercent:11},
	{id:10,name:'Rajma',calories:333,fat:0.83,carbs:60.01,protien:23.58, fatPercent:2,carbPercent:70,protienPercent:28},
	{id:11,name:'Paratha',calories:260,fat:8.99,carbs:38.94,protien:5.16, fatPercent:31,carbPercent:61,protienPercent:8},
	{id:12,name:'Ladys Finger - 100gms',calories:26,fat:0.2,carbs:4.5,protien:1.5, fatPercent:7,carbPercent:70,protienPercent:23},
	{id:13,name:'Rice - 1 cup',calories:204,fat:0.44,carbs:44.08,protien:4.2, fatPercent:2,carbPercent:89,protienPercent:9},
	{id:14,name:'Chicken Breast',calories:282,fat:6.09,carbs:0,protien:30.76, fatPercent:21,carbPercent:0,protienPercent:79},
	{id:15,name:'Mutton/Lamb chop 200gms',calories:342,fat:26.56,carbs:0,protien:24.01, fatPercent:71,carbPercent:0,protienPercent:29},
	{id:16,name:'Chicken Shawarma',calories:517,fat:6.31,carbs:76.55,protien:35.83, fatPercent:11,carbPercent:60,protienPercent:28},
	{id:17,name:'Egg',calories:74,fat:4.97,carbs:0.38,protien:6.29, fatPercent:63,carbPercent:2,protienPercent:35},
	{id:18,name:'Chicken Biryani',calories:348,fat:9.82,carbs:48.07,protien:15.9, fatPercent:26,carbPercent:56,protienPercent:18},
	{id:19,name:'Vegitable Biryani',calories:318,fat:6.19,carbs:57.17,protien:7.75, fatPercent:18,carbPercent:73,protienPercent:10},
	{id:20,name:'Dal - 1 cup',calories:198,fat:6.32,carbs:26.18,protien:10.36, fatPercent:28,carbPercent:52,protienPercent:20},
	{id:21,name:'Whole Wheat Bread - 1 slice',calories:69,fat:1.18,carbs:12.91,protien:2.72, fatPercent:14,carbPercent:71,protienPercent:15}];

	temporaryFoodItems=[];
	selectedFoodItems=[];

	isWeightShow = true;
	isDietShow = false;	

		constructor(public navCtrl: NavController, 
			public alertCtrl:AlertController, 
			public toastCtrl: ToastController,private apiService: ApiService, 
			private loadData: LoadData, private ga: GoogleAnalytics, 
		 	public modalCtrl: ModalController, 
			public params: NavParams, public http: HttpClient){

				this.token = localStorage.getItem('usertoken');
				console.log("All food items",this.foodItems);
				this.temporaryFoodItems=this.foodItems;
				this.foodid = 1;

			}
		
  ngOnInit() {
    //this.ga.trackView('profile');
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
			
			if(this.subscriptionplanid !='' && this.subscriptionplanid !=null && this.subscriptionplanid !=undefined){
				this.plancheck =true;
			}else if(this.futureplanid !='' && this.futureplanid !=null && this.futureplanid !=undefined){
				this.plancheck =true;
			}else{
				this.plancheck =false;
			}
	
			//converting (height)cm to feet,ins
			this.calculateBmi();
		 
  }
  calculateBmi(){

    if(this.weightunit ==="kgs"){
      this.weight = parseInt(this.weight).toFixed(0);
      this.weightD =  this.weight;
    }else{
      this.weight = parseInt(this.weight).toFixed(0);
      this.weightD =  Math.round(( this.weight) / 2.2046)
    }

    this.dietType="DtMc";
    if(localStorage.getItem('dietType') === "" || localStorage.getItem('dietType') === null){

      this.dietType="DtMc";

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


  public dismiss(){
    this.modalCtrl.dismiss(); 
  }

getItems(ev) {
  this.alertmsg =false;
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.foodItems = this.temporaryFoodItems.filter((item) => {
    return (item.name.toLowerCase().startsWith(val.toLowerCase()));
    })
    if(this.foodItems.length ===0){
    this.alertmsg =true;
    this.alertmsg ="Couldn't find any results";
    }else{
    this.alertmsg =false;
    }
  }
  if(val===''){
    this.foodItems = this.temporaryFoodItems;
  }
}

public onChangeDtGoal(dtGoal){

  console.log("Diet goal",dtGoal);
  localStorage.setItem('dietGoal',dtGoal);

}

public onChangeDtType(dtType){

  console.log("Diet Type",dtType);
  localStorage.setItem('dietType',dtType);

}

saveDietType(){

  this.modalCtrl.dismiss(); 
  // this.modalCtrl.create({component:DietprofilePage,
  //   componentProps:{"page":2}
  // });
}

async updateMetrics(){

  if(localStorage.getItem('internet')==='online'){

    var headers = new Headers();
    var userInfo = {"id":parseInt(this.userId),"userInf":{"weightM":this.weightunit,"weight":this.weight}}
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    // this.http.post(global.baseURL + 'subscriber/fitnessprofile/', userInfo, { headers: headers })
    // .subscribe(response => {
    this.apiService.updateTmaxData(userInfo,this.token).subscribe((response)=>{
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      localStorage.setItem('weightunit',this.weightunit);
      localStorage.setItem('weight',this.weight);
      
      this.isWeightShow = false;
      this.isDietShow = true;	

      localStorage.setItem('micropopupon','1');


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
}
