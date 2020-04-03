import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import { LoadData } from '../../../providers/loaddata';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filterfood',
  templateUrl: './filterfood.page.html',
  styleUrls: ['./filterfood.page.scss'],
})
export class FilterfoodPage implements OnInit {
  token;
	countrydata;
	tempcountrydata;
	countrysearch;
	alertmsg;
	foodid;
	items:any=[];

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

    constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public http: HttpClient){
		this.token = localStorage.getItem('usertoken');
		this.selectedFoodItems = params.get("fooditems");
			console.log("selected items",this.selectedFoodItems);
		for(var tc=0;tc<this.foodItems.length;tc++){
			this.foodItems[tc]["isChecked"] = false;
          for(var j=0;j<this.selectedFoodItems.length;j++){
						
          if(this.selectedFoodItems[j].id==this.foodItems[tc].id){
						this.foodItems[tc]["isChecked"] = true;
					}
				
				}
			}
		// for(let i = 0; i < this.foodItems.length; i++){

		// 	this.foodItems[i]["isChecked"] = false;
		// }
		console.log("All food items",this.foodItems);

		this.temporaryFoodItems=this.foodItems;
		this.foodid =1;
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

	public checkEvent(foodItem){

		// if(foodItem.isChecked == false){

		// 	foodItem.isChecked = true;
		// }else{

		// 	foodItem.isChecked = false;
		// } 

		console.log("Food item check",foodItem.isChecked);
		if(foodItem.isChecked){
			
			this.selectedFoodItems.push(foodItem);

		}else{

		  for(var j=0;j<this.selectedFoodItems.length;j++){
				
				if(this.selectedFoodItems[j].id==foodItem.id){
			
					this.selectedFoodItems.splice(j,1);

				}
			
			}
		}

		console.log("Selected Food items",this.selectedFoodItems);
		
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
		this.modalCtrl.dismiss(this.selectedFoodItems);
	}
  ngOnInit() {
  }

}
