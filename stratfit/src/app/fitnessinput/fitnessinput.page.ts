import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { TmaxeditpopupPage } from '../tmaxeditpopup/tmaxeditpopup.page';

@Component({
  selector: 'app-fitnessinput',
  templateUrl: './fitnessinput.page.html',
  styleUrls: ['./fitnessinput.page.scss'],
})
export class FitnessinputPage implements OnInit {
  items: any = [];
  itemExpandHeight: number = 100;
  stepArry: any = [];
  stepIndex;
  initStepArry: any;
  selectedLevel = 1;
  maleActive;
  femaleActive;
  genderinfo: any;
  heightMetric: any = 'ftin';
  cent: any;
  feet: any = 4;
  inch: any = 1;
  weightMetric: any = 'kgs';
  weigth: any = 50;
  preMetric;
  dob;
  userId;
  userName;
  progressWidth;
  mainlift;
  tmaxEx: any = [];
  validinput;
  disbaleBackNav=true;
  todayDate;
  maxyear;

  responseExercises;
  planpdc;
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

  genderD;
  gender:any;
  userAge;
  dobEx:any;
  weight;
  token;
  // responseExercises;

  noOfWorkDays=0;

  weightArr= {
    numbers: [
     { description: "20" }
      
    ]
  };

  weightArrLbs={
    numbers: [
    { description: "44" }
     
   ]
 };

 heightArrFeet= {
  feet: [
   { description: "4" }
    
  ],
  inches: [
    { description: "0" }
     
   ],
};

heightArrInches= {
  numbers: [
   { description: "0" }
    
  ]
};

heightArrCms= {
  numbers: [
   { description: "123" }
    
  ]
};


  defaultWeight;
  defaultWeightLbs;
  defaultHtFeet;
  defaultHtInches;
  defaultHtCms;

  prescribedReps = {
    numbers: [
     { description: "1" },
      { description: "2" },
      { description: "3" }
    ]
  };

  sheet = document.createElement('style');  
  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
  value;
  tmaxPopupModal;
  constructor(public navCtrl: NavController,private apiService: ApiService, private loadData: LoadData, public modalCtrl: ModalController, public http: HttpClient, public toastCtrl: ToastController,private selector: WheelSelector,public sqlStorageNew: SqlStorageNew,public platform: Platform) {
    this.items = [
      { title: "Untrained ", desc: "I haven't done any resistance training for over 6 months and I have a non-physical job.", expanded: false, value: 1 },
      { title: "Beginner", desc: "I am consistent in my resistance training for less than 6 months, or I have a physical job.", expanded: false, value: 2 },
      { title: "Intermediate", desc: "I am consistent in my resistance training for the last 6 to 12 months.", expanded: false, value: 3 },
      { title: "Advanced", desc: "I am consistent in an organized barbell lifting program for over 12 months.", expanded: false, value: 4 },
      { title: "Elite", desc: "I am consistent in an organized barbell lifting program for multiple years and/ or I am a competitive strength athlete.", expanded: false, value: 5 }
    ];
    this.maleActive = true;
    if (this.maleActive === true) {
      this.genderinfo = '1';
    }
  }

