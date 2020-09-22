import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
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

  countrydata;
	tempcountrydata;
	countrysearch;
	alertmsg;
	foodid;
  items:any=[];
  
  foodItems=[{"id":2,"name":"Pineapple","calories":"48","protein":"0.5","fat":"0.12","carbs":"12.63","fatPercent":0.91,"carbPercent":95.32,"proteinPercent":3.77},
{"id":3,"name":"Pear","calories":"96","protein":"0.63","fat":"0.2","carbs":"25.66","fatPercent":0.76,"carbPercent":96.87,"proteinPercent":2.38},
{"id":4,"name":"Orange","calories":"62","protein":"1.23","fat":"0.16","carbs":"15.39","fatPercent":0.95,"carbPercent":91.72,"proteinPercent":7.33},
{"id":5,"name":"Watermelon","calories":"30","protein":"0.61","fat":"0.15","carbs":"7.55","fatPercent":1.81,"carbPercent":90.85,"proteinPercent":7.34},
{"id":6,"name":"Kiwi","calories":"46","protein":"0.87","fat":"0.4","carbs":"11.14","fatPercent":3.22,"carbPercent":89.77,"proteinPercent":7.01},
{"id":7,"name":"Peaches","calories":"38","protein":"0.89","fat":"0.24","carbs":"9.35","fatPercent":2.29,"carbPercent":89.22,"proteinPercent":8.49},
{"id":8,"name":"Litchi","calories":"6","protein":"0.8","fat":"0.04","carbs":"1.59","fatPercent":1.65,"carbPercent":65.43,"proteinPercent":32.92},
{"id":9,"name":"Sweet lime (mosambi)","calories":"32","protein":"0.61","fat":"0.21","carbs":"8.95","fatPercent":2.15,"carbPercent":91.61,"proteinPercent":6.24},
{"id":10,"name":"Lime","calories":"20","protein":"0.61","fat":"0.21","carbs":"8.95","fatPercent":2.15,"carbPercent":91.61,"proteinPercent":6.24},
{"id":11,"name":"Tomato","calories":"22","protein":"1.08","fat":"0.25","carbs":"4.82","fatPercent":4.07,"carbPercent":78.37,"proteinPercent":17.56},
{"id":12,"name":"Blueberries","calories":"57","protein":"0.74","fat":"0.33","carbs":"14.49","fatPercent":2.12,"carbPercent":93.12,"proteinPercent":4.76},
{"id":13,"name":"Strawberries","calories":"32","protein":"0.67","fat":"0.3","carbs":"7.68","fatPercent":3.47,"carbPercent":88.79,"proteinPercent":7.75},
{"id":14,"name":"Fig","calories":"30","protein":"0.3","fat":"0.12","carbs":"7.67","fatPercent":1.48,"carbPercent":94.81,"proteinPercent":3.71},
{"id":15,"name":"Muskmelon","calories":"34","protein":"0.84","fat":"0.19","carbs":"8.16","fatPercent":2.07,"carbPercent":88.79,"proteinPercent":9.14},
{"id":16,"name":"Papaya","calories":"39","protein":"0.61","fat":"0.14","carbs":"9.81","fatPercent":1.33,"carbPercent":92.9,"proteinPercent":5.78},
{"id":17,"name":"Jackfruit","calories":"94","protein":"1.47","fat":"0.3","carbs":"24.01","fatPercent":1.16,"carbPercent":93.13,"proteinPercent":5.7},
{"id":18,"name":"Cherry","calories":"63","protein":"1.06","fat":"0.2","carbs":"16.01","fatPercent":1.16,"carbPercent":92.7,"proteinPercent":6.14},
{"id":19,"name":"Coconut meat","calories":"354","protein":"3.33","fat":"33.49","carbs":"15.23","fatPercent":64.34,"carbPercent":29.26,"proteinPercent":6.4},
{"id":20,"name":"Banana","calories":"105","protein":"1.29","fat":"0.39","carbs":"26.95","fatPercent":1.36,"carbPercent":94.13,"proteinPercent":4.51},
{"id":21,"name":"Dragon fruit","calories":"60","protein":"2","fat":"1.5","carbs":"9","fatPercent":12,"carbPercent":72,"proteinPercent":16},
{"id":22,"name":"Plum","calories":"46","protein":"0.7","fat":"0.28","carbs":"11.42","fatPercent":2.26,"carbPercent":92.1,"proteinPercent":5.65},
{"id":23,"name":"Passion fruit","calories":"17","protein":"0.4","fat":"0.13","carbs":"4.21","fatPercent":2.74,"carbPercent":88.82,"proteinPercent":8.44},
{"id":24,"name":"Avocado","calories":"160","protein":"14.66","fat":"2","carbs":"8.53","fatPercent":7.94,"carbPercent":33.86,"proteinPercent":58.2},
{"id":25,"name":"Apricot","calories":"17","protein":"0.49","fat":"0.14","carbs":"3.89","fatPercent":3.1,"carbPercent":86.06,"proteinPercent":10.84},
{"id":26,"name":"Grapes","calories":"69","protein":"0.72","fat":"0.16","carbs":"18.1","fatPercent":0.84,"carbPercent":95.36,"proteinPercent":3.79},
{"id":108,"name":"Apple","calories":"72","protein":"0.3","fat":"0.2","carbs":"19.6","fatPercent":1,"carbPercent":97.51,"proteinPercent":1.49},
{"id":109,"name":"Mango ripe","calories":"65","protein":"0.51","fat":"0.27","carbs":"17","fatPercent":1.52,"carbPercent":95.61,"proteinPercent":2.87},
{"id":110,"name":"Raw Mango","calories":"18","protein":"0","fat":"0","carbs":"5","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":111,"name":"Guava","calories":"68","protein":"2.55","fat":"0.95","carbs":"14.32","fatPercent":5.33,"carbPercent":80.36,"proteinPercent":14.31},
{"id":112,"name":"Custard Apple","calories":"94","protein":"2.1","fat":"0.3","carbs":"24","fatPercent":1.14,"carbPercent":90.91,"proteinPercent":7.95},
{"id":113,"name":"Chikkoo (sapota)","calories":"83","protein":"0.44","fat":"1.1","carbs":"19.96","fatPercent":5.12,"carbPercent":92.84,"proteinPercent":2.05},
{"id":114,"name":"Green Olives","calories":"41","protein":"0.29","fat":"4.34","carbs":"1.09","fatPercent":75.87,"carbPercent":19.06,"proteinPercent":5.07},
{"id":115,"name":"Black Olives","calories":"30","protein":"0.25","fat":"2.7","carbs":"1.72","fatPercent":57.82,"carbPercent":36.83,"proteinPercent":5.35},
{"id":116,"name":"Raspberries","calories":"52","protein":"1.2","fat":"0.65","carbs":"11.94","fatPercent":4.71,"carbPercent":86.58,"proteinPercent":8.7},
{"id":117,"name":"Pomegranate","calories":"68","protein":"0.95","fat":"0.3","carbs":"17.17","fatPercent":1.63,"carbPercent":93.21,"proteinPercent":5.16},
{"id":118,"name":"Mangosteen","calories":"55","protein":"0.3","fat":"0.4","carbs":"14","fatPercent":2.72,"carbPercent":95.24,"proteinPercent":2.04},
{"id":119,"name":"Grape fruit","calories":"41","protein":"0.81","fat":"0.13","carbs":"10.34","fatPercent":1.15,"carbPercent":91.67,"proteinPercent":7.18},
{"id":120,"name":"Nectraine","calories":"60","protein":"1.44","fat":"0.44","carbs":"14.35","fatPercent":2.71,"carbPercent":88.42,"proteinPercent":8.87},
{"id":121,"name":"Strafruit","calories":"28","protein":"0.95","fat":"0.3","carbs":"6.12","fatPercent":4.07,"carbPercent":83.04,"proteinPercent":12.89},
{"id":122,"name":"Wood apple","calories":"134","protein":"7","fat":"3","carbs":"18","fatPercent":10.71,"carbPercent":64.29,"proteinPercent":25},
{"id":123,"name":"Rambutan","calories":"78","protein":"0.62","fat":"0.2","carbs":"19.88","fatPercent":0.97,"carbPercent":96.04,"proteinPercent":3},
{"id":124,"name":"Gooseberries","calories":"44","protein":"0.88","fat":"0.58","carbs":"10.18","fatPercent":4.98,"carbPercent":87.46,"proteinPercent":7.56},
{"id":125,"name":"Permission","calories":"127","protein":"0.8","fat":"0.4","carbs":"34","fatPercent":1.14,"carbPercent":96.59,"proteinPercent":2.27},
{"id":126,"name":"Ice apple (palm fruit)","calories":"43","protein":"-","fat":"-","carbs":"10","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":127,"name":"Cranberry","calories":"46","protein":"0.39","fat":"0.13","carbs":"12.2","fatPercent":1.02,"carbPercent":95.91,"proteinPercent":3.07},
{"id":128,"name":"Gojiberry","calories":"59","protein":"2.4","fat":"0.1","carbs":"13","fatPercent":0.65,"carbPercent":83.87,"proteinPercent":15.48},
{"id":129,"name":"Sugarcane","calories":"58","protein":"0.16","fat":"0.4","carbs":"13.11","fatPercent":2.93,"carbPercent":95.9,"proteinPercent":1.17},
{"id":130,"name":"Craisins","calories":"308","protein":"0.07","fat":"1.37","carbs":"82.36","fatPercent":1.63,"carbPercent":98.28,"proteinPercent":0.08},
{"id":131,"name":"Pumpkin","calories":"26","protein":"1","fat":"0.1","carbs":"6.5","fatPercent":1.32,"carbPercent":85.53,"proteinPercent":13.16},
{"id":132,"name":"Butternut squash","calories":"45","protein":"1","fat":"0.1","carbs":"11.69","fatPercent":0.78,"carbPercent":91.4,"proteinPercent":7.82},
{"id":133,"name":"Corn","calories":"86","protein":"3.22","fat":"1.18","carbs":"19.02","fatPercent":5.04,"carbPercent":81.21,"proteinPercent":13.75},
{"id":134,"name":"Broccoli","calories":"34","protein":"2.82","fat":"0.37","carbs":"6.64","fatPercent":3.76,"carbPercent":67.55,"proteinPercent":28.69},
{"id":135,"name":"Brussel sprouts","calories":"43","protein":"3.38","fat":"0.3","carbs":"8.95","fatPercent":2.38,"carbPercent":70.86,"proteinPercent":26.76},
{"id":136,"name":"Cucumber","calories":"12","protein":"0.59","fat":"0.16","carbs":"2.16","fatPercent":5.5,"carbPercent":74.23,"proteinPercent":20.27},
{"id":137,"name":"Red capsicum","calories":"30","protein":"1","fat":"0","carbs":"8","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":138,"name":"Yellow capsicum","calories":"27","protein":"1","fat":"0.2","carbs":"6.3","fatPercent":2.67,"carbPercent":84,"proteinPercent":13.33},
{"id":139,"name":"Green capsicum","calories":"33","protein":"1.5","fat":"0.3","carbs":"7.5","fatPercent":3.23,"carbPercent":80.65,"proteinPercent":16.13},
{"id":140,"name":"Turnip","calories":"28","protein":"0.9","fat":"0.1","carbs":"6.43","fatPercent":1.35,"carbPercent":86.54,"proteinPercent":12.11},
{"id":141,"name":"Radish","calories":"16","protein":"0.68","fat":"0.1","carbs":"3.4","fatPercent":2.39,"carbPercent":81.34,"proteinPercent":16.27},
{"id":142,"name":"Sweet potato","calories":"86","protein":"1.57","fat":"0.05","carbs":"20.12","fatPercent":0.23,"carbPercent":92.55,"proteinPercent":7.22},
{"id":143,"name":"White potato","calories":"104","protein":"1.66","fat":"2.4","carbs":"19.36","fatPercent":10.25,"carbPercent":82.66,"proteinPercent":7.09},
{"id":144,"name":"Cabbage","calories":"24","protein":"1.44","fat":"0.12","carbs":"5.58","fatPercent":1.68,"carbPercent":78.15,"proteinPercent":20.17},
{"id":145,"name":"Cauliflower","calories":"25","protein":"1.98","fat":"0.1","carbs":"5.3","fatPercent":1.36,"carbPercent":71.82,"proteinPercent":26.83},
{"id":146,"name":"Lettuce","calories":"14","protein":"0.9","fat":"0.14","carbs":"2.97","fatPercent":3.49,"carbPercent":74.06,"proteinPercent":22.44},
{"id":147,"name":"French beans","calories":"35","protein":"2","fat":"0","carbs":"6","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":148,"name":"Asparagus","calories":"20","protein":"2.2","fat":"0.12","carbs":"3.88","fatPercent":1.94,"carbPercent":62.58,"proteinPercent":35.48},
{"id":149,"name":"Celery","calories":"14","protein":"0.69","fat":"0.17","carbs":"2.97","fatPercent":4.44,"carbPercent":77.55,"proteinPercent":18.02},
{"id":150,"name":"Beetroot","calories":"43","protein":"1.61","fat":"0.17","carbs":"9.56","fatPercent":1.5,"carbPercent":84.3,"proteinPercent":14.2},
{"id":151,"name":"Green peas","calories":"81","protein":"5.42","fat":"0.4","carbs":"14.46","fatPercent":1.97,"carbPercent":71.3,"proteinPercent":26.73},
{"id":152,"name":"Onions","calories":"42","protein":"0.92","fat":"0.08","carbs":"10.11","fatPercent":0.72,"carbPercent":91,"proteinPercent":8.28},
{"id":153,"name":"Spring onion","calories":"32","protein":"1.83","fat":"0.19","carbs":"7.34","fatPercent":2.03,"carbPercent":78.42,"proteinPercent":19.55},
{"id":154,"name":"Zucchini","calories":"16","protein":"1.21","fat":"0.18","carbs":"3.35","fatPercent":3.8,"carbPercent":70.68,"proteinPercent":25.53},
{"id":155,"name":"Carrot","calories":"41","protein":"0.93","fat":"0.24","carbs":"9.58","fatPercent":2.23,"carbPercent":89.12,"proteinPercent":8.65},
{"id":156,"name":"Egg plant (brinjal)","calories":"24","protein":"1.01","fat":"0.19","carbs":"5.7","fatPercent":2.75,"carbPercent":82.61,"proteinPercent":14.64},
{"id":157,"name":"Green chilli","calories":"63.5","protein":"2.5","fat":"0.7","carbs":"10.6","fatPercent":5.07,"carbPercent":76.81,"proteinPercent":18.12},
{"id":158,"name":"Red chilli","calories":"18","protein":"0.8","fat":"0.2","carbs":"4","fatPercent":4,"carbPercent":80,"proteinPercent":16},
{"id":159,"name":"Garlic","calories":"149","protein":"6.36","fat":"0.5","carbs":"33.06","fatPercent":1.25,"carbPercent":82.82,"proteinPercent":15.93},
{"id":160,"name":"Ginger","calories":"80","protein":"1.82","fat":"0.75","carbs":"17.77","fatPercent":3.69,"carbPercent":87.36,"proteinPercent":8.95},
{"id":161,"name":"Rhubarb","calories":"21","protein":"0.9","fat":"0.2","carbs":"4.54","fatPercent":3.55,"carbPercent":80.5,"proteinPercent":15.96},
{"id":162,"name":"Spinach","calories":"23","protein":"2.86","fat":"0.39","carbs":"3.63","fatPercent":5.67,"carbPercent":52.76,"proteinPercent":41.57},
{"id":163,"name":"Kale","calories":"50","protein":"3.3","fat":"0.7","carbs":"10.01","fatPercent":5,"carbPercent":71.45,"proteinPercent":23.55},
{"id":164,"name":"Arugula","calories":"25","protein":"2.6","fat":"0.7","carbs":"3.7","fatPercent":10,"carbPercent":52.86,"proteinPercent":37.14},
{"id":165,"name":"Artichoke","calories":"64","protein":"3.5","fat":"0.4","carbs":"14","fatPercent":2.23,"carbPercent":78.21,"proteinPercent":19.55},
{"id":166,"name":"Okra","calories":"31","protein":"2","fat":"0.1","carbs":"7.03","fatPercent":1.1,"carbPercent":77,"proteinPercent":21.91},
{"id":167,"name":"Bitter gourd","calories":"24","protein":"1","fat":"0.2","carbs":"5.4","fatPercent":3.03,"carbPercent":81.82,"proteinPercent":15.15},
{"id":168,"name":"Bottle gourd","calories":"22","protein":"0.9","fat":"0","carbs":"5.4","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":173,"name":"Yam","calories":"118","protein":"1.53","fat":"0.17","carbs":"27.88","fatPercent":0.57,"carbPercent":94.25,"proteinPercent":5.17},
{"id":174,"name":"Colocasia Arbi","calories":"218","protein":"0","fat":"10.1","carbs":"30.8","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":175,"name":"Parsnip","calories":"75","protein":"1.2","fat":"0.3","carbs":"17.99","fatPercent":1.54,"carbPercent":92.3,"proteinPercent":6.16},
{"id":176,"name":"Red cabbage","calories":"31","protein":"1.43","fat":"0.16","carbs":"7.37","fatPercent":1.79,"carbPercent":82.25,"proteinPercent":15.96},
{"id":177,"name":"Jaleponos","calories":"30","protein":"1.35","fat":"0.62","carbs":"5.91","fatPercent":7.87,"carbPercent":75,"proteinPercent":17.13},
{"id":178,"name":"Cassava","calories":"160","protein":"1.36","fat":"0.28","carbs":"38.06","fatPercent":0.71,"carbPercent":95.87,"proteinPercent":3.43},
{"id":179,"name":"Ridge Gourd","calories":"100","protein":"1.2","fat":"0.6","carbs":"26","fatPercent":2.16,"carbPercent":93.53,"proteinPercent":4.32},
{"id":180,"name":"Fennel","calories":"27","protein":"1.1","fat":"0.2","carbs":"6.4","fatPercent":2.6,"carbPercent":83.12,"proteinPercent":14.29},
{"id":181,"name":"Taro Root","calories":"70","protein":"0.9","fat":"0","carbs":"17.5","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":182,"name":"Daikon","calories":"30.5","protein":"1.2","fat":"0.4","carbs":"6","fatPercent":5.26,"carbPercent":78.95,"proteinPercent":15.79},
{"id":183,"name":"Bokchoy","calories":"10","protein":"1.4","fat":"0.1","carbs":"1.5","fatPercent":3.33,"carbPercent":50,"proteinPercent":46.67},
{"id":184,"name":"Watercress","calories":"11","protein":"2.3","fat":"0.1","carbs":"1.29","fatPercent":2.71,"carbPercent":34.96,"proteinPercent":62.33},
{"id":185,"name":"Mushrooms","calories":"22","protein":"3.09","fat":"0.34","carbs":"3.28","fatPercent":5.07,"carbPercent":48.88,"proteinPercent":46.05},
{"id":186,"name":"Shitake Mushroom","calories":"38","protein":"3.02","fat":"0.42","carbs":"6.7","fatPercent":4.14,"carbPercent":66.07,"proteinPercent":29.78},
{"id":187,"name":"Swiss chard","calories":"19","protein":"1.8","fat":"0.2","carbs":"3.74","fatPercent":3.48,"carbPercent":65.16,"proteinPercent":31.36},
{"id":188,"name":"Collard green","calories":"30","protein":"2","fat":"0","carbs":"3","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":189,"name":"Leek","calories":"61","protein":"1.5","fat":"0.3","carbs":"14.15","fatPercent":1.88,"carbPercent":88.71,"proteinPercent":9.4},
{"id":190,"name":"Drumstick leaves (moringa)","calories":"92","protein":"6.7","fat":"1.7","carbs":"12.5","fatPercent":8.13,"carbPercent":59.81,"proteinPercent":32.06},
{"id":191,"name":"Amaranth Leaves","calories":"28","protein":"2.8","fat":"0.2","carbs":"5.4","fatPercent":2.38,"carbPercent":64.29,"proteinPercent":33.33},
{"id":193,"name":"Dill leaves","calories":"43","protein":"3.46","fat":"1.12","carbs":"7.02","fatPercent":9.66,"carbPercent":60.52,"proteinPercent":29.83},
{"id":194,"name":"Mint","calories":"15","protein":"1.1","fat":"0.2","carbs":"2.9","fatPercent":4.76,"carbPercent":69.05,"proteinPercent":26.19},
{"id":195,"name":"Rosemary (Fresh)","calories":"7.4","protein":"0.2","fat":"0.3","carbs":"1.1","fatPercent":18.75,"carbPercent":68.75,"proteinPercent":12.5},
{"id":196,"name":"Rosemary (Dried)","calories":"20","protein":"0.3","fat":"0.9","carbs":"3.9","fatPercent":17.65,"carbPercent":76.47,"proteinPercent":5.88},
{"id":197,"name":"Coriander leaves","calories":"12.1","protein":"1.2","fat":"0.3","carbs":"2","fatPercent":8.57,"carbPercent":57.14,"proteinPercent":34.29},
{"id":198,"name":"Curry leaves","calories":"1.2","protein":"0.2","fat":"0","carbs":"0.1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":199,"name":"Parsley (Fresh)","calories":"1","protein":"0.11","fat":"0.03","carbs":"0.24","fatPercent":7.89,"carbPercent":63.16,"proteinPercent":28.95},
{"id":200,"name":"Parsley (Dried)","calories":"4","protein":"0.29","fat":"0.06","carbs":"0.67","fatPercent":5.88,"carbPercent":65.69,"proteinPercent":28.43},
{"id":201,"name":"Oregano (Ground)","calories":"6","protein":"0.2","fat":"0.18","carbs":"1.16","fatPercent":11.69,"carbPercent":75.32,"proteinPercent":12.99},
{"id":202,"name":"Thyme (Fresh)","calories":"1","protein":"0.04","fat":"0.01","carbs":"0.2","fatPercent":4,"carbPercent":80,"proteinPercent":16},
{"id":203,"name":"Thyme Ground (Dried)","calories":"4","protein":"0.13","fat":"0.1","carbs":"0.9","fatPercent":8.85,"carbPercent":79.65,"proteinPercent":11.5},
{"id":204,"name":"Basil Leaves (Fresh)","calories":"1","protein":"0.13","fat":"0.03","carbs":"0.23","fatPercent":7.69,"carbPercent":58.97,"proteinPercent":33.33},
{"id":205,"name":"Basil Leaves (Dried)","calories":"5","protein":"0.3","fat":"0.08","carbs":"1.28","fatPercent":4.82,"carbPercent":77.11,"proteinPercent":18.07},
{"id":206,"name":"Chives Chopped","calories":"1","protein":"0.1","fat":"0.02","carbs":"0.13","fatPercent":8,"carbPercent":52,"proteinPercent":40},
{"id":207,"name":"Bay Leaves (Crumbled)","calories":"6","protein":"0.14","fat":"0.15","carbs":"1.35","fatPercent":9.15,"carbPercent":82.32,"proteinPercent":8.54},
{"id":208,"name":"Sage Leaves","calories":"1.2","protein":"0.2","fat":"0","carbs":"0.1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":210,"name":"Spirulina","calories":"20","protein":"4","fat":"0.5","carbs":"1.7","fatPercent":8.06,"carbPercent":27.42,"proteinPercent":64.52},
{"id":211,"name":"Wheat Grass Organic","calories":"35","protein":"2","fat":"0","carbs":"4","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":212,"name":"Black Pepper","calories":"5","protein":"0.23","fat":"0.07","carbs":"1.36","fatPercent":4.22,"carbPercent":81.93,"proteinPercent":13.86},
{"id":213,"name":"White Pepper","calories":"7","protein":"0.25","fat":"0.05","carbs":"1.65","fatPercent":2.56,"carbPercent":84.62,"proteinPercent":12.82},
{"id":214,"name":"Cayenne Pepper","calories":"6","protein":"0.22","fat":"0.31","carbs":"1.02","fatPercent":20,"carbPercent":65.81,"proteinPercent":14.19},
{"id":215,"name":"Turmeric powder","calories":"8","protein":"0.17","fat":"0.22","carbs":"1.43","fatPercent":12.09,"carbPercent":78.57,"proteinPercent":9.34},
{"id":216,"name":"Chilli powder","calories":"8","protein":"0.32","fat":"0.44","carbs":"1.42","fatPercent":20.18,"carbPercent":65.14,"proteinPercent":14.68},
{"id":217,"name":"Garlic Powder","calories":"9","protein":"0.47","fat":"0.02","carbs":"2.04","fatPercent":0.79,"carbPercent":80.63,"proteinPercent":18.58},
{"id":218,"name":"Cumin powder","calories":"21","protein":"1","fat":"1","carbs":"2","fatPercent":25,"carbPercent":50,"proteinPercent":25},
{"id":219,"name":"Cumin seeds","calories":"8","protein":"0.37","fat":"0.47","carbs":"0.93","fatPercent":26.55,"carbPercent":52.54,"proteinPercent":20.9},
{"id":220,"name":"Coriander Powder (Eastern)","calories":"29","protein":"1","fat":"1","carbs":"4","fatPercent":16.67,"carbPercent":66.67,"proteinPercent":16.67},
{"id":221,"name":"Coriander seeds","calories":"5","protein":"0.22","fat":"0.32","carbs":"0.99","fatPercent":20.92,"carbPercent":64.71,"proteinPercent":14.38},
{"id":222,"name":"Mustard Seeds","calories":"10","protein":"0.5","fat":"0.7","carbs":"0.6","fatPercent":38.89,"carbPercent":33.33,"proteinPercent":27.78},
{"id":223,"name":"Fennel Seeds","calories":"6.9","protein":"0.3","fat":"0.3","carbs":"1","fatPercent":18.75,"carbPercent":62.5,"proteinPercent":18.75},
{"id":224,"name":"Fenugreek Seeds","calories":"12","protein":"0.8","fat":"0.2","carbs":"2.2","fatPercent":6.25,"carbPercent":68.75,"proteinPercent":25},
{"id":225,"name":"Almonds","calories":"7","protein":"0.26","fat":"0.61","carbs":"0.24","fatPercent":54.95,"carbPercent":21.62,"proteinPercent":23.42},
{"id":226,"name":"Walnut","calories":"26","protein":"0.61","fat":"2.61","carbs":"0.55","fatPercent":69.23,"carbPercent":14.59,"proteinPercent":16.18},
{"id":227,"name":"Pistachios","calories":"3","protein":"0.13","fat":"0.28","carbs":"0.16","fatPercent":49.12,"carbPercent":28.07,"proteinPercent":22.81},
{"id":228,"name":"Brazil nuts","calories":"656","protein":"14.32","fat":"66.43","carbs":"12.27","fatPercent":71.41,"carbPercent":13.19,"proteinPercent":15.39},
{"id":229,"name":"Macadamia nuts","calories":"718","protein":"7.91","fat":"75.77","carbs":"13.82","fatPercent":77.71,"carbPercent":14.17,"proteinPercent":8.11},
{"id":230,"name":"Cashew nuts","calories":"553","protein":"18.22","fat":"43.85","carbs":"30.19","fatPercent":47.53,"carbPercent":32.72,"proteinPercent":19.75},
{"id":231,"name":"Chia seeds","calories":"58","protein":"2","fat":"3.7","carbs":"5.1","fatPercent":34.26,"carbPercent":47.22,"proteinPercent":18.52},
{"id":232,"name":"Flax seeds","calories":"55","protein":"1.9","fat":"4.3","carbs":"3","fatPercent":46.74,"carbPercent":32.61,"proteinPercent":20.65},
{"id":233,"name":"Basil seeds (sabja seeds)","calories":"60","protein":"2","fat":"2.5","carbs":"7","fatPercent":21.74,"carbPercent":60.87,"proteinPercent":17.39},
{"id":234,"name":"Sunflower seeds","calories":"349.5","protein":"12.5","fat":"32","carbs":"10","fatPercent":58.72,"carbPercent":18.35,"proteinPercent":22.94},
{"id":235,"name":"pumpkin seeds","calories":"56","protein":"1","fat":"5","carbs":"3","fatPercent":55.56,"carbPercent":33.33,"proteinPercent":11.11},
{"id":236,"name":"Sesame seeds","calories":"160","protein":"4.8","fat":"14","carbs":"7.3","fatPercent":53.64,"carbPercent":27.97,"proteinPercent":18.39},
{"id":237,"name":"Hemp seeds","calories":"55.3","protein":"3.2","fat":"5","carbs":"0.9","fatPercent":54.95,"carbPercent":9.89,"proteinPercent":35.16},
{"id":238,"name":"Poppy Seeds","calories":"15","protein":"0.5","fat":"1.2","carbs":"0.8","fatPercent":48,"carbPercent":32,"proteinPercent":20},
{"id":239,"name":"Pecan Nuts","calories":"691","protein":"9.17","fat":"71.97","carbs":"13.86","fatPercent":75.76,"carbPercent":14.59,"proteinPercent":9.65},
{"id":240,"name":"Water Chestnuts","calories":"97","protein":"1.4","fat":"0.1","carbs":"23.94","fatPercent":0.39,"carbPercent":94.1,"proteinPercent":5.5},
{"id":241,"name":"Peanuts","calories":"599","protein":"28.03","fat":"52.5","carbs":"15.26","fatPercent":54.81,"carbPercent":15.93,"proteinPercent":29.26},
{"id":242,"name":"Hazel nuts","calories":"183","protein":"4.3","fat":"18","carbs":"5","fatPercent":65.93,"carbPercent":18.32,"proteinPercent":15.75},
{"id":243,"name":"Pinenuts","calories":"191","protein":"3.9","fat":"19","carbs":"3.7","fatPercent":71.43,"carbPercent":13.91,"proteinPercent":14.66},
{"id":244,"name":"Milk","calories":"52","protein":"3.39","fat":"2.09","carbs":"4.86","fatPercent":20.21,"carbPercent":47,"proteinPercent":32.79},
{"id":245,"name":"Whole Milk","calories":"62","protein":"3.32","fat":"3.35","carbs":"4.66","fatPercent":29.57,"carbPercent":41.13,"proteinPercent":29.3},
{"id":246,"name":"Skimmed Milk","calories":"83","protein":"8.3","fat":"0.2","carbs":"12","fatPercent":0.98,"carbPercent":58.54,"proteinPercent":40.49},
{"id":247,"name":"Almond Milk","calories":"56","protein":"1.1","fat":"2.5","carbs":"8.1","fatPercent":21.37,"carbPercent":69.23,"proteinPercent":9.4},
{"id":248,"name":"Soy Milk","calories":"100","protein":"7","fat":"4","carbs":"8","fatPercent":21.05,"carbPercent":42.11,"proteinPercent":36.84},
{"id":249,"name":"Curd","calories":"69","protein":"3.9","fat":"3.7","carbs":"5.3","fatPercent":28.68,"carbPercent":41.09,"proteinPercent":30.23},
{"id":250,"name":"Paneer (Crumbled)","calories":"365","protein":"22","fat":"29","carbs":"3.6","fatPercent":53.11,"carbPercent":6.59,"proteinPercent":40.29},
{"id":251,"name":"Mishti doi","calories":"125","protein":"2.67","fat":"2.55","carbs":"23.42","fatPercent":8.9,"carbPercent":81.77,"proteinPercent":9.32},
{"id":252,"name":"Plain Yogurt","calories":"154","protein":"12.86","fat":"3.8","carbs":"17.25","fatPercent":11.21,"carbPercent":50.87,"proteinPercent":37.92},
{"id":253,"name":"Vanilla Yogurt (Low Fat)","calories":"208","protein":"12.08","fat":"3.06","carbs":"33.81","fatPercent":6.25,"carbPercent":69.07,"proteinPercent":24.68},
{"id":254,"name":"Mozerella cheese","calories":"302","protein":"25.96","fat":"20.03","carbs":"3.83","fatPercent":40.2,"carbPercent":7.69,"proteinPercent":52.11},
{"id":255,"name":"Feta cheese","calories":"264","protein":"14.21","fat":"21.28","carbs":"4.09","fatPercent":53.76,"carbPercent":10.33,"proteinPercent":35.9},
{"id":256,"name":"Cheddar cheese","calories":"403","protein":"24.9","fat":"33.14","carbs":"1.28","fatPercent":55.87,"carbPercent":2.16,"proteinPercent":41.98},
{"id":257,"name":"Blue cheese","calories":"353","protein":"21.4","fat":"28.74","carbs":"2.34","fatPercent":54.76,"carbPercent":4.46,"proteinPercent":40.78},
{"id":258,"name":"White Rice","calories":"204","protein":"4.2","fat":"0.44","carbs":"44.08","fatPercent":0.9,"carbPercent":90.48,"proteinPercent":8.62},
{"id":259,"name":"Brown rice","calories":"215","protein":"4.99","fat":"1.74","carbs":"44.42","fatPercent":3.4,"carbPercent":86.84,"proteinPercent":9.76},
{"id":260,"name":"Parboiled rice","calories":"194","protein":"4.6","fat":"0.6","carbs":"41","fatPercent":1.3,"carbPercent":88.74,"proteinPercent":9.96},
{"id":261,"name":"Black rice","calories":"205","protein":"4.3","fat":"0.4","carbs":"45","fatPercent":0.8,"carbPercent":90.54,"proteinPercent":8.65},
{"id":262,"name":"Red rice","calories":"455","protein":"9.15","fat":"0.76","carbs":"102.12","fatPercent":0.68,"carbPercent":91.15,"proteinPercent":8.17},
{"id":263,"name":"Polenta","calories":"80","protein":"2","fat":"1","carbs":"17","fatPercent":5,"carbPercent":85,"proteinPercent":10},
{"id":264,"name":"Quinoa","calories":"229","protein":"8.01","fat":"3.55","carbs":"42.17","fatPercent":6.61,"carbPercent":78.49,"proteinPercent":14.91},
{"id":265,"name":"Bajra","calories":"361","protein":"12","fat":"5","carbs":"67","fatPercent":5.95,"carbPercent":79.76,"proteinPercent":14.29},
{"id":266,"name":"Jowar","calories":"334.13","protein":"9.97","fat":"1.73","carbs":"67.68","fatPercent":2.18,"carbPercent":85.26,"proteinPercent":12.56},
{"id":267,"name":"Ragi","calories":"328","protein":"7.3","fat":"1.3","carbs":"72","fatPercent":1.61,"carbPercent":89.33,"proteinPercent":9.06},
{"id":268,"name":"Buckwheat","calories":"343","protein":"13.25","fat":"3.4","carbs":"71.5","fatPercent":3.86,"carbPercent":81.11,"proteinPercent":15.03},
{"id":269,"name":"Amaranth","calories":"125.5","protein":"4.7","fat":"1.9","carbs":"23","fatPercent":6.42,"carbPercent":77.7,"proteinPercent":15.88},
{"id":270,"name":"Barnyard","calories":"398","protein":"6","fat":"2","carbs":"66","fatPercent":2.7,"carbPercent":89.19,"proteinPercent":8.11},
{"id":271,"name":"Puffed rice","calories":"383","protein":"7","fat":"0.9","carbs":"87.77","fatPercent":0.94,"carbPercent":91.74,"proteinPercent":7.32},
{"id":272,"name":"Rice flakes","calories":"364","protein":"6.69","fat":"1.26","carbs":"86.22","fatPercent":1.34,"carbPercent":91.56,"proteinPercent":7.1},
{"id":273,"name":"Tapioca (sago)","calories":"354","protein":"0.42","fat":"0.05","carbs":"87.55","fatPercent":0.06,"carbPercent":99.47,"proteinPercent":0.48},
{"id":274,"name":"Barley Flour","calories":"345","protein":"10.5","fat":"1.6","carbs":"74.52","fatPercent":1.85,"carbPercent":86.03,"proteinPercent":12.12},
{"id":275,"name":"Cracked Wheat","calories":"327","protein":"12.61","fat":"1.54","carbs":"71.18","fatPercent":1.8,"carbPercent":83.42,"proteinPercent":14.78},
{"id":276,"name":"Bulgar","calories":"83","protein":"3.08","fat":"0.24","carbs":"18.58","fatPercent":1.1,"carbPercent":84.84,"proteinPercent":14.06},
{"id":277,"name":"Semolina","calories":"112","protein":"3.96","fat":"0.33","carbs":"22.74","fatPercent":1.22,"carbPercent":84.13,"proteinPercent":14.65},
{"id":278,"name":"Vermicelli","calories":"220","protein":"8.07","fat":"1.29","carbs":"42.95","fatPercent":2.47,"carbPercent":82.11,"proteinPercent":15.43},
{"id":279,"name":"Whole Wheat Flour","calories":"339","protein":"13.7","fat":"1.87","carbs":"72.57","fatPercent":2.12,"carbPercent":82.33,"proteinPercent":15.54},
{"id":280,"name":"White Rice Flour","calories":"366","protein":"5.95","fat":"1.42","carbs":"80.13","fatPercent":1.62,"carbPercent":91.58,"proteinPercent":6.8},
{"id":281,"name":"Refined Flour (Maida)","calories":"455","protein":"13","fat":"1.2","carbs":"95","fatPercent":1.1,"carbPercent":87,"proteinPercent":11.9},
{"id":282,"name":"Chickpea Flour (Besan)","calories":"387","protein":"22.39","fat":"6.69","carbs":"57.82","fatPercent":7.7,"carbPercent":66.54,"proteinPercent":25.77},
{"id":283,"name":"Amaranth Flour","calories":"485","protein":"18","fat":"11","carbs":"79","fatPercent":10.19,"carbPercent":73.15,"proteinPercent":16.67},
{"id":284,"name":"Oat Flour","calories":"420","protein":"15","fat":"9.5","carbs":"68","fatPercent":10.27,"carbPercent":73.51,"proteinPercent":16.22},
{"id":285,"name":"Oats","calories":"389","protein":"16.89","fat":"6.9","carbs":"66.27","fatPercent":7.66,"carbPercent":73.58,"proteinPercent":18.75},
{"id":286,"name":"Maize","calories":"360","protein":"3","fat":"1","carbs":"19","fatPercent":4.35,"carbPercent":82.61,"proteinPercent":13.04},
{"id":287,"name":"Sorghum Millet","calories":"1418","protein":"11.3","fat":"3.3","carbs":"75","fatPercent":3.68,"carbPercent":83.71,"proteinPercent":12.61},
{"id":288,"name":"Proso Millets","calories":"1582","protein":"11","fat":"4.2","carbs":"73","fatPercent":4.76,"carbPercent":82.77,"proteinPercent":12.47},
{"id":289,"name":"Kodo Millet","calories":"1462","protein":"9.94","fat":"3.03","carbs":"63.82","fatPercent":3.95,"carbPercent":83.11,"proteinPercent":12.94},
{"id":291,"name":"Ice apple (plam fruit)","calories":"43","protein":"-","fat":"-","carbs":"10","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":292,"name":"Raisins","calories":"308","protein":"0.07","fat":"1.37","carbs":"82.36","fatPercent":1.63,"carbPercent":98.28,"proteinPercent":0.08},
{"id":294,"name":"Stuffed Paratta","calories":"220","protein":"31","fat":"7","carbs":"6","fatPercent":15.91,"carbPercent":13.64,"proteinPercent":70.45},
{"id":295,"name":"Aloo Paratha","calories":"265","protein":"41","fat":"9","carbs":"5","fatPercent":16.36,"carbPercent":9.09,"proteinPercent":74.55},
{"id":296,"name":"Paneer Paratha","calories":"275","protein":"28","fat":"13","carbs":"10","fatPercent":25.49,"carbPercent":19.61,"proteinPercent":54.9},
{"id":297,"name":"Gobi Paratha","calories":"260","protein":"30","fat":"12","carbs":"8","fatPercent":24,"carbPercent":16,"proteinPercent":60},
{"id":298,"name":"Veg Paratha","calories":"199","protein":"21","fat":"11","carbs":"3","fatPercent":31.43,"carbPercent":8.57,"proteinPercent":60},
{"id":299,"name":"Garlic Naan","calories":"190","protein":"29","fat":"5","carbs":"6","fatPercent":12.5,"carbPercent":15,"proteinPercent":72.5},
{"id":300,"name":"Palak Parantha","calories":"230","protein":"29","fat":"10","carbs":"6","fatPercent":22.22,"carbPercent":13.33,"proteinPercent":64.44},
{"id":301,"name":"plain khakra","calories":"462","protein":"11","fat":"17","carbs":"13.4","fatPercent":41.06,"carbPercent":32.37,"proteinPercent":26.57},
{"id":302,"name":"Makki roti","calories":"121","protein":"23","fat":"2","carbs":"3","fatPercent":7.14,"carbPercent":10.71,"proteinPercent":82.14},
{"id":304,"name":"Daliya","calories":"372","protein":"69","fat":"6","carbs":"21","fatPercent":6.25,"carbPercent":21.88,"proteinPercent":71.88},
{"id":306,"name":"Phulka","calories":"81","protein":"18","fat":"1","carbs":"3","fatPercent":4.55,"carbPercent":13.64,"proteinPercent":81.82},
{"id":308,"name":"Palak Atta Dosa","calories":"156","protein":"19.7","fat":"6.9","carbs":"3.2","fatPercent":23.15,"carbPercent":10.74,"proteinPercent":66.11},
{"id":309,"name":"Dhal Methi","calories":"84","protein":"14.4","fat":"0.4","carbs":"5.1","fatPercent":2.01,"carbPercent":25.63,"proteinPercent":72.36},
{"id":310,"name":"Dhal Makhani","calories":"111","protein":"6.2","fat":"8.8","carbs":"2.4","fatPercent":50.57,"carbPercent":13.79,"proteinPercent":35.63},
{"id":311,"name":"Aloo Mutter","calories":"160","protein":"15","fat":"7","carbs":"4","fatPercent":26.92,"carbPercent":15.38,"proteinPercent":57.69},
{"id":312,"name":"Aloo Palak","calories":"121","protein":"13","fat":"2.5","carbs":"3","fatPercent":13.51,"carbPercent":16.22,"proteinPercent":70.27},
{"id":313,"name":"Dum Aloo","calories":"96","protein":"17","fat":"3","carbs":"2","fatPercent":13.64,"carbPercent":9.09,"proteinPercent":77.27},
{"id":314,"name":"sweet lassi","calories":"198","protein":"25.3","fat":"8.3","carbs":"6.4","fatPercent":20.75,"carbPercent":16,"proteinPercent":63.25},
{"id":315,"name":"Dhal Fry","calories":"88","protein":"11.8","fat":"2.9","carbs":"4.4","fatPercent":15.18,"carbPercent":23.04,"proteinPercent":61.78},
{"id":316,"name":"Paneer Butter Masala","calories":"203","protein":"9","fat":"15","carbs":"8","fatPercent":46.88,"carbPercent":25,"proteinPercent":28.12},
{"id":317,"name":"Palak Masala","calories":"214","protein":"41","fat":"5","carbs":"12","fatPercent":8.62,"carbPercent":20.69,"proteinPercent":70.69},
{"id":318,"name":"Palak Paneer Masala","calories":"110","protein":"4","fat":"10","carbs":"3","fatPercent":58.82,"carbPercent":17.65,"proteinPercent":23.53},
{"id":319,"name":"Mutter Masala","calories":"140","protein":"9","fat":"11","carbs":"4","fatPercent":45.83,"carbPercent":16.67,"proteinPercent":37.5},
{"id":320,"name":"Bindi Masala","calories":"201","protein":"10","fat":"16","carbs":"3","fatPercent":55.17,"carbPercent":10.34,"proteinPercent":34.48},
{"id":321,"name":"Bindi Masala Fry","calories":"232","protein":"15","fat":"20","carbs":"3","fatPercent":52.63,"carbPercent":7.89,"proteinPercent":39.47},
{"id":322,"name":"Bindi Chenna","calories":"170","protein":"27","fat":"6","carbs":"6","fatPercent":15.38,"carbPercent":15.38,"proteinPercent":69.23},
{"id":323,"name":"Chenna Masala","calories":"250","protein":"44","fat":"5","carbs":"8","fatPercent":8.77,"carbPercent":14.04,"proteinPercent":77.19},
{"id":324,"name":"Cucumber Raitha","calories":"65","protein":"0","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":325,"name":"Gobi Masala","calories":"68","protein":"5","fat":"4","carbs":"2","fatPercent":36.36,"carbPercent":18.18,"proteinPercent":45.45},
{"id":326,"name":"Mix Vegetable Masala","calories":"60","protein":"11","fat":"0","carbs":"2","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":327,"name":"Veg Malai Kofta Masla","calories":"250","protein":"13","fat":"21","carbs":"4","fatPercent":55.26,"carbPercent":10.53,"proteinPercent":34.21},
{"id":328,"name":"Paneer Kofta Masala","calories":"200","protein":"6","fat":"5","carbs":"5","fatPercent":31.25,"carbPercent":31.25,"proteinPercent":37.5},
{"id":329,"name":"Navarathana Kuruma","calories":"280","protein":"26","fat":"20","carbs":"7","fatPercent":37.74,"carbPercent":13.21,"proteinPercent":49.06},
{"id":330,"name":"Palak Mutter Masala","calories":"132","protein":"22","fat":"4","carbs":"7","fatPercent":12.12,"carbPercent":21.21,"proteinPercent":66.67},
{"id":331,"name":"kadai paneer","calories":"280","protein":"26","fat":"18","carbs":"3","fatPercent":38.3,"carbPercent":6.38,"proteinPercent":55.32},
{"id":332,"name":"Tawa Paneer","calories":"224","protein":"4.6","fat":"18.6","carbs":"11","fatPercent":54.39,"carbPercent":32.16,"proteinPercent":13.45},
{"id":333,"name":"Paneer Pudina Masala","calories":"270","protein":"6","fat":"25","carbs":"11","fatPercent":59.52,"carbPercent":26.19,"proteinPercent":14.29},
{"id":334,"name":"Kadai Vegetable Masala","calories":"194","protein":"27","fat":"6","carbs":"6","fatPercent":15.38,"carbPercent":15.38,"proteinPercent":69.23},
{"id":335,"name":"Mix Veg Curry","calories":"145","protein":"23","fat":"5","carbs":"4","fatPercent":15.62,"carbPercent":12.5,"proteinPercent":71.88},
{"id":336,"name":"methi khakra","calories":"276","protein":"29.7","fat":"16.2","carbs":"5.9","fatPercent":31.27,"carbPercent":11.39,"proteinPercent":57.34},
{"id":337,"name":"ajwain khakra","calories":"490","protein":"61.7","fat":"21.8","carbs":"11.7","fatPercent":22.9,"carbPercent":12.29,"proteinPercent":64.81},
{"id":338,"name":"Mushroom Pepper Masala","calories":"200","protein":"9","fat":"15","carbs":"8","fatPercent":46.88,"carbPercent":25,"proteinPercent":28.12},
{"id":339,"name":"Kaju Masala","calories":"340","protein":"29","fat":"20","carbs":"10","fatPercent":33.9,"carbPercent":16.95,"proteinPercent":49.15},
{"id":340,"name":"Bhatura","calories":"220","protein":"28","fat":"9","carbs":"7","fatPercent":20.45,"carbPercent":15.91,"proteinPercent":63.64},
{"id":341,"name":"Hariyali Sheek Kabab","calories":"189","protein":"18.6","fat":"10.8","carbs":"4.5","fatPercent":31.86,"carbPercent":13.27,"proteinPercent":54.87},
{"id":342,"name":"Reshmi Paneer Tikka","calories":"179","protein":"4.9","fat":"13.9","carbs":"8.5","fatPercent":50.92,"carbPercent":31.14,"proteinPercent":17.95},
{"id":343,"name":"Achaari Paneer Tikka","calories":"246","protein":"3.6","fat":"20.5","carbs":"10.5","fatPercent":59.25,"carbPercent":30.35,"proteinPercent":10.4},
{"id":344,"name":"Hara Bara Paneer Tikka","calories":"200","protein":"7.4","fat":"15.8","carbs":"10.4","fatPercent":47.02,"carbPercent":30.95,"proteinPercent":22.02},
{"id":345,"name":"Palak Sheek Kabab","calories":"267","protein":"3.7","fat":"21.9","carbs":"12.4","fatPercent":57.63,"carbPercent":32.63,"proteinPercent":9.74},
{"id":346,"name":"Paneer Sheek Kabab","calories":"275","protein":"3.9","fat":"22.2","carbs":"12.7","fatPercent":57.22,"carbPercent":32.73,"proteinPercent":10.05},
{"id":347,"name":"Mix Veg kabab","calories":"176","protein":"17.5","fat":"10.8","carbs":"4.7","fatPercent":32.73,"carbPercent":14.24,"proteinPercent":53.03},
{"id":348,"name":"Chat Patta Paneer Tikka","calories":"338","protein":"7.9","fat":"23.5","carbs":"21.8","fatPercent":44.17,"carbPercent":40.98,"proteinPercent":14.85},
{"id":349,"name":"Cashew Sheek Kabab","calories":"197","protein":"18.9","fat":"10.8","carbs":"4.7","fatPercent":31.4,"carbPercent":13.66,"proteinPercent":54.94},
{"id":350,"name":"Cheese Malai Paneer Tikka","calories":"235","protein":"15.8","fat":"22.2","carbs":"8.6","fatPercent":47.64,"carbPercent":18.45,"proteinPercent":33.91},
{"id":351,"name":"Stuffed Capsicum Masala","calories":"332","protein":"20","fat":"24.7","carbs":"21.7","fatPercent":37.2,"carbPercent":32.68,"proteinPercent":30.12},
{"id":352,"name":"Veg Makhanwala","calories":"321","protein":"8.9","fat":"21.5","carbs":"20.4","fatPercent":42.32,"carbPercent":40.16,"proteinPercent":17.52},
{"id":353,"name":"Veg Kolaphuri","calories":"289","protein":"7.1","fat":"23.6","carbs":"12.4","fatPercent":54.76,"carbPercent":28.77,"proteinPercent":16.47},
{"id":354,"name":"Dum Aloo Punjabi","calories":"68","protein":"9.2","fat":"3.6","carbs":"1.6","fatPercent":25,"carbPercent":11.11,"proteinPercent":63.89},
{"id":355,"name":"Paneer Tikka Masala","calories":"137","protein":"5.4","fat":"10.6","carbs":"5.1","fatPercent":50.24,"carbPercent":24.17,"proteinPercent":25.59},
{"id":356,"name":"Paneer Patiala","calories":"105","protein":"6.4","fat":"6.7","carbs":"5.8","fatPercent":35.45,"carbPercent":30.69,"proteinPercent":33.86},
{"id":357,"name":"Veg Jalfrezi","calories":"164","protein":"17.5","fat":"18.6","carbs":"7.9","fatPercent":42.27,"carbPercent":17.95,"proteinPercent":39.77},
{"id":358,"name":"Veg Jalpuri","calories":"145","protein":"12.9","fat":"22.8","carbs":"4.6","fatPercent":56.58,"carbPercent":11.41,"proteinPercent":32.01},
{"id":359,"name":"Paneer Amritsari","calories":"265","protein":"1.6","fat":"20.4","carbs":"18.6","fatPercent":50.25,"carbPercent":45.81,"proteinPercent":3.94},
{"id":360,"name":"Tawa Mushroom","calories":"66","protein":"4.6","fat":"3.5","carbs":"2.5","fatPercent":33.02,"carbPercent":23.58,"proteinPercent":43.4},
{"id":361,"name":"Veg Hariyali","calories":"94","protein":"7.6","fat":"6.4","carbs":"2.7","fatPercent":38.32,"carbPercent":16.17,"proteinPercent":45.51},
{"id":362,"name":"Butter Roti","calories":"159","protein":"20","fat":"8","carbs":"4","fatPercent":25,"carbPercent":12.5,"proteinPercent":62.5},
{"id":363,"name":"Methi Roti","calories":"80","protein":"12","fat":"2","carbs":"2","fatPercent":12.5,"carbPercent":12.5,"proteinPercent":75},
{"id":364,"name":"naan","calories":"211","protein":"36","fat":"5","carbs":"6","fatPercent":10.64,"carbPercent":12.77,"proteinPercent":76.6},
{"id":365,"name":"Butter Naan","calories":"308","protein":"50","fat":"8","carbs":"9","fatPercent":11.94,"carbPercent":13.43,"proteinPercent":74.63},
{"id":366,"name":"Veg Pulao","calories":"200","protein":"34","fat":"6","carbs":"3","fatPercent":13.95,"carbPercent":6.98,"proteinPercent":79.07},
{"id":367,"name":"Peas Pulao","calories":"215","protein":"39","fat":"6","carbs":"4.5","fatPercent":12.12,"carbPercent":9.09,"proteinPercent":78.79},
{"id":368,"name":"Jeera Rice","calories":"235","protein":"36","fat":"3.5","carbs":"5.1","fatPercent":7.85,"carbPercent":11.43,"proteinPercent":80.72},
{"id":369,"name":"Kashmiri Pulao","calories":"200","protein":"30","fat":"3","carbs":"3","fatPercent":8.33,"carbPercent":8.33,"proteinPercent":83.33},
{"id":370,"name":"Cashew Pulao","calories":"282","protein":"38","fat":"6","carbs":"5","fatPercent":12.24,"carbPercent":10.2,"proteinPercent":77.55},
{"id":371,"name":"Paneer Pulao","calories":"330","protein":"33","fat":"16","carbs":"12","fatPercent":26.23,"carbPercent":19.67,"proteinPercent":54.1},
{"id":372,"name":"Tandoori Paratha","calories":"199","protein":"34","fat":"4","carbs":"5","fatPercent":9.3,"carbPercent":11.63,"proteinPercent":79.07},
{"id":373,"name":"Pudina Paratha","calories":"170","protein":"27","fat":"5","carbs":"5","fatPercent":13.51,"carbPercent":13.51,"proteinPercent":72.97},
{"id":374,"name":"Kulcha","calories":"214","protein":"18","fat":"5","carbs":"2","fatPercent":20,"carbPercent":8,"proteinPercent":72},
{"id":375,"name":"Masala Kulcha","calories":"315","protein":"22","fat":"7","carbs":"2","fatPercent":22.58,"carbPercent":6.45,"proteinPercent":70.97},
{"id":376,"name":"Onion Kulcha","calories":"300","protein":"50","fat":"8","carbs":"2.8","fatPercent":13.16,"carbPercent":4.61,"proteinPercent":82.24},
{"id":377,"name":"Cheese Kulcha","calories":"330","protein":"22","fat":"8.2","carbs":"4","fatPercent":23.98,"carbPercent":11.7,"proteinPercent":64.33},
{"id":378,"name":"Stuffed Naan","calories":"280","protein":"35","fat":"7","carbs":"5","fatPercent":14.89,"carbPercent":10.64,"proteinPercent":74.47},
{"id":379,"name":"Aloo Naan","calories":"300","protein":"46","fat":"11","carbs":"6","fatPercent":17.46,"carbPercent":9.52,"proteinPercent":73.02},
{"id":380,"name":"Paneer Naan","calories":"230","protein":"40","fat":"4","carbs":"8","fatPercent":7.69,"carbPercent":15.38,"proteinPercent":76.92},
{"id":381,"name":"Gobi Naan","calories":"290","protein":"45","fat":"4","carbs":"5","fatPercent":7.41,"carbPercent":9.26,"proteinPercent":83.33},
{"id":382,"name":"Bajra roti","calories":"141","protein":"25","fat":"1","carbs":"4","fatPercent":3.33,"carbPercent":13.33,"proteinPercent":83.33},
{"id":383,"name":"Jowar roti","calories":"88","protein":"10","fat":"0","carbs":"2","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":384,"name":"Rasa Malai","calories":"180","protein":"18","fat":"8","carbs":"9","fatPercent":22.86,"carbPercent":25.71,"proteinPercent":51.43},
{"id":385,"name":"Rasa Gulla","calories":"120","protein":"26","fat":"1","carbs":"7","fatPercent":2.94,"carbPercent":20.59,"proteinPercent":76.47},
{"id":386,"name":"Lassi","calories":"280","protein":"30","fat":"5","carbs":"5","fatPercent":12.5,"carbPercent":12.5,"proteinPercent":75},
{"id":387,"name":"Basundhi","calories":"190","protein":"19","fat":"9","carbs":"8","fatPercent":25,"carbPercent":22.22,"proteinPercent":52.78},
{"id":388,"name":"Gulab Jamoon","calories":"140","protein":"16","fat":"6","carbs":"6","fatPercent":21.43,"carbPercent":21.43,"proteinPercent":57.14},
{"id":389,"name":"Badam Halwa","calories":"138","protein":"27","fat":"3","carbs":"2","fatPercent":9.38,"carbPercent":6.25,"proteinPercent":84.38},
{"id":390,"name":"Coconut Payasam","calories":"175","protein":"35","fat":"1","carbs":"3","fatPercent":2.56,"carbPercent":7.69,"proteinPercent":89.74},
{"id":391,"name":"Paani Poori","calories":"70","protein":"8","fat":"3","carbs":"1","fatPercent":25,"carbPercent":8.33,"proteinPercent":66.67},
{"id":392,"name":"Bhel Poori","calories":"351","protein":"32","fat":"13","carbs":"4.8","fatPercent":26.1,"carbPercent":9.64,"proteinPercent":64.26},
{"id":393,"name":"Sev Poori","calories":"231","protein":"23","fat":"14","carbs":"3","fatPercent":35,"carbPercent":7.5,"proteinPercent":57.5},
{"id":394,"name":"Samosa","calories":"290","protein":"32","fat":"15","carbs":"4","fatPercent":29.41,"carbPercent":7.84,"proteinPercent":62.75},
{"id":395,"name":"Pav Bhajji","calories":"304","protein":"53","fat":"14","carbs":"6","fatPercent":19.18,"carbPercent":8.22,"proteinPercent":72.6},
{"id":396,"name":"Dhai Poori","calories":"335","protein":"50","fat":"21","carbs":"5","fatPercent":27.63,"carbPercent":6.58,"proteinPercent":65.79},
{"id":397,"name":"Ajwain Curd","calories":"68","protein":"3.7","fat":"4.8","carbs":"3.7","fatPercent":39.34,"carbPercent":30.33,"proteinPercent":30.33},
{"id":398,"name":"Onion Raitha","calories":"73","protein":"4","fat":"5","carbs":"2","fatPercent":45.45,"carbPercent":18.18,"proteinPercent":36.36},
{"id":399,"name":"Tomato Raitha","calories":"126","protein":"7","fat":"7","carbs":"5","fatPercent":36.84,"carbPercent":26.32,"proteinPercent":36.84},
{"id":400,"name":"Aloo Raitha","calories":"100","protein":"12","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":401,"name":"Banana Raitha","calories":"89","protein":"23","fat":"0","carbs":"1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":402,"name":"Pineapple Raitha","calories":"30","protein":"3","fat":"0","carbs":"0.5","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":403,"name":"Boondhi Raitha","calories":"170","protein":"12","fat":"12","carbs":"3","fatPercent":44.44,"carbPercent":11.11,"proteinPercent":44.44},
{"id":404,"name":"Steamed Rice ( Normal )","calories":"205","protein":"39","fat":"0.1","carbs":"4.3","fatPercent":0.23,"carbPercent":9.91,"proteinPercent":89.86},
{"id":405,"name":"Steamed Rice (Basmati)","calories":"220","protein":"44","fat":"3","carbs":"6","fatPercent":5.66,"carbPercent":11.32,"proteinPercent":83.02},
{"id":406,"name":"Veg Biriyani","calories":"230","protein":"33","fat":"8.5","carbs":"5","fatPercent":18.28,"carbPercent":10.75,"proteinPercent":70.97},
{"id":407,"name":"Paneer Biryani","calories":"330","protein":"33","fat":"16","carbs":"12","fatPercent":26.23,"carbPercent":19.67,"proteinPercent":54.1},
{"id":408,"name":"Mushroom Biriyani","calories":"260","protein":"30","fat":"6","carbs":"5","fatPercent":14.63,"carbPercent":12.2,"proteinPercent":73.17},
{"id":409,"name":"Gobi Biriyani","calories":"245","protein":"40","fat":"6","carbs":"5","fatPercent":11.76,"carbPercent":9.8,"proteinPercent":78.43},
{"id":410,"name":"Paneer Tikka","calories":"370","protein":"41","fat":"20","carbs":"11","fatPercent":27.78,"carbPercent":15.28,"proteinPercent":56.94},
{"id":411,"name":"Mushroom Tikka","calories":"227","protein":"18","fat":"15","carbs":"7","fatPercent":37.5,"carbPercent":17.5,"proteinPercent":45},
{"id":412,"name":"Malai Paneer Tikka","calories":"290","protein":"4.7","fat":"25.6","carbs":"12","fatPercent":60.52,"carbPercent":28.37,"proteinPercent":11.11},
{"id":413,"name":"Rohini Paneer Tikka","calories":"292","protein":"4.9","fat":"25.8","carbs":"14","fatPercent":57.72,"carbPercent":31.32,"proteinPercent":10.96},
{"id":414,"name":"Rohini Gobi Tikka","calories":"55","protein":"6.4","fat":"2.7","carbs":"2.8","fatPercent":22.69,"carbPercent":23.53,"proteinPercent":53.78},
{"id":415,"name":"Veg Sheek kabab","calories":"269","protein":"3.7","fat":"21.9","carbs":"12.9","fatPercent":56.88,"carbPercent":33.51,"proteinPercent":9.61},
{"id":416,"name":"Mushroom Dhilyeri Tikka","calories":"335","protein":"7.7","fat":"23.7","carbs":"21.4","fatPercent":44.89,"carbPercent":40.53,"proteinPercent":14.58},
{"id":417,"name":"Paneer Roll Masala","calories":"221","protein":"14.8","fat":"20.8","carbs":"7.8","fatPercent":47.93,"carbPercent":17.97,"proteinPercent":34.1},
{"id":418,"name":"Paneer Jalfrezi","calories":"217","protein":"13","fat":"20.1","carbs":"7.1","fatPercent":50,"carbPercent":17.66,"proteinPercent":32.34},
{"id":423,"name":"neer dosa","calories":"78","protein":"17","fat":"1","carbs":"1","fatPercent":5.26,"carbPercent":5.26,"proteinPercent":89.47},
{"id":450,"name":"Valaka Bhajji","calories":"180","protein":"22.7","fat":"15.6","carbs":"4.6","fatPercent":36.36,"carbPercent":10.72,"proteinPercent":52.91},
{"id":451,"name":"Banana Flower Bhajji","calories":"124","protein":"16.3","fat":"4.8","carbs":"4.6","fatPercent":18.68,"carbPercent":17.9,"proteinPercent":63.42},
{"id":452,"name":"Valapoo Bhajji","calories":"124","protein":"16.3","fat":"4.8","carbs":"4.6","fatPercent":18.68,"carbPercent":17.9,"proteinPercent":63.42},
{"id":453,"name":"banana bajji","calories":"243","protein":"22.7","fat":"15.6","carbs":"4.6","fatPercent":36.36,"carbPercent":10.72,"proteinPercent":52.91},
{"id":454,"name":"Sweet Puttu with Banana Pieces","calories":"176","protein":"30","fat":"1","carbs":"3","fatPercent":2.94,"carbPercent":8.82,"proteinPercent":88.24},
{"id":455,"name":"Sambhar","calories":"224","protein":"42","fat":"4","carbs":"10","fatPercent":7.14,"carbPercent":17.86,"proteinPercent":75},
{"id":456,"name":"Rasam","calories":"45","protein":"5","fat":"3","carbs":"2","fatPercent":30,"carbPercent":20,"proteinPercent":50},
{"id":457,"name":"Thick Butter Milk","calories":"130","protein":"12","fat":"7","carbs":"6","fatPercent":28,"carbPercent":24,"proteinPercent":48},
{"id":458,"name":"Rice Payasam","calories":"350","protein":"13","fat":"4","carbs":"10","fatPercent":14.81,"carbPercent":37.04,"proteinPercent":48.15},
{"id":459,"name":"Vermicelli Payasam","calories":"360","protein":"35","fat":"2","carbs":"4","fatPercent":4.88,"carbPercent":9.76,"proteinPercent":85.37},
{"id":460,"name":"Jaggery Payasam","calories":"260","protein":"22","fat":"10","carbs":"13","fatPercent":22.22,"carbPercent":28.89,"proteinPercent":48.89},
{"id":461,"name":"garlic chicken","calories":"246","protein":"7.5","fat":"16","carbs":"18.5","fatPercent":38.1,"carbPercent":44.05,"proteinPercent":17.86},
{"id":462,"name":"ginger chicken","calories":"254","protein":"15.5","fat":"4.8","carbs":"36.7","fatPercent":8.42,"carbPercent":64.39,"proteinPercent":27.19},
{"id":463,"name":"pepper chicken","calories":"140","protein":"2","fat":"6","carbs":"19","fatPercent":22.22,"carbPercent":70.37,"proteinPercent":7.41},
{"id":464,"name":"paal payasam","calories":"420","protein":"50","fat":"10","carbs":"12","fatPercent":13.89,"carbPercent":16.67,"proteinPercent":69.44},
{"id":465,"name":"moong dhal payasam","calories":"269","protein":"63","fat":"10","carbs":"13","fatPercent":11.63,"carbPercent":15.12,"proteinPercent":73.26},
{"id":466,"name":"puli kozhambu","calories":"260","protein":"30","fat":"10","carbs":"6","fatPercent":21.74,"carbPercent":13.04,"proteinPercent":65.22},
{"id":467,"name":"poondu kozhambu","calories":"133","protein":"8","fat":"12","carbs":"1","fatPercent":57.14,"carbPercent":4.76,"proteinPercent":38.1},
{"id":468,"name":"Onion chutney","calories":"132","protein":"24","fat":"3","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":469,"name":"kaara podi","calories":"150","protein":"40","fat":"0","carbs":"3","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":470,"name":"vendakai karakozhambu","calories":"130","protein":"25","fat":"5","carbs":"1","fatPercent":16.13,"carbPercent":3.23,"proteinPercent":80.65},
{"id":471,"name":"kathrika karakozhambu","calories":"125","protein":"10","fat":"2","carbs":"2","fatPercent":14.29,"carbPercent":14.29,"proteinPercent":71.43},
{"id":472,"name":"aavakai oorukai","calories":"150","protein":"25","fat":"15","carbs":"1","fatPercent":36.59,"carbPercent":2.44,"proteinPercent":60.98},
{"id":473,"name":"podalanga kootu","calories":"60","protein":"15","fat":"5","carbs":"4","fatPercent":20.83,"carbPercent":16.67,"proteinPercent":62.5},
{"id":474,"name":"parupu kootu","calories":"110","protein":"11","fat":"5","carbs":"6","fatPercent":22.73,"carbPercent":27.27,"proteinPercent":50},
{"id":475,"name":"Pachadi","calories":"25","protein":"2","fat":"2","carbs":"1","fatPercent":40,"carbPercent":20,"proteinPercent":40},
{"id":476,"name":"Paniyaram","calories":"160","protein":"30","fat":"15","carbs":"5","fatPercent":30,"carbPercent":10,"proteinPercent":60},
{"id":477,"name":"Papadum","calories":"80","protein":"14","fat":"3","carbs":"4","fatPercent":14.29,"carbPercent":19.05,"proteinPercent":66.67},
{"id":478,"name":"Papad jeera","calories":"40","protein":"7","fat":"3","carbs":"3","fatPercent":23.08,"carbPercent":23.08,"proteinPercent":53.85},
{"id":479,"name":"urad dhal papad","calories":"31","protein":"5","fat":"2","carbs":"2","fatPercent":22.22,"carbPercent":22.22,"proteinPercent":55.56},
{"id":480,"name":"Paruppu sadam","calories":"423","protein":"57","fat":"11","carbs":"19","fatPercent":12.64,"carbPercent":21.84,"proteinPercent":65.52},
{"id":481,"name":"kichadi","calories":"180","protein":"59","fat":"5","carbs":"8","fatPercent":6.94,"carbPercent":11.11,"proteinPercent":81.94},
{"id":482,"name":"Pesarattu","calories":"164","protein":"15","fat":"7","carbs":"9","fatPercent":22.58,"carbPercent":29.03,"proteinPercent":48.39},
{"id":483,"name":"Pongal","calories":"192","protein":"30","fat":"3","carbs":"6","fatPercent":7.69,"carbPercent":15.38,"proteinPercent":76.92},
{"id":484,"name":"Poriyal","calories":"150","protein":"12","fat":"3","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":485,"name":"Puli sadam","calories":"215","protein":"32","fat":"5","carbs":"1.5","fatPercent":12.99,"carbPercent":3.9,"proteinPercent":83.12},
{"id":486,"name":"vegetable briyani","calories":"148","protein":"26","fat":"4","carbs":"3","fatPercent":12.12,"carbPercent":9.09,"proteinPercent":78.79},
{"id":487,"name":"chickpea curry","calories":"148","protein":"18","fat":"6","carbs":"6","fatPercent":20,"carbPercent":20,"proteinPercent":60},
{"id":488,"name":"appam","calories":"120","protein":"20","fat":"10","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":489,"name":"tiffen sambar","calories":"114","protein":"26","fat":"1","carbs":"5","fatPercent":3.12,"carbPercent":15.62,"proteinPercent":81.25},
{"id":490,"name":"mushroom briyani","calories":"208","protein":"25","fat":"4","carbs":"6","fatPercent":11.43,"carbPercent":17.14,"proteinPercent":71.43},
{"id":491,"name":"lemon rice","calories":"190","protein":"39","fat":"2","carbs":"4","fatPercent":4.44,"carbPercent":8.89,"proteinPercent":86.67},
{"id":492,"name":"tomato rice","calories":"159","protein":"18","fat":"7","carbs":"2","fatPercent":25.93,"carbPercent":7.41,"proteinPercent":66.67},
{"id":493,"name":"Hyderabad capsicum curry","calories":"265","protein":"18","fat":"19","carbs":"11","fatPercent":39.58,"carbPercent":22.92,"proteinPercent":37.5},
{"id":494,"name":"rava uthappam","calories":"222","protein":"27","fat":"7","carbs":"5","fatPercent":17.95,"carbPercent":12.82,"proteinPercent":69.23},
{"id":495,"name":"oats idly mix","calories":"377","protein":"58","fat":"1","carbs":"13","fatPercent":1.39,"carbPercent":18.06,"proteinPercent":80.56},
{"id":496,"name":"bread upma","calories":"310","protein":"37","fat":"16","carbs":"9","fatPercent":25.81,"carbPercent":14.52,"proteinPercent":59.68},
{"id":497,"name":"coconut chutney","calories":"60","protein":"1","fat":"4","carbs":"1","fatPercent":66.67,"carbPercent":16.67,"proteinPercent":16.67},
{"id":498,"name":"poori masala","calories":"268","protein":"77","fat":"7","carbs":"10","fatPercent":7.45,"carbPercent":10.64,"proteinPercent":81.91},
{"id":499,"name":"peanut chutney","calories":"85","protein":"3","fat":"7","carbs":"3","fatPercent":53.85,"carbPercent":23.08,"proteinPercent":23.08},
{"id":500,"name":"cauliflower 65","calories":"162","protein":"30","fat":"10","carbs":"4","fatPercent":22.73,"carbPercent":9.09,"proteinPercent":68.18},
{"id":501,"name":"lady's finger poriyal","calories":"85","protein":"18","fat":"3","carbs":"2","fatPercent":13.04,"carbPercent":8.7,"proteinPercent":78.26},
{"id":502,"name":"carrot poriyal","calories":"61","protein":"10","fat":"2","carbs":"1","fatPercent":15.38,"carbPercent":7.69,"proteinPercent":76.92},
{"id":503,"name":"beetroot poriyal","calories":"45","protein":"10","fat":"1","carbs":"2","fatPercent":7.69,"carbPercent":15.38,"proteinPercent":76.92},
{"id":504,"name":"cabbage poriyal","calories":"71","protein":"10","fat":"4","carbs":"3","fatPercent":23.53,"carbPercent":17.65,"proteinPercent":58.82},
{"id":505,"name":"masala vadai","calories":"100","protein":"19","fat":"1","carbs":"5","fatPercent":4,"carbPercent":20,"proteinPercent":76},
{"id":506,"name":"medhu vadai","calories":"80","protein":"12","fat":"2","carbs":"4","fatPercent":11.11,"carbPercent":22.22,"proteinPercent":66.67},
{"id":507,"name":"semmiya","calories":"100","protein":"33","fat":"4","carbs":"6","fatPercent":9.3,"carbPercent":13.95,"proteinPercent":76.74},
{"id":508,"name":"milagu rasam","calories":"70","protein":"13","fat":"1","carbs":"2","fatPercent":6.25,"carbPercent":12.5,"proteinPercent":81.25},
{"id":509,"name":"lemon rasam","calories":"45","protein":"5","fat":"3","carbs":"1","fatPercent":33.33,"carbPercent":11.11,"proteinPercent":55.56},
{"id":510,"name":"kesari","calories":"212","protein":"35","fat":"8","carbs":"3","fatPercent":17.39,"carbPercent":6.52,"proteinPercent":76.09},
{"id":511,"name":"mango rice","calories":"171","protein":"31","fat":"4","carbs":"2","fatPercent":10.81,"carbPercent":5.41,"proteinPercent":83.78},
{"id":512,"name":"carrot rice","calories":"180","protein":"30","fat":"5","carbs":"4","fatPercent":12.82,"carbPercent":10.26,"proteinPercent":76.92},
{"id":513,"name":"ven pongal","calories":"134","protein":"24","fat":"3","carbs":"4","fatPercent":9.68,"carbPercent":12.9,"proteinPercent":77.42},
{"id":514,"name":"sweet pongal","calories":"220","protein":"38","fat":"3","carbs":"4","fatPercent":6.67,"carbPercent":8.89,"proteinPercent":84.44},
{"id":515,"name":"fried idly","calories":"79","protein":"17","fat":"3","carbs":"3","fatPercent":13.04,"carbPercent":13.04,"proteinPercent":73.91},
{"id":516,"name":"Mysore pak","calories":"716","protein":"54","fat":"37","carbs":"13","fatPercent":35.58,"carbPercent":12.5,"proteinPercent":51.92},
{"id":517,"name":"potato peas kurma","calories":"300","protein":"23","fat":"10","carbs":"6","fatPercent":25.64,"carbPercent":15.38,"proteinPercent":58.97},
{"id":518,"name":"Mangalore bun","calories":"169","protein":"26","fat":"6","carbs":"1","fatPercent":18.18,"carbPercent":3.03,"proteinPercent":78.79},
{"id":519,"name":"tamarind rasam","calories":"120","protein":"7","fat":"4","carbs":"2","fatPercent":30.77,"carbPercent":15.38,"proteinPercent":53.85},
{"id":520,"name":"rava ladoo","calories":"303","protein":"46","fat":"12","carbs":"3","fatPercent":19.67,"carbPercent":4.92,"proteinPercent":75.41},
{"id":521,"name":"wheat paniyaram","calories":"169","protein":"30","fat":"5","carbs":"5","fatPercent":12.5,"carbPercent":12.5,"proteinPercent":75},
{"id":522,"name":"whole wheat upma","calories":"156","protein":"22","fat":"2","carbs":"3","fatPercent":7.41,"carbPercent":11.11,"proteinPercent":81.48},
{"id":523,"name":"cracked corn upma","calories":"419","protein":"67","fat":"11","carbs":"14","fatPercent":11.96,"carbPercent":15.22,"proteinPercent":72.83},
{"id":524,"name":"milagu kulambu","calories":"92","protein":"16","fat":"4","carbs":"3","fatPercent":17.39,"carbPercent":13.04,"proteinPercent":69.57},
{"id":525,"name":"milagu vadai","calories":"63","protein":"5","fat":"4","carbs":"3","fatPercent":33.33,"carbPercent":25,"proteinPercent":41.67},
{"id":526,"name":"sooji paniyaram","calories":"114","protein":"17","fat":"3","carbs":"3","fatPercent":13.04,"carbPercent":13.04,"proteinPercent":73.91},
{"id":527,"name":"kuli paniyaram","calories":"40","protein":"8","fat":"2","carbs":"3","fatPercent":15.38,"carbPercent":23.08,"proteinPercent":61.54},
{"id":528,"name":"besan ladoo","calories":"211","protein":"21","fat":"13","carbs":"5","fatPercent":33.33,"carbPercent":12.82,"proteinPercent":53.85},
{"id":529,"name":"beans carrot poriyal","calories":"117","protein":"17","fat":"5","carbs":"4","fatPercent":19.23,"carbPercent":15.38,"proteinPercent":65.38},
{"id":530,"name":"pumpkin poriyal","calories":"75","protein":"16","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":531,"name":"keerai poriyal","calories":"26","protein":"5","fat":"0","carbs":"1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":532,"name":"avakai poriyal","calories":"96","protein":"8","fat":"3","carbs":"6","fatPercent":17.65,"carbPercent":35.29,"proteinPercent":47.06},
{"id":533,"name":"valakai poriyal","calories":"120","protein":"17","fat":"4","carbs":"0.2","fatPercent":18.87,"carbPercent":0.94,"proteinPercent":80.19},
{"id":534,"name":"tomato gojju","calories":"84","protein":"8.6","fat":"5.2","carbs":"0.8","fatPercent":35.62,"carbPercent":5.48,"proteinPercent":58.9},
{"id":535,"name":"bisbelabath","calories":"74","protein":"12","fat":"2","carbs":"2.8","fatPercent":11.9,"carbPercent":16.67,"proteinPercent":71.43},
{"id":536,"name":"Mysore masala dosa","calories":"219","protein":"24","fat":"11","carbs":"3","fatPercent":28.95,"carbPercent":7.89,"proteinPercent":63.16},
{"id":537,"name":"chow chow bath","calories":"94","protein":"18","fat":"6","carbs":"4","fatPercent":21.43,"carbPercent":14.29,"proteinPercent":64.29},
{"id":538,"name":"korri gassi","calories":"520","protein":"42","fat":"23","carbs":"24","fatPercent":25.84,"carbPercent":26.97,"proteinPercent":47.19},
{"id":539,"name":"holige","calories":"385","protein":"56","fat":"16","carbs":"10","fatPercent":19.51,"carbPercent":12.2,"proteinPercent":68.29},
{"id":540,"name":"kanae rava fry","calories":"317","protein":"0","fat":"24","carbs":"20","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":541,"name":"Maddur vada","calories":"110","protein":"15","fat":"5","carbs":"2","fatPercent":22.73,"carbPercent":9.09,"proteinPercent":68.18},
{"id":542,"name":"Coorg pandi curry","calories":"400","protein":"12","fat":"25","carbs":"34","fatPercent":35.21,"carbPercent":47.89,"proteinPercent":16.9},
{"id":543,"name":"Dahi bada","calories":"117","protein":"15","fat":"4","carbs":"5","fatPercent":16.67,"carbPercent":20.83,"proteinPercent":62.5},
{"id":544,"name":"filter coffee","calories":"78","protein":"8","fat":"8","carbs":"2","fatPercent":44.44,"carbPercent":11.11,"proteinPercent":44.44},
{"id":545,"name":"puli koddey","calories":"133","protein":"8","fat":"12","carbs":"1","fatPercent":57.14,"carbPercent":4.76,"proteinPercent":38.1},
{"id":546,"name":"udupi tomato rasam","calories":"86","protein":"13","fat":"1","carbs":"1","fatPercent":6.67,"carbPercent":6.67,"proteinPercent":86.67},
{"id":547,"name":"Koli saru","calories":"322","protein":"10","fat":"15","carbs":"6","fatPercent":48.39,"carbPercent":19.35,"proteinPercent":32.26},
{"id":548,"name":"allugedda","calories":"122","protein":"12","fat":"6","carbs":"2","fatPercent":30,"carbPercent":10,"proteinPercent":60},
{"id":549,"name":"haalbai","calories":"236","protein":"28","fat":"10","carbs":"1","fatPercent":25.64,"carbPercent":2.56,"proteinPercent":71.79},
{"id":550,"name":"Mysore bonda","calories":"70","protein":"13","fat":"1","carbs":"3","fatPercent":5.88,"carbPercent":17.65,"proteinPercent":76.47},
{"id":551,"name":"Pori urundai","calories":"364","protein":"92","fat":"2","carbs":"4","fatPercent":2.04,"carbPercent":4.08,"proteinPercent":93.88},
{"id":552,"name":"chiroti","calories":"344","protein":"76","fat":"1","carbs":"10","fatPercent":1.15,"carbPercent":11.49,"proteinPercent":87.36},
{"id":553,"name":"baby potato fry","calories":"145","protein":"18","fat":"5","carbs":"2","fatPercent":20,"carbPercent":8,"proteinPercent":72},
{"id":554,"name":"Channa briyani","calories":"331","protein":"42","fat":"5","carbs":"6","fatPercent":9.43,"carbPercent":11.32,"proteinPercent":79.25},
{"id":555,"name":"potato kurma","calories":"233","protein":"30","fat":"15","carbs":"2","fatPercent":31.91,"carbPercent":4.26,"proteinPercent":63.83},
{"id":556,"name":"banana paniyaram","calories":"114","protein":"12","fat":"1","carbs":"2","fatPercent":6.67,"carbPercent":13.33,"proteinPercent":80},
{"id":557,"name":"arachivitta sambar","calories":"150","protein":"26","fat":"1","carbs":"11","fatPercent":2.63,"carbPercent":28.95,"proteinPercent":68.42},
{"id":559,"name":"baby potato briyani","calories":"313","protein":"30","fat":"5","carbs":"3","fatPercent":13.16,"carbPercent":7.89,"proteinPercent":78.95},
{"id":560,"name":"mulagi sambar","calories":"45","protein":"3","fat":"1","carbs":"2","fatPercent":16.67,"carbPercent":33.33,"proteinPercent":50},
{"id":561,"name":"mushroom pepper fry","calories":"93","protein":"10","fat":"4","carbs":"5","fatPercent":21.05,"carbPercent":26.32,"proteinPercent":52.63},
{"id":562,"name":"beetroot rice","calories":"69","protein":"9","fat":"3","carbs":"2","fatPercent":21.43,"carbPercent":14.29,"proteinPercent":64.29},
{"id":563,"name":"pal payasam","calories":"170","protein":"27","fat":"5","carbs":"5","fatPercent":13.51,"carbPercent":13.51,"proteinPercent":72.97},
{"id":564,"name":"coconut milk rice","calories":"236","protein":"8","fat":"37","carbs":"3","fatPercent":77.08,"carbPercent":6.25,"proteinPercent":16.67},
{"id":565,"name":"brinjal sambar","calories":"110","protein":"15","fat":"4","carbs":"5","fatPercent":16.67,"carbPercent":20.83,"proteinPercent":62.5},
{"id":566,"name":"yam fry","calories":"170","protein":"40","fat":"5","carbs":"2","fatPercent":10.64,"carbPercent":4.26,"proteinPercent":85.11},
{"id":567,"name":"Andhra mango pickle","calories":"245","protein":"15","fat":"20","carbs":"1","fatPercent":55.56,"carbPercent":2.78,"proteinPercent":41.67},
{"id":568,"name":"oats uthappam","calories":"200","protein":"40","fat":"5","carbs":"10","fatPercent":9.09,"carbPercent":18.18,"proteinPercent":72.73},
{"id":569,"name":"kadalai curry","calories":"241","protein":"30","fat":"10","carbs":"10","fatPercent":20,"carbPercent":20,"proteinPercent":60},
{"id":570,"name":"cabbage Vadai","calories":"120","protein":"16","fat":"3","carbs":"3","fatPercent":13.64,"carbPercent":13.64,"proteinPercent":72.73},
{"id":571,"name":"Malabar spinach with chick peas","calories":"86","protein":"6","fat":"2","carbs":"5","fatPercent":15.38,"carbPercent":38.46,"proteinPercent":46.15},
{"id":572,"name":"beans poriyal","calories":"45","protein":"5","fat":"3","carbs":"0.3","fatPercent":36.14,"carbPercent":3.61,"proteinPercent":60.24},
{"id":573,"name":"chicken kurma","calories":"233","protein":"3","fat":"8","carbs":"14","fatPercent":32,"carbPercent":56,"proteinPercent":12},
{"id":574,"name":"cabbage thoran","calories":"57","protein":"6","fat":"4","carbs":"1","fatPercent":36.36,"carbPercent":9.09,"proteinPercent":54.55},
{"id":575,"name":"punugulu","calories":"160","protein":"30","fat":"5","carbs":"5","fatPercent":12.5,"carbPercent":12.5,"proteinPercent":75},
{"id":576,"name":"arbi roast","calories":"112","protein":"26","fat":"5","carbs":"2","fatPercent":15.15,"carbPercent":6.06,"proteinPercent":78.79},
{"id":577,"name":"green peas sundal","calories":"125","protein":"19","fat":"5","carbs":"7","fatPercent":16.13,"carbPercent":22.58,"proteinPercent":61.29},
{"id":578,"name":"aviyal","calories":"110","protein":"23","fat":"1","carbs":"1","fatPercent":4,"carbPercent":4,"proteinPercent":92},
{"id":579,"name":"garlic rasam","calories":"45","protein":"5","fat":"3","carbs":"2","fatPercent":30,"carbPercent":20,"proteinPercent":50},
{"id":580,"name":"ukundhu vada","calories":"100","protein":"19","fat":"1","carbs":"5","fatPercent":4,"carbPercent":20,"proteinPercent":76},
{"id":581,"name":"Gooseberry pickle","calories":"45","protein":"2","fat":"3","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":582,"name":"instant mango pickle","calories":"40","protein":"2","fat":"3","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":583,"name":"ragi malt","calories":"365","protein":"73","fat":"1","carbs":"13","fatPercent":1.15,"carbPercent":14.94,"proteinPercent":83.91},
{"id":584,"name":"rice upma","calories":"179","protein":"29","fat":"4","carbs":"3","fatPercent":11.11,"carbPercent":8.33,"proteinPercent":80.56},
{"id":585,"name":"paruppu rasam","calories":"76","protein":"15","fat":"2","carbs":"4","fatPercent":9.52,"carbPercent":19.05,"proteinPercent":71.43},
{"id":586,"name":"uthappam","calories":"200","protein":"40","fat":"5","carbs":"10","fatPercent":9.09,"carbPercent":18.18,"proteinPercent":72.73},
{"id":587,"name":"pumpkin sambar","calories":"168","protein":"25","fat":"5","carbs":"6","fatPercent":13.89,"carbPercent":16.67,"proteinPercent":69.44},
{"id":588,"name":"ivygourd with chick peas","calories":"220","protein":"36","fat":"5","carbs":"10","fatPercent":9.8,"carbPercent":19.61,"proteinPercent":70.59},
{"id":589,"name":"paneer ghee roast","calories":"115","protein":"4","fat":"8","carbs":"6","fatPercent":44.44,"carbPercent":33.33,"proteinPercent":22.22},
{"id":590,"name":"maladoo","calories":"121","protein":"9.6","fat":"6.5","carbs":"1.6","fatPercent":36.72,"carbPercent":9.04,"proteinPercent":54.24},
{"id":591,"name":"vendakai sambar","calories":"130","protein":"8","fat":"7","carbs":"4","fatPercent":36.84,"carbPercent":21.05,"proteinPercent":42.11},
{"id":592,"name":"mix veg sagu","calories":"86","protein":"12","fat":"2","carbs":"3","fatPercent":11.76,"carbPercent":17.65,"proteinPercent":70.59},
{"id":593,"name":"pumpkin errissery","calories":"26","protein":"7","fat":"1","carbs":"1","fatPercent":11.11,"carbPercent":11.11,"proteinPercent":77.78},
{"id":594,"name":"cabbage pachandi","calories":"30","protein":"5","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":595,"name":"idly podi","calories":"50","protein":"5","fat":"3","carbs":"2","fatPercent":30,"carbPercent":20,"proteinPercent":50},
{"id":596,"name":"Maddie vada","calories":"71","protein":"6","fat":"4","carbs":"2","fatPercent":33.33,"carbPercent":16.67,"proteinPercent":50},
{"id":597,"name":"potato rice","calories":"132","protein":"4","fat":"2","carbs":"3","fatPercent":22.22,"carbPercent":33.33,"proteinPercent":44.44},
{"id":598,"name":"parupu urundai kulambu","calories":"110","protein":"8","fat":"4","carbs":"3","fatPercent":26.67,"carbPercent":20,"proteinPercent":53.33},
{"id":599,"name":"purple cabbage","calories":"22","protein":"5","fat":"1","carbs":"1","fatPercent":14.29,"carbPercent":14.29,"proteinPercent":71.43},
{"id":600,"name":"pauppusli","calories":"100","protein":"18","fat":"4","carbs":"5","fatPercent":14.81,"carbPercent":18.52,"proteinPercent":66.67},
{"id":601,"name":"paruppu thogayal","calories":"166","protein":"28","fat":"5","carbs":"12","fatPercent":11.11,"carbPercent":26.67,"proteinPercent":62.22},
{"id":602,"name":"peanut chikki","calories":"523","protein":"36","fat":"33","carbs":"21","fatPercent":36.67,"carbPercent":23.33,"proteinPercent":40},
{"id":603,"name":"moong dal payasam","calories":"260","protein":"63","fat":"10","carbs":"13","fatPercent":11.63,"carbPercent":15.12,"proteinPercent":73.26},
{"id":604,"name":"Rava kheer","calories":"359","protein":"13","fat":"5","carbs":"10","fatPercent":17.86,"carbPercent":35.71,"proteinPercent":46.43},
{"id":605,"name":"aval payasam","calories":"120","protein":"10","fat":"5","carbs":"1.5","fatPercent":30.3,"carbPercent":9.09,"proteinPercent":60.61},
{"id":606,"name":"zucchini fry","calories":"60","protein":"5","fat":"4","carbs":"1","fatPercent":40,"carbPercent":10,"proteinPercent":50},
{"id":607,"name":"egg briyani","calories":"408","protein":"48","fat":"15","carbs":"17","fatPercent":18.75,"carbPercent":21.25,"proteinPercent":60},
{"id":608,"name":"chicken briyani","calories":"225","protein":"34","fat":"10","carbs":"16","fatPercent":16.67,"carbPercent":26.67,"proteinPercent":56.67},
{"id":609,"name":"mutton briyani","calories":"387","protein":"51","fat":"10","carbs":"24","fatPercent":11.76,"carbPercent":28.24,"proteinPercent":60},
{"id":610,"name":"brinjal rice","calories":"195","protein":"18","fat":"2","carbs":"3","fatPercent":8.7,"carbPercent":13.04,"proteinPercent":78.26},
{"id":611,"name":"sesame chutney","calories":"60","protein":"3","fat":"5","carbs":"1","fatPercent":55.56,"carbPercent":11.11,"proteinPercent":33.33},
{"id":612,"name":"banana fry","calories":"131","protein":"21","fat":"5","carbs":"6","fatPercent":15.62,"carbPercent":18.75,"proteinPercent":65.62},
{"id":613,"name":"akki uppitu","calories":"159","protein":"24","fat":"3","carbs":"2","fatPercent":10.34,"carbPercent":6.9,"proteinPercent":82.76},
{"id":614,"name":"urad dhal ladoo","calories":"310","protein":"39","fat":"0","carbs":"5","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":615,"name":"Mangalore bonda","calories":"79","protein":"13","fat":"1","carbs":"3","fatPercent":5.88,"carbPercent":17.65,"proteinPercent":76.47},
{"id":616,"name":"ashgourd halwa","calories":"201","protein":"34","fat":"7","carbs":"1","fatPercent":16.67,"carbPercent":2.38,"proteinPercent":80.95},
{"id":617,"name":"foxtail millet dosa","calories":"132","protein":"19","fat":"6","carbs":"4","fatPercent":20.69,"carbPercent":13.79,"proteinPercent":65.52},
{"id":618,"name":"drumstick rasam","calories":"45","protein":"5","fat":"2","carbs":"0.2","fatPercent":27.78,"carbPercent":2.78,"proteinPercent":69.44},
{"id":619,"name":"yellow channa sundal","calories":"90","protein":"9","fat":"5","carbs":"2","fatPercent":31.25,"carbPercent":12.5,"proteinPercent":56.25},
{"id":620,"name":"neer more","calories":"16","protein":"2","fat":"1","carbs":"0.5","fatPercent":28.57,"carbPercent":14.29,"proteinPercent":57.14},
{"id":621,"name":"cauliflower thoran","calories":"110","protein":"10","fat":"5","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":622,"name":"podi idly","calories":"95","protein":"5","fat":"3","carbs":"3","fatPercent":27.27,"carbPercent":27.27,"proteinPercent":45.45},
{"id":623,"name":"omapodi","calories":"130","protein":"12","fat":"9","carbs":"3","fatPercent":37.5,"carbPercent":12.5,"proteinPercent":50},
{"id":624,"name":"banana rasayana","calories":"89","protein":"23","fat":"0","carbs":"1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":625,"name":"ulli chammanthi chutney","calories":"25","protein":"4","fat":"1","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":626,"name":"potato chicken curry","calories":"300","protein":"29","fat":"5","carbs":"24","fatPercent":8.62,"carbPercent":41.38,"proteinPercent":50},
{"id":627,"name":"poricha kulambu","calories":"64","protein":"11","fat":"1","carbs":"3","fatPercent":6.67,"carbPercent":20,"proteinPercent":73.33},
{"id":628,"name":"rava pongal","calories":"253","protein":"26","fat":"4","carbs":"7","fatPercent":10.81,"carbPercent":18.92,"proteinPercent":70.27},
{"id":629,"name":"Kerala curry","calories":"49","protein":"6","fat":"2","carbs":"1","fatPercent":22.22,"carbPercent":11.11,"proteinPercent":66.67},
{"id":630,"name":"mixed vegetable vada","calories":"186","protein":"23","fat":"8","carbs":"6","fatPercent":21.62,"carbPercent":16.22,"proteinPercent":62.16},
{"id":631,"name":"mirch ka salan","calories":"220","protein":"9","fat":"18","carbs":"5","fatPercent":56.25,"carbPercent":15.62,"proteinPercent":28.12},
{"id":632,"name":"peanut rice","calories":"380","protein":"63","fat":"9","carbs":"10","fatPercent":10.98,"carbPercent":12.2,"proteinPercent":76.83},
{"id":633,"name":"pudina thovaiyal","calories":"17","protein":"4","fat":"0.2","carbs":"0.2","fatPercent":4.55,"carbPercent":4.55,"proteinPercent":90.91},
{"id":634,"name":"sabudana bonda","calories":"75","protein":"10","fat":"3","carbs":"1","fatPercent":21.43,"carbPercent":7.14,"proteinPercent":71.43},
{"id":635,"name":"tapioca curry","calories":"151","protein":"22","fat":"7","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":636,"name":"valaipoo poriyal","calories":"89","protein":"23","fat":"0","carbs":"1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":637,"name":"ivygourd poriyal","calories":"45","protein":"10","fat":"1","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":638,"name":"Kara boondhi","calories":"548","protein":"52","fat":"32","carbs":"10","fatPercent":34.04,"carbPercent":10.64,"proteinPercent":55.32},
{"id":639,"name":"lemon pickle","calories":"13","protein":"3","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":640,"name":"Hyderabad pulao","calories":"248","protein":"38","fat":"8","carbs":"6","fatPercent":15.38,"carbPercent":11.54,"proteinPercent":73.08},
{"id":641,"name":"valaipoo vadai","calories":"182","protein":"16","fat":"5","carbs":"5","fatPercent":19.23,"carbPercent":19.23,"proteinPercent":61.54},
{"id":642,"name":"ellu murukku","calories":"189","protein":"36","fat":"1","carbs":"4","fatPercent":2.44,"carbPercent":9.76,"proteinPercent":87.8},
{"id":643,"name":"kathrikai murugakai kottu","calories":"199","protein":"17","fat":"11","carbs":"10","fatPercent":28.95,"carbPercent":26.32,"proteinPercent":44.74},
{"id":644,"name":"sweetcorn","calories":"86","protein":"19","fat":"1","carbs":"3","fatPercent":4.35,"carbPercent":13.04,"proteinPercent":82.61},
{"id":645,"name":"avarakai poriyal","calories":"97","protein":"6","fat":"8","carbs":"2","fatPercent":50,"carbPercent":12.5,"proteinPercent":37.5},
{"id":646,"name":"nanari sarbath","calories":"280","protein":"70","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":647,"name":"thakali pachadi","calories":"82","protein":"14","fat":"2","carbs":"3","fatPercent":10.53,"carbPercent":15.79,"proteinPercent":73.68},
{"id":648,"name":"tomato juice","calories":"59","protein":"10","fat":"0","carbs":"2","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":649,"name":"semiya kesari","calories":"248","protein":"44","fat":"7","carbs":"2","fatPercent":13.21,"carbPercent":3.77,"proteinPercent":83.02},
{"id":650,"name":"pineapple payasam","calories":"215","protein":"42","fat":"3","carbs":"5","fatPercent":6,"carbPercent":10,"proteinPercent":84},
{"id":651,"name":"thenai kesari","calories":"386","protein":"73","fat":"4","carbs":"12","fatPercent":4.49,"carbPercent":13.48,"proteinPercent":82.02},
{"id":652,"name":"Andhra mango sambar","calories":"184","protein":"30","fat":"4","carbs":"9","fatPercent":9.3,"carbPercent":20.93,"proteinPercent":69.77},
{"id":653,"name":"Kanchipuram idly","calories":"140","protein":"40","fat":"5","carbs":"6","fatPercent":9.8,"carbPercent":11.76,"proteinPercent":78.43},
{"id":654,"name":"amaranth sambar","calories":"159","protein":"26","fat":"3","carbs":"11","fatPercent":7.5,"carbPercent":27.5,"proteinPercent":65},
{"id":655,"name":"rice puttu","calories":"209","protein":"40","fat":"4","carbs":"3","fatPercent":8.51,"carbPercent":6.38,"proteinPercent":85.11},
{"id":656,"name":"oats puttu","calories":"247","protein":"42","fat":"7","carbs":"8","fatPercent":12.28,"carbPercent":14.04,"proteinPercent":73.68},
{"id":657,"name":"boorelu","calories":"108","protein":"11","fat":"7","carbs":"1","fatPercent":36.84,"carbPercent":5.26,"proteinPercent":57.89},
{"id":658,"name":"Channa dhal sundal","calories":"92","protein":"14","fat":"3","carbs":"4","fatPercent":14.29,"carbPercent":19.05,"proteinPercent":66.67},
{"id":659,"name":"masala pori","calories":"235","protein":"30","fat":"5","carbs":"6","fatPercent":12.2,"carbPercent":14.63,"proteinPercent":73.17},
{"id":660,"name":"vathal kulambu","calories":"133","protein":"8","fat":"13","carbs":"1","fatPercent":59.09,"carbPercent":4.55,"proteinPercent":36.36},
{"id":661,"name":"vendhaiya mor kulambu","calories":"48","protein":"3","fat":"5","carbs":"2","fatPercent":50,"carbPercent":20,"proteinPercent":30},
{"id":662,"name":"Channa dhal modak","calories":"187","protein":"32","fat":"6","carbs":"2","fatPercent":15,"carbPercent":5,"proteinPercent":80},
{"id":663,"name":"mirchi bhajji","calories":"142","protein":"17","fat":"6","carbs":"5","fatPercent":21.43,"carbPercent":17.86,"proteinPercent":60.71},
{"id":664,"name":"curd rasam","calories":"57","protein":"11","fat":"1","carbs":"1","fatPercent":7.69,"carbPercent":7.69,"proteinPercent":84.62},
{"id":665,"name":"Channa dhal payasam","calories":"316","protein":"47","fat":"2","carbs":"22","fatPercent":2.82,"carbPercent":30.99,"proteinPercent":66.2},
{"id":666,"name":"butter muruku","calories":"559","protein":"53","fat":"35","carbs":"5","fatPercent":37.63,"carbPercent":5.38,"proteinPercent":56.99},
{"id":667,"name":"ginger chutney","calories":"30","protein":"4","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":668,"name":"Kerala nei soru","calories":"168","protein":"27","fat":"5","carbs":"4","fatPercent":13.89,"carbPercent":11.11,"proteinPercent":75},
{"id":669,"name":"pudina chutney","calories":"17","protein":"4","fat":"0","carbs":"1","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":670,"name":"sabudana payasam","calories":"238","protein":"45","fat":"12","carbs":"4","fatPercent":19.67,"carbPercent":6.56,"proteinPercent":73.77},
{"id":671,"name":"kottu curry","calories":"269","protein":"39","fat":"10","carbs":"3","fatPercent":19.23,"carbPercent":5.77,"proteinPercent":75},
{"id":672,"name":"rava vada","calories":"468","protein":"80","fat":"5","carbs":"14","fatPercent":5.05,"carbPercent":14.14,"proteinPercent":80.81},
{"id":673,"name":"beetroot rasam","calories":"45","protein":"6","fat":"2","carbs":"1","fatPercent":22.22,"carbPercent":11.11,"proteinPercent":66.67},
{"id":674,"name":"pineapple rasam","calories":"60","protein":"8","fat":"1","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":675,"name":"mango kesari","calories":"248","protein":"44","fat":"7","carbs":"2","fatPercent":13.21,"carbPercent":3.77,"proteinPercent":83.02},
{"id":676,"name":"mushroom 65","calories":"56","protein":"2","fat":"1","carbs":"3","fatPercent":16.67,"carbPercent":50,"proteinPercent":33.33},
{"id":677,"name":"thatai","calories":"150","protein":"16","fat":"8","carbs":"2","fatPercent":30.77,"carbPercent":7.69,"proteinPercent":61.54},
{"id":678,"name":"murukuu","calories":"121","protein":"10","fat":"7","carbs":"1","fatPercent":38.89,"carbPercent":5.56,"proteinPercent":55.56},
{"id":679,"name":"curd vada","calories":"131","protein":"22","fat":"0","carbs":"11","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":680,"name":"Channa masala","calories":"189","protein":"33","fat":"2","carbs":"7","fatPercent":4.76,"carbPercent":16.67,"proteinPercent":78.57},
{"id":681,"name":"mint rasam","calories":"45","protein":"5","fat":"3","carbs":"1","fatPercent":33.33,"carbPercent":11.11,"proteinPercent":55.56},
{"id":682,"name":"koorka fry","calories":"100","protein":"15","fat":"3","carbs":"4","fatPercent":13.64,"carbPercent":18.18,"proteinPercent":68.18},
{"id":683,"name":"dum aloo briyani","calories":"289","protein":"39","fat":"5","carbs":"10","fatPercent":9.26,"carbPercent":18.52,"proteinPercent":72.22},
{"id":684,"name":"dibba roti","calories":"254","protein":"32","fat":"5","carbs":"4","fatPercent":12.2,"carbPercent":9.76,"proteinPercent":78.05},
{"id":685,"name":"capsicum chutney","calories":"11","protein":"2","fat":"1","carbs":"1","fatPercent":25,"carbPercent":25,"proteinPercent":50},
{"id":686,"name":"moongdhal kosambari","calories":"87","protein":"9","fat":"4","carbs":"4","fatPercent":23.53,"carbPercent":23.53,"proteinPercent":52.94},
{"id":687,"name":"ribbon pakoda","calories":"641","protein":"45","fat":"44","carbs":"9","fatPercent":44.9,"carbPercent":9.18,"proteinPercent":45.92},
{"id":688,"name":"black eyed pea curry","calories":"258","protein":"42","fat":"4","carbs":"16","fatPercent":6.45,"carbPercent":25.81,"proteinPercent":67.74},
{"id":689,"name":"banana peel thoran","calories":"189","protein":"24","fat":"8","carbs":"3","fatPercent":22.86,"carbPercent":8.57,"proteinPercent":68.57},
{"id":690,"name":"carrot chutney","calories":"39","protein":"8","fat":"2","carbs":"0.3","fatPercent":19.42,"carbPercent":2.91,"proteinPercent":77.67},
{"id":691,"name":"baby corn curry","calories":"47","protein":"4","fat":"1","carbs":"2","fatPercent":14.29,"carbPercent":28.57,"proteinPercent":57.14},
{"id":692,"name":"brinjal thoran","calories":"146","protein":"15","fat":"8","carbs":"4","fatPercent":29.63,"carbPercent":14.81,"proteinPercent":55.56},
{"id":693,"name":"papaya thoran","calories":"26","protein":"2","fat":"1","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":694,"name":"beans thoran","calories":"85","protein":"11","fat":"4","carbs":"3","fatPercent":22.22,"carbPercent":16.67,"proteinPercent":61.11},
{"id":695,"name":"Kerala style thoran","calories":"35","protein":"8","fat":"0","carbs":"2","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":696,"name":"beetroot thoran","calories":"100","protein":"4","fat":"5","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":697,"name":"sundakkai kulambu","calories":"256","protein":"27","fat":"15","carbs":"5","fatPercent":31.91,"carbPercent":10.64,"proteinPercent":57.45},
{"id":698,"name":"poricha pathiri","calories":"376","protein":"70","fat":"8","carbs":"6","fatPercent":9.52,"carbPercent":7.14,"proteinPercent":83.33},
{"id":699,"name":"varugu Pongal","calories":"300","protein":"66","fat":"9","carbs":"8","fatPercent":10.84,"carbPercent":9.64,"proteinPercent":79.52},
{"id":700,"name":"Kerala chicken curry","calories":"349","protein":"7","fat":"22","carbs":"26","fatPercent":40,"carbPercent":47.27,"proteinPercent":12.73},
{"id":701,"name":"Kerala fish curry","calories":"131","protein":"3","fat":"11","carbs":"5","fatPercent":57.89,"carbPercent":26.32,"proteinPercent":15.79},
{"id":702,"name":"paruppu","calories":"165","protein":"24","fat":"4","carbs":"10","fatPercent":10.53,"carbPercent":26.32,"proteinPercent":63.16},
{"id":703,"name":"pudhina rice","calories":"316","protein":"61","fat":"20","carbs":"5","fatPercent":23.26,"carbPercent":5.81,"proteinPercent":70.93},
{"id":704,"name":"oats pudhina","calories":"360","protein":"64","fat":"9","carbs":"13","fatPercent":10.47,"carbPercent":15.12,"proteinPercent":74.42},
{"id":705,"name":"tapioca","calories":"223","protein":"55","fat":"3","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":706,"name":"arisu parupu sadam","calories":"327","protein":"36","fat":"10","carbs":"6","fatPercent":19.23,"carbPercent":11.54,"proteinPercent":69.23},
{"id":707,"name":"pornam boorelu","calories":"171","protein":"19","fat":"4","carbs":"24","fatPercent":8.51,"carbPercent":51.06,"proteinPercent":40.43},
{"id":708,"name":"black Channa sundal","calories":"160","protein":"22","fat":"3","carbs":"7","fatPercent":9.38,"carbPercent":21.88,"proteinPercent":68.75},
{"id":709,"name":"sundakkai vathal kulambu","calories":"256","protein":"27","fat":"15","carbs":"5","fatPercent":31.91,"carbPercent":10.64,"proteinPercent":57.45},
{"id":710,"name":"onion ginger chutney","calories":"41","protein":"6","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":711,"name":"Tomato ginger chutney","calories":"97","protein":"21","fat":"1","carbs":"1","fatPercent":4.35,"carbPercent":4.35,"proteinPercent":91.3},
{"id":712,"name":"fruit salad","calories":"121","protein":"39","fat":"2","carbs":"5","fatPercent":4.35,"carbPercent":10.87,"proteinPercent":84.78},
{"id":713,"name":"vegetable salad","calories":"61","protein":"4","fat":"5","carbs":"2","fatPercent":45.45,"carbPercent":18.18,"proteinPercent":36.36},
{"id":714,"name":"rava idli","calories":"71","protein":"14","fat":"2","carbs":"2","fatPercent":11.11,"carbPercent":11.11,"proteinPercent":77.78},
{"id":715,"name":"mini sambar idly","calories":"321","protein":"51","fat":"9","carbs":"7","fatPercent":13.43,"carbPercent":10.45,"proteinPercent":76.12},
{"id":716,"name":"coconut rice","calories":"453","protein":"61","fat":"21","carbs":"7","fatPercent":23.6,"carbPercent":7.87,"proteinPercent":68.54},
{"id":717,"name":"cabbage kottu","calories":"114","protein":"11","fat":"5","carbs":"4","fatPercent":25,"carbPercent":20,"proteinPercent":55},
{"id":718,"name":"ridgegourd poriyal","calories":"179","protein":"15","fat":"3","carbs":"2","fatPercent":15,"carbPercent":10,"proteinPercent":75},
{"id":719,"name":"bottle gourd poriyal","calories":"58","protein":"9","fat":"2","carbs":"0.5","fatPercent":17.39,"carbPercent":4.35,"proteinPercent":78.26},
{"id":720,"name":"snakegourd poriyal","calories":"90","protein":"14","fat":"6","carbs":"2","fatPercent":27.27,"carbPercent":9.09,"proteinPercent":63.64},
{"id":721,"name":"snakegourd kottu","calories":"107","protein":"5","fat":"6","carbs":"1","fatPercent":50,"carbPercent":8.33,"proteinPercent":41.67},
{"id":722,"name":"corn pakoda","calories":"266","protein":"26","fat":"14","carbs":"9","fatPercent":28.57,"carbPercent":18.37,"proteinPercent":53.06},
{"id":723,"name":"bitter gourd curry","calories":"159","protein":"26","fat":"5","carbs":"4","fatPercent":14.29,"carbPercent":11.43,"proteinPercent":74.29},
{"id":724,"name":"mirchi salna","calories":"141","protein":"17","fat":"5","carbs":"2","fatPercent":20.83,"carbPercent":8.33,"proteinPercent":70.83},
{"id":725,"name":"curry leaves chutney","calories":"40","protein":"6","fat":"1","carbs":"1","fatPercent":12.5,"carbPercent":12.5,"proteinPercent":75},
{"id":726,"name":"ginger pickle","calories":"30","protein":"2","fat":"2","carbs":"1","fatPercent":40,"carbPercent":20,"proteinPercent":40},
{"id":727,"name":"garlic pickle","calories":"184","protein":"23","fat":"8","carbs":"5","fatPercent":22.22,"carbPercent":13.89,"proteinPercent":63.89},
{"id":728,"name":"bendakaya pulusu","calories":"145","protein":"25","fat":"5","carbs":"3","fatPercent":15.15,"carbPercent":9.09,"proteinPercent":75.76},
{"id":729,"name":"bitter gourd fry","calories":"105","protein":"9","fat":"10","carbs":"2","fatPercent":47.62,"carbPercent":9.52,"proteinPercent":42.86},
{"id":730,"name":"lady's finger fry","calories":"106","protein":"16","fat":"4","carbs":"6","fatPercent":15.38,"carbPercent":23.08,"proteinPercent":61.54},
{"id":731,"name":"tomato pickle","calories":"26","protein":"3","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":732,"name":"Mysore mutton curry","calories":"271","protein":"20","fat":"17","carbs":"13","fatPercent":34,"carbPercent":26,"proteinPercent":40},
{"id":733,"name":"Madras chicken","calories":"211","protein":"7","fat":"10","carbs":"21","fatPercent":26.32,"carbPercent":55.26,"proteinPercent":18.42},
{"id":734,"name":"Mysore chicken","calories":"208","protein":"6","fat":"8","carbs":"27","fatPercent":19.51,"carbPercent":65.85,"proteinPercent":14.63},
{"id":735,"name":"mutton kola urundai","calories":"235","protein":"0","fat":"14","carbs":"26","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":736,"name":"mutton saru","calories":"150","protein":"15","fat":"7","carbs":"15","fatPercent":18.92,"carbPercent":40.54,"proteinPercent":40.54},
{"id":737,"name":"mutton sukka","calories":"262","protein":"12","fat":"18","carbs":"14","fatPercent":40.91,"carbPercent":31.82,"proteinPercent":27.27},
{"id":738,"name":"chicken sukka","calories":"317","protein":"10","fat":"19","carbs":"27","fatPercent":33.93,"carbPercent":48.21,"proteinPercent":17.86},
{"id":739,"name":"Hyderabad laziz lamb handi","calories":"299","protein":"6","fat":"17","carbs":"32","fatPercent":30.91,"carbPercent":58.18,"proteinPercent":10.91},
{"id":740,"name":"fried prawns","calories":"30","protein":"3","fat":"1","carbs":"2","fatPercent":16.67,"carbPercent":33.33,"proteinPercent":50},
{"id":741,"name":"fried prawns curry","calories":"74","protein":"11","fat":"2","carbs":"9","fatPercent":9.09,"carbPercent":40.91,"proteinPercent":50},
{"id":742,"name":"spicy crab masala","calories":"150","protein":"5","fat":"7","carbs":"12","fatPercent":29.17,"carbPercent":50,"proteinPercent":20.83},
{"id":743,"name":"baked fish","calories":"174","protein":"2","fat":"4","carbs":"16","fatPercent":18.18,"carbPercent":72.73,"proteinPercent":9.09},
{"id":744,"name":"Kerala style fish curry","calories":"80","protein":"6","fat":"5","carbs":"2","fatPercent":38.46,"carbPercent":15.38,"proteinPercent":46.15},
{"id":745,"name":"Shark fish curry","calories":"163","protein":"8","fat":"18","carbs":"12","fatPercent":47.37,"carbPercent":31.58,"proteinPercent":21.05},
{"id":746,"name":"prawn balchao","calories":"460","protein":"16","fat":"39","carbs":"8","fatPercent":61.9,"carbPercent":12.7,"proteinPercent":25.4},
{"id":747,"name":"thengakothu curry","calories":"186","protein":"26","fat":"8","carbs":"3","fatPercent":21.62,"carbPercent":8.11,"proteinPercent":70.27},
{"id":748,"name":"Kerala style coconut fish curry","calories":"290","protein":"14","fat":"15","carbs":"24","fatPercent":28.3,"carbPercent":45.28,"proteinPercent":26.42},
{"id":749,"name":"mushroom theeyal","calories":"106","protein":"12","fat":"4","carbs":"4","fatPercent":20,"carbPercent":20,"proteinPercent":60},
{"id":750,"name":"malabar prawn curry","calories":"216","protein":"15","fat":"11","carbs":"12","fatPercent":28.95,"carbPercent":31.58,"proteinPercent":39.47},
{"id":751,"name":"Chettinad fish fry","calories":"211","protein":"15","fat":"11","carbs":"13","fatPercent":28.21,"carbPercent":33.33,"proteinPercent":38.46},
{"id":752,"name":"royalla kura recipes","calories":"163","protein":"0","fat":"12","carbs":"14","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":753,"name":"ghee roast dosa","calories":"250","protein":"25","fat":"26","carbs":"5","fatPercent":46.43,"carbPercent":8.93,"proteinPercent":44.64},
{"id":754,"name":"calamari roast recipe","calories":"337","protein":"9","fat":"16","carbs":"36","fatPercent":26.23,"carbPercent":59.02,"proteinPercent":14.75},
{"id":755,"name":"prawn coconut curry","calories":"163","protein":"8","fat":"8","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":756,"name":"pasta de caril","calories":"200","protein":"18","fat":"14","carbs":"3","fatPercent":40,"carbPercent":8.57,"proteinPercent":51.43},
{"id":757,"name":"spaghetti","calories":"67","protein":"13","fat":"1","carbs":"2","fatPercent":6.25,"carbPercent":12.5,"proteinPercent":81.25},
{"id":758,"name":"Chettinad Nandu varuval","calories":"83","protein":"0","fat":"1","carbs":"18","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":759,"name":"raw mango prawns","calories":"405","protein":"22","fat":"18","carbs":"36","fatPercent":23.68,"carbPercent":47.37,"proteinPercent":28.95},
{"id":760,"name":"brinjal chickpea curry","calories":"208","protein":"42","fat":"16","carbs":"8","fatPercent":24.24,"carbPercent":12.12,"proteinPercent":63.64},
{"id":761,"name":"vanjaram curry","calories":"136","protein":"0","fat":"7","carbs":"18","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":762,"name":"oyster curry","calories":"208","protein":"20","fat":"11","carbs":"7","fatPercent":28.95,"carbPercent":18.42,"proteinPercent":52.63},
{"id":763,"name":"pan-fried pomfret","calories":"230","protein":"0","fat":"15","carbs":"24","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":764,"name":"lemon pepper fish","calories":"178","protein":"1","fat":"8","carbs":"24","fatPercent":24.24,"carbPercent":72.73,"proteinPercent":3.03},
{"id":765,"name":"tawa fried pomfret","calories":"230","protein":"0","fat":"15","carbs":"24","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":766,"name":"Fenugreek spiced saridine","calories":"149","protein":"6","fat":"3","carbs":"23","fatPercent":9.38,"carbPercent":71.88,"proteinPercent":18.75},
{"id":767,"name":"Konkani style pomfret","calories":"114","protein":"0","fat":"5","carbs":"15","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":768,"name":"prawn drumstick curry","calories":"150","protein":"20","fat":"2","carbs":"3","fatPercent":8,"carbPercent":12,"proteinPercent":80},
{"id":769,"name":"Andhra fish fry","calories":"239","protein":"10","fat":"3","carbs":"30","fatPercent":6.98,"carbPercent":69.77,"proteinPercent":23.26},
{"id":770,"name":"fish molee recipe","calories":"366","protein":"12","fat":"25","carbs":"26","fatPercent":39.68,"carbPercent":41.27,"proteinPercent":19.05},
{"id":771,"name":"seer fish fry","calories":"60","protein":"2","fat":"1","carbs":"12","fatPercent":6.67,"carbPercent":80,"proteinPercent":13.33},
{"id":772,"name":"Mangalore chicken curry","calories":"211","protein":"23","fat":"10","carbs":"16","fatPercent":20.41,"carbPercent":32.65,"proteinPercent":46.94},
{"id":773,"name":"prawn ghee pepper masala","calories":"213","protein":"19","fat":"10","carbs":"13","fatPercent":23.81,"carbPercent":30.95,"proteinPercent":45.24},
{"id":774,"name":"Kottayam style fish curry","calories":"220","protein":"7","fat":"9","carbs":"29","fatPercent":20,"carbPercent":64.44,"proteinPercent":15.56},
{"id":775,"name":"Ayla fish fry","calories":"211","protein":"15","fat":"11","carbs":"13","fatPercent":28.21,"carbPercent":33.33,"proteinPercent":38.46},
{"id":776,"name":"rava fried prawn","calories":"215","protein":"29","fat":"9","carbs":"5","fatPercent":20.93,"carbPercent":11.63,"proteinPercent":67.44},
{"id":777,"name":"nattu kozhi varuval","calories":"189","protein":"7","fat":"4","carbs":"29","fatPercent":10,"carbPercent":72.5,"proteinPercent":17.5},
{"id":778,"name":"Chettinad chicken roast","calories":"308","protein":"9","fat":"7","carbs":"26","fatPercent":16.67,"carbPercent":61.9,"proteinPercent":21.43},
{"id":779,"name":"Andhra pepper chicken","calories":"243","protein":"7","fat":"5","carbs":"34","fatPercent":10.87,"carbPercent":73.91,"proteinPercent":15.22},
{"id":780,"name":"pallipalaiyam chicken fry","calories":"94","protein":"2","fat":"5","carbs":"8","fatPercent":33.33,"carbPercent":53.33,"proteinPercent":13.33},
{"id":781,"name":"cooked fish in banana leaves","calories":"221","protein":"14","fat":"3","carbs":"34","fatPercent":5.88,"carbPercent":66.67,"proteinPercent":27.45},
{"id":782,"name":"chicken65","calories":"110","protein":"6","fat":"4","carbs":"13","fatPercent":17.39,"carbPercent":56.52,"proteinPercent":26.09},
{"id":783,"name":"Calicut payyoli chicken fry","calories":"225","protein":"14","fat":"6","carbs":"27","fatPercent":12.77,"carbPercent":57.45,"proteinPercent":29.79},
{"id":784,"name":"gongura shrimp","calories":"265","protein":"18","fat":"9","carbs":"29","fatPercent":16.07,"carbPercent":51.79,"proteinPercent":32.14},
{"id":785,"name":"chicken coconut milk curry","calories":"212","protein":"12","fat":"7","carbs":"24","fatPercent":16.28,"carbPercent":55.81,"proteinPercent":27.91},
{"id":786,"name":"Kori gassi","calories":"520","protein":"42","fat":"23","carbs":"24","fatPercent":25.84,"carbPercent":26.97,"proteinPercent":47.19},
{"id":787,"name":"chicken stew","calories":"199","protein":"24","fat":"1","carbs":"20","fatPercent":2.22,"carbPercent":44.44,"proteinPercent":53.33},
{"id":788,"name":"chicken liver fry","calories":"125","protein":"28","fat":"1","carbs":"2","fatPercent":3.23,"carbPercent":6.45,"proteinPercent":90.32},
{"id":789,"name":"goan style chicken vindaloo","calories":"93","protein":"6","fat":"7","carbs":"1","fatPercent":50,"carbPercent":7.14,"proteinPercent":42.86},
{"id":790,"name":"kovakai fry","calories":"46","protein":"8","fat":"3","carbs":"1","fatPercent":25,"carbPercent":8.33,"proteinPercent":66.67},
{"id":791,"name":"capsicum peanut subzi","calories":"124","protein":"14","fat":"5","carbs":"4","fatPercent":21.74,"carbPercent":17.39,"proteinPercent":60.87},
{"id":792,"name":"pumpkin curry","calories":"90","protein":"10","fat":"5","carbs":"2","fatPercent":29.41,"carbPercent":11.76,"proteinPercent":58.82},
{"id":793,"name":"butter chicken","calories":"468","protein":"14","fat":"28","carbs":"40","fatPercent":34.15,"carbPercent":48.78,"proteinPercent":17.07},
{"id":794,"name":"American chopsey","calories":"502","protein":"73","fat":"2","carbs":"15","fatPercent":2.22,"carbPercent":16.67,"proteinPercent":81.11},
{"id":795,"name":"chickpeas cucumber masala","calories":"138","protein":"20","fat":"4","carbs":"4","fatPercent":14.29,"carbPercent":14.29,"proteinPercent":71.43},
{"id":796,"name":"vegetable pizza","calories":"330","protein":"41","fat":"12","carbs":"14","fatPercent":17.91,"carbPercent":20.9,"proteinPercent":61.19},
{"id":797,"name":"mixed vegetable kichadi","calories":"336","protein":"16","fat":"5","carbs":"3","fatPercent":20.83,"carbPercent":12.5,"proteinPercent":66.67},
{"id":798,"name":"curd rice","calories":"376","protein":"37","fat":"16","carbs":"9","fatPercent":25.81,"carbPercent":14.52,"proteinPercent":59.68},
{"id":799,"name":"Pesaratta","calories":"133","protein":"21","fat":"4","carbs":"7.6","fatPercent":12.27,"carbPercent":23.31,"proteinPercent":64.42},
{"id":800,"name":"Ela ada","calories":"264","protein":"44","fat":"1","carbs":"2.2","fatPercent":2.12,"carbPercent":4.66,"proteinPercent":93.22},
{"id":801,"name":"imarti","calories":"200","protein":"31","fat":"17","carbs":"1","fatPercent":34.69,"carbPercent":2.04,"proteinPercent":63.27},
{"id":802,"name":"sweet idli","calories":"40","protein":"8","fat":"0","carbs":"1.8","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":803,"name":"kaju Mysore pak","calories":"716","protein":"54","fat":"37","carbs":"13","fatPercent":35.58,"carbPercent":12.5,"proteinPercent":51.92},
{"id":804,"name":"churna","calories":"5","protein":"1","fat":"0","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":805,"name":"coriander onion chutney","calories":"27","protein":"1","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":806,"name":"mint tomato chutney","calories":"30","protein":"5","fat":"2","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":807,"name":"kollu rasam","calories":"31","protein":"2","fat":"1","carbs":"1","fatPercent":25,"carbPercent":25,"proteinPercent":50},
{"id":808,"name":"mango pachadi","calories":"223","protein":"19","fat":"16","carbs":"3","fatPercent":42.11,"carbPercent":7.89,"proteinPercent":50},
{"id":809,"name":"pumpkin raita","calories":"141","protein":"12","fat":"5","carbs":"4","fatPercent":23.81,"carbPercent":19.05,"proteinPercent":57.14},
{"id":810,"name":"coconut sauce","calories":"90","protein":"2","fat":"9","carbs":"1","fatPercent":75,"carbPercent":8.33,"proteinPercent":16.67},
{"id":811,"name":"ridgegourd curry","calories":"104","protein":"10","fat":"7","carbs":"3","fatPercent":35,"carbPercent":15,"proteinPercent":50},
{"id":812,"name":"turai chutney","calories":"72","protein":"10","fat":"2","carbs":"3","fatPercent":13.33,"carbPercent":20,"proteinPercent":66.67},
{"id":813,"name":"mutton soup","calories":"382","protein":"30","fat":"17","carbs":"27","fatPercent":22.97,"carbPercent":36.49,"proteinPercent":40.54},
{"id":814,"name":"spicy noodles","calories":"312","protein":"44","fat":"11","carbs":"7","fatPercent":17.74,"carbPercent":11.29,"proteinPercent":70.97},
{"id":815,"name":"masala peanuts","calories":"191","protein":"4","fat":"16","carbs":"7","fatPercent":59.26,"carbPercent":25.93,"proteinPercent":14.81},
{"id":816,"name":"Kerala style Ayla curry","calories":"97","protein":"1","fat":"7","carbs":"8","fatPercent":43.75,"carbPercent":50,"proteinPercent":6.25},
{"id":817,"name":"papadam","calories":"43","protein":"7","fat":"0","carbs":"4","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":818,"name":"Mathi pathichadhu","calories":"116","protein":"0","fat":"6","carbs":"14","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":819,"name":"mutton bone soup","calories":"60","protein":"12","fat":"2","carbs":"1","fatPercent":13.33,"carbPercent":6.67,"proteinPercent":80},
{"id":820,"name":"methi Pachadi","calories":"135","protein":"16","fat":"8","carbs":"2","fatPercent":30.77,"carbPercent":7.69,"proteinPercent":61.54},
{"id":821,"name":"brinjal Pachadi","calories":"191","protein":"8","fat":"16","carbs":"3","fatPercent":59.26,"carbPercent":11.11,"proteinPercent":29.63},
{"id":822,"name":"pal appam","calories":"85","protein":"15","fat":"3","carbs":"1","fatPercent":15.79,"carbPercent":5.26,"proteinPercent":78.95},
{"id":823,"name":"tapioca chips","calories":"548","protein":"56","fat":"33","carbs":"8","fatPercent":34.02,"carbPercent":8.25,"proteinPercent":57.73},
{"id":824,"name":"banana chips","calories":"151","protein":"17","fat":"9","carbs":"0","fatPercent":0,"carbPercent":0,"proteinPercent":0},
{"id":825,"name":"Ragi muruku","calories":"99","protein":"23","fat":"2","carbs":"3","fatPercent":7.14,"carbPercent":10.71,"proteinPercent":82.14},
{"id":826,"name":"kaadai varuval","calories":"116","protein":"8","fat":"9","carbs":"4","fatPercent":42.86,"carbPercent":19.05,"proteinPercent":38.1}];
  
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
   console.log("All food items",this.foodItems);

   this.temporaryFoodItemsFilter=this.foodItems;
   this.foodid =1;
   
    
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

     

      var jsonFood = {id:this.mealIdEdit,mealJson:{mealName:mealNameA,
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

          var jsonFood = {mealJson:{mealName:mealNameA,mealDate:todayMealDate,mealTime:mealtime,
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

        var jsonFood = {mealJson:{mealName:mealNameA,mealDate:todayMealDate,mealTime:mealtime,
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
    this.alertmsg ="Couldn't find any results";
    }else{
    this.alertmsg =false;
    }
  }
  if(val===''){
    this.temporaryFoodItemsFilter = this.foodItems;
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
      mealProGms += (this.selectedFoodItemsFilter[m].protien * this.selectedFoodItemsFilter[m].foodcount);
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
