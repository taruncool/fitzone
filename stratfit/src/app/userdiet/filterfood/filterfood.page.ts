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

	foodItems=[{id:2,name:"Pineapple",calories:48,protien:0.5,fat:0.12,carbs:12.63,fatPercent:0.91,carbPercent:95.32,protienPercent:3.77},
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