  ngOnInit() {
    this.validinput =false;
    this.dob= "1990-01-01";
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('firstname');
    this.token = localStorage.getItem('usertoken');
    this.todayDate = new Date();
   var year = this.todayDate.getFullYear();
   this.maxyear = (year - 16);
   console.log(this.maxyear);

   this.initStepArry = [
    // { prop: 'static', value: '', question: "SF programs tailor to you based on your maximum for the exercises, we will estimate them from your answers." }, 
    { prop: 'gender', value: '', question: "Gender" }, 
    { prop: 'htmetric', height: true, value: '', question: "Your height" }, 
    // { prop: 'wtmetric', weight: true, value: '', question: "Your weight?" }, 
    // { prop: 'dob', value: '', question: "Enter your Date of Birth?" }, 
    { prop: 'fitness', value: '', question: "Training Level" }, 
    { prop: 'workoutdays', value: '', question: "Training Days" }
    // { prop: 'static', value: '', question: "Don't worry if you misjudge your training level SF will regulate the program when you start training." }
  ];

  this.defaultWeight = 20;
  let defWt =20;
  for(let i=1; i<=480; i++){

    defWt = defWt+1;

    this.weightArr.numbers.push({description: ""+defWt}) ;

  }

  this.defaultWeightLbs = 44;
  let defWtLbs =44;
  for(let j=1; j<=1102; j++){

    defWtLbs = defWtLbs+1;

    this.weightArrLbs.numbers.push({description: ""+defWtLbs}) ;

  }

  this.defaultHtFeet = 4;
  let defHtFet =4;
  for(let k=1; k<=5; k++){

    defHtFet = defHtFet+1;

    this.heightArrFeet.feet.push({description: ""+defHtFet}) ;

  }

  this.defaultHtInches = 0;
  let defHtIn =0;
  for(let l=1; l<=11; l++){

    defHtIn = defHtIn+1;

    this.heightArrFeet.inches.push({description: ""+defHtIn}) ;

  }

  this.defaultHtCms = 123;
  let defHtCm =123;
  for(let m=1; m<=179; m++){

    defHtCm = defHtCm+1;

    this.heightArrCms.numbers.push({description: ""+defHtCm}) ;

  }

    this.stepIndex = 0;
    this.stepArry = this.initStepArry[this.stepIndex];
    this.progressWidth = ((this.stepIndex + 1) / this.initStepArry.length) * 100 + '%';

    this.getItemFromLevel(this.selectedLevel);
  }
  changeLevel(changeEvent){

    //this.sheet.textContent = this.getTrackStyle(document.getElementById('rangediv'));
    this.selectedLevel = this.value;
  }
  ngAfterContentInit() {
    this.value = 1;
    // const element = <HTMLInputElement>document.getElementById("ranger");
    // this.value = 200;
    // element.onchange = changeEvent => {
    //   this.value = parseInt(element.value);
    // };
  }

  getTrackStyle(el) {  
    var curVal = el.value,
        val = (curVal - 1) * 16.666666667,
        style = '';
    
    // Set active label

    
    // Change background gradient
    for (var i = 0; i < this.prefs.length; i++) {
      style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
      style += '.range input::-' + this.prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
    }
  
    return style;
  }

  selectWeightKgs() {
    this.selector.show({
      title: "Select Weight (Kgs)",
      items: [
        this.weightArr.numbers
      ],
      defaultItems: [
        {index:0, value:  this.weightArr.numbers[30].description}
    ]
    }).then(
      result => {
       
        this.weigth = result[0].description;
        
      },
      err => console.log('Error: ', err)
      );
    }

    selectWeightLbs() {
      this.selector.show({
        title: "Select Weight (Lbs)",
        items: [
          this.weightArrLbs.numbers
        ],
        defaultItems: [
          {index:0, value: this.defaultWeightLbs}
      ]
      }).then(
        result => {
         
          this.weigth = result[0].description;
          
        },
        err => console.log('Error: ', err)
        );
      }

      selectHeightFeet() {
        this.selector.show({
          title: "Select Height (Feet,Inches)",
          items: [
            this.heightArrFeet.feet,  this.heightArrFeet.inches
          ],
          defaultItems: [
            {index:0, value: this.defaultHtFeet}
        ]
        }).then(
          result => {
           
            this.feet = result[0].description;
            this.inch =result[1].description;
            
          },
          err => console.log('Error: ', err)
          );
        }

        selectHeightCms() {
          this.selector.show({
            title: "Select Height (Centimeters)",
            items: [
              this.heightArrCms.numbers
            ],
            defaultItems: [
              {index:0, value: this.defaultHtCms}
          ]
          }).then(
            result => {
             
              this.cent = result[0].description;
              
            },
            err => console.log('Error: ', err)
            );
          }

  expandItem(item) {
    this.items.map((listItem) => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
  }

  prevStep() {
    this.stepIndex--;
    this.progressWidth = ((this.stepIndex + 1) / this.initStepArry.length) * 100 + '%';
    this.stepArry = this.initStepArry[this.stepIndex];
  }

 async nextStep() {
    if ((this.stepIndex + 1) == this.initStepArry.length) {
     
      if(this.noOfWorkDays<0||this.noOfWorkDays>7){

        let toast = await this.toastCtrl.create({
          message: "Please provide your weekly workout days (0-7 days)",
          duration: 2000
        });
        toast.present();

      }else{

        this.savefitdata();

      }
     

   
    } else {
     
      if((this.stepIndex + 1) == (this.initStepArry.length-1)){

        if(this.cent !== null){
          if(this.weigth !== null){
            
            this.stepIndex++;
            this.progressWidth = ((this.stepIndex + 1) / this.initStepArry.length) * 100 + '%';
            this.stepArry = this.initStepArry[this.stepIndex];
  
          }else{
            let toast = await this.toastCtrl.create({
              message: "Please provide your weight.",
              duration: 2000
            });
            toast.present();
  
          }
        
        }else{
  
          let toast = await this.toastCtrl.create({
            message: "Please provide your height.",
            duration: 2000
          });
          toast.present();
  
  
        }
      }else{

        this.stepIndex++;
        this.progressWidth = ((this.stepIndex + 1) / this.initStepArry.length) * 100 + '%';
        this.stepArry = this.initStepArry[this.stepIndex];
        
      }
     
    }
  }

  public gactive(gender) {
    this.femaleActive = (gender === 1) ? false : true;
    this.maleActive = !this.femaleActive;
    this.genderinfo = gender;
  }

  selectFLevel(item) {
    if(item.value !== this.selectedLevel){
    
      if(item.expanded==false){
    this.selectedLevel = item.value;
    this.expandItem(item);
      }
    }
  }


  getItemFromLevel(level){

    this.items.map((listItem) => {
      console.log("tlevel get item condition",level);
      console.log("tlevel get item condition",listItem.value);
    if( Number(level).valueOf()  == listItem.value){
      listItem.expanded =true;
      console.log("tlevel get item condition true to return item")
      //return listItem;
     }
     
   });

  }
  //height
  changeMetric(metric) {
    this.heightMetric = metric;
    if (metric === 'cms') {
      this.cent = Math.round(((parseInt(this.feet, 10) * 12) + parseInt(this.inch, 10)) * 2.54);
    } else {
      let realFeet = (parseFloat(this.cent) * 0.393700) / 12;
      this.feet = Math.floor(realFeet);
      this.inch = Math.round((realFeet - this.feet) * 12);
    }
  }

  //weight
  chngWtMetric(metric) {
    this.weightMetric = metric;
    if (this.weigth != '' && this.weigth != null && this.weigth != undefined) {
      if (this.preMetric !== metric) {
        if (metric === 'kgs') {
          this.weigth = Math.round((this.weigth) / 2.2046)
        } else {
          this.weigth = Math.round((this.weigth) * 2.2046)
        }
      }
      this.preMetric = metric;
    }
  }

  async savefitdata() {
    if (localStorage.getItem('internet') === 'online') {
      if (this.heightMetric === 'ftin') {
        this.cent = Math.round(((parseInt(this.feet, 10) * 12) + parseInt(this.inch, 10)) * 2.54);
      }
      this.loadData.startLoading();
      var dateF,separator,rsep;
      rsep = (this.dob.indexOf("T")!==-1)?"T":" ";
      separator = (this.platform.is('android')||(status==="db"))?" ":"T";
      var dateFormatArr = this.dob.split(rsep);
      //dateFormatArr[1] = (dateFormatArr[1]=== undefined)?"00:00:00":dateFormatArr[1];
      var dateArr = dateFormatArr[0].split("-");
      // var TimeArr = dateFormatArr[1].split(":");
      // TimeArr[2] = TimeArr[2].replace("Z","");
      dateF = dateArr[0]+"-"+('0' +dateArr[1]).slice(-2)+"-"+('0' +dateArr[2]).slice(-2);
      this.dob = dateF;
      var userInfo = { "id": parseInt(this.userId), "userInf": { "dob": this.dob, "gender": this.genderinfo, "height": this.cent, "heightM": "cms", "weightM": this.weightMetric, "weight": this.weigth, "trainingLevel": this.selectedLevel } }
      this.apiService.fitnessprofile(userInfo,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          var priceMap = res.details;
          if (res.success) {
            console.log("dob.......",this.dob);
            localStorage.setItem('gender', this.genderinfo);
            localStorage.setItem('dob', this.dob);
            localStorage.setItem('weight', this.weigth);
            localStorage.setItem('height', this.cent);
            localStorage.setItem('heightunit', 'cms');
            localStorage.setItem('weightunit', this.weightMetric);
            localStorage.setItem('traininglevel', JSON.stringify(this.selectedLevel));
            localStorage.setItem('nworkdays', this.noOfWorkDays.toString());
            this.toastmsg(res.message);
           
            setTimeout(() => {
              this.loadData.getExercises();
              setTimeout(() => {
                this.showTmaxpopup();
              }, 1000);
            }, 500);
            this.loadData.stopLoading();
              //this.navCtrl.setRoot(StorePage);
          } else {
           this.loadData.stopLoading();
            this.errorMsg();
          }
        }, (err) => {
          this.loadData.stopLoading();
          if (err.status === 403) {
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        })
    } else {
      let toast = await this.toastCtrl.create({
        message: "Unable to process your request. Please try after some time",
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

  public getExercises(){

    this.weight = localStorage.getItem('weight');
 
    this.gender = localStorage.getItem('gender');
    this.dobEx = localStorage.getItem('dob');

    this.trainingLevelcode = localStorage.getItem('traininglevel');
    var dispDate = new Date();
    let todayDateObj = new Date(dispDate.getFullYear(), dispDate.getMonth(), dispDate.getDate());
    let laswDateiOS= this.loadData.changeDateFormat(localStorage.getItem('dob'),"ios");
    var lastWDate = new Date(laswDateiOS);
    let lastWorkDateObj = new Date(laswDateiOS.getFullYear(), laswDateiOS.getMonth(), laswDateiOS.getDate());
    var Difference_In_Time = todayDateObj.getTime() - lastWorkDateObj.getTime();   
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    this.userAge = Difference_In_Days / 365;
    this.loadData.startLoading();
    this.apiService.newextypedetailspdc(this.token).subscribe((response)=>{
      const userStr = JSON.stringify(response);
      let res = JSON.parse(userStr);
      var priceMap = res.details;
      console.log("ex data", res);
      this.sqlStorageNew.query("DELETE FROM exercises");
      var trainingCoeff;
      this.responseExercises = res;
  
      if(this.responseExercises.success){
        console.log("inside if success");
        for(let i = 0; i<this.responseExercises.defaultExArr.length; i++){
  
          if(this.responseExercises.defaultExArr[i].id == 18){
  
            this.bpStressFactor = this.responseExercises.defaultExArr[i].stressFactor;
           
            if(this.trainingLevelcode === '1'){
  
              trainingCoeff = ( -125.2282 + 7.433832*this.weight - 0.1400854*Math.pow(this.weight,2) + 0.001481318*Math.pow(this.weight,3) - 0.000008099478*Math.pow(this.weight,4) + 0.00000001757845*Math.pow(this.weight,5))
  
            }else if(this.trainingLevelcode === '2'){
  
              trainingCoeff = ( -79.90166 + 5.77842*this.weight - 0.1156817*Math.pow(this.weight,2) + 0.001395196*Math.pow(this.weight,3) - 0.000008502967*Math.pow(this.weight,4) + 0.00000001980793*Math.pow(this.weight,5));
  
            }else if(this.trainingLevelcode === '3'){
  
              trainingCoeff = ( -223.9568 + 13.53008*this.weight - 0.2692058*Math.pow(this.weight,2) + 0.002925213*Math.pow(this.weight,3) - 0.00001603288*Math.pow(this.weight,4) + 0.00000003435019*Math.pow(this.weight,5))
            
            }else if(this.trainingLevelcode ==='4'){
  
              trainingCoeff = ( -308.3964 + 18.42303*this.weight - 0.3593033*Math.pow(this.weight,2) + 0.003822592*Math.pow(this.weight,3) - 0.00002060758*Math.pow(this.weight,4) + 0.00000004364961*Math.pow(this.weight,5))
  
            }else if(this.trainingLevelcode ==='5'){
  
              trainingCoeff = ( -455.4944 + 26.4788*this.weight - 0.5184144*Math.pow(this.weight,2) + 0.00547829*Math.pow(this.weight,3) - 0.00002927773*Math.pow(this.weight,4) + 0.00000006152669*Math.pow(this.weight,5))
            
            }
  
            if(this.gender === '1'){
  
              this.sexCoef = 1;
  
            }
  
            if(this.gender === '2'){
  
              this.sexCoef = 1.6;
  
            }          
            
          this.bpTmax = Math.round((trainingCoeff/this.sexCoef)/(1.034572 - 0.01097307*this.userAge + 0.0003342467*Math.pow(this.userAge,2) - 0.000004837999*Math.pow(this.userAge,3) + 0.00000008533835*Math.pow(this.userAge,4) - 0.0000000003859893*Math.pow(this.userAge,5)));
           
  
          }
  
        }
  
        this.plan_exercises =[];
  
        for(let i = 0; i<this.responseExercises.defaultExArr.length; i++){
          
          if(this.responseExercises.defaultExArr[i].id == 18){
            var exTmax = Math.round(this.bpTmax);
            if(exTmax < 20){

              exTmax = 20;
  
            }
            console.log("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','0','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
        
            this.sqlStorageNew.query("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+exTmax+"','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
          }else{
           
            var exTmax =  Math.round(this.bpTmax * (this.responseExercises.defaultExArr[i].stressFactor/this.bpStressFactor)); 
            if(exTmax < 20){

              exTmax = 20;
  
            }
            console.log("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','0','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
        
            this.sqlStorageNew.query("INSERT INTO exercises (id,exerciseName,exerciseStatus,exerciseDesc,videos,stressFactor,exCoefficient,exIcon,exGroup,exMainGroup,flowType,preExInstruction,postExInstruction,accessLevel,weightExists,distanceExists,timeExists,repsExists,setInstruction,speedExists,tmax,updatetmax,ExerciseCoverImage,ExerciseThumbImage,ExerciseVideo) VALUES ('"+this.responseExercises.defaultExArr[i].id+"','"+this.responseExercises.defaultExArr[i].exName+"','0','"+this.responseExercises.defaultExArr[i].exDesc+"','','"+this.responseExercises.defaultExArr[i].stressFactor+"','"+this.responseExercises.defaultExArr[i].exCoeffiecient+"','','"+this.responseExercises.defaultExArr[i].exGroup+"','"+this.responseExercises.defaultExArr[i].exMainGroup+"','"+this.responseExercises.defaultExArr[i].flowType+"','"+this.responseExercises.defaultExArr[i].preExInstructions+"','"+this.responseExercises.defaultExArr[i].postExInstructions+"','"+this.responseExercises.defaultExArr[i].accessLevel+"','"+this.responseExercises.defaultExArr[i].weightExists+"','"+this.responseExercises.defaultExArr[i].distanceExists+"','"+this.responseExercises.defaultExArr[i].timeExists+"','"+this.responseExercises.defaultExArr[i].repsExists+"','"+this.responseExercises.defaultExArr[i].setInstructions+"','"+this.responseExercises.defaultExArr[i].speedExists+"','"+exTmax+"','0','"+this.responseExercises.defaultExArr[i].ExerciseCoverImage+"','"+this.responseExercises.defaultExArr[i].ExerciseThumbImage+"','"+this.responseExercises.defaultExArr[i].ExerciseVideo+"')");
        
  
          }
        
        }
      
    }
    this.loadData.stopLoading();
    this.showTmaxpopup();
  });
  }

  saveNoOfDays(){

  }

  public getInputData(inputVal){

    if(inputVal == 'centimeters'){
      if(parseInt(this.cent, 10) < 123){
        this.validinput =true;
      }else if(parseInt(this.cent, 10) > 302){

      }else{
        this.validinput =false;
      }
    }

    if(inputVal == 'feet'){
      if(parseInt(this.feet, 10) < 4){
        this.validinput =true;
      }else if(parseInt(this.feet, 10) > 9){
        this.validinput =true;
      }else{
        this.validinput = false;
      }
    }

    if(inputVal == 'inch'){
      if(parseInt(this.inch, 10) < 1){
        this.validinput =true;
      }else if(parseInt(this.inch, 10) > 11){
        this.validinput =true;
      }else{
        this.validinput =false;
      }
    }

    if(inputVal == 'kgs'){
      if(parseInt(this.weigth, 10) < 20){
        this.validinput =true;
      }else if(parseInt(this.weigth, 10) > 500){
        this.validinput =true;
      }else{
        this.validinput =false;
      }
    }

    if(inputVal == 'lbs'){
      if(parseInt(this.weigth, 10) < 44){
        this.validinput =true;
      }else if(parseInt(this.weigth, 10) > 1102){
        this.validinput =true;
      }else{
        this.validinput =false;
      }
    }
  } 

  async showTmaxpopup() {
    const tmaxmodal: HTMLIonModalElement =
    await this.modalCtrl.create({
       component: TmaxeditpopupPage,
       componentProps: {'exercises':[{id:0,equipment:"No data"
       ,exerciseDesc:"No Data",exerciseName:"No data"}]}
 });
    
     
    tmaxmodal.onDidDismiss().then((data: any) => {
       
          console.log('The result: model closed');
          this.navCtrl.navigateForward('/goal');
        
     });

     await tmaxmodal.present();
  }
  async errorMsg() {
    let toast = await this.toastCtrl.create({
      message: "Unable to process your request. Please try after some time",
      duration: 3000
    });
    toast.present();
  }

}
