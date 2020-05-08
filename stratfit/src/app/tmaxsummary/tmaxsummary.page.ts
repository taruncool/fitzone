import { Component, OnInit,ElementRef,Renderer, ViewChild } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,IonInput,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { TmaxPage } from '../tmax/tmax.page';
import { TmaxpreviewPage } from '../todayworkout/tmaxpreview/tmaxpreview.page';

@Component({
  selector: 'app-tmaxsummary',
  templateUrl: './tmaxsummary.page.html',
  styleUrls: ['./tmaxsummary.page.scss'],
})
export class TmaxsummaryPage implements OnInit {
  @ViewChild('input',{ static:false}) myInput: IonInput ;
  @ViewChild('navbar',{static:false}) navBar: NavController;

  read_only;
  allExercises:any[]=[];
  tempAllExercises:any[]=[];
  mainExercises=[];
  extraExercises=[];
  exercises =[];
  token;
  wMetric;
  updateEx={};
  firstTime;
  planId;
  planPhoto;
  planName;
  startDate;
  skipStatus;
  page_id: number;
  planSet = false;
  tmaxValue = {
    numbers: [
     { description: "1" },
      { description: "2" },
      { description: "3" }
    ]
  };
  prompt;

  constructor(public platform: Platform,private apiService: ApiService, public navCtrl: NavController,private selector: WheelSelector, private alertCtrl: AlertController,public modalCtrl: ModalController,private selectorWheel: WheelSelector, public toastCtrl: ToastController, private http:HttpClient,private loadData:LoadData,private renderer: Renderer, private elementRef: ElementRef, private ga: GoogleAnalytics,public sqlStorageNew: SqlStorageNew) {
    this.token = localStorage.getItem('usertoken');
    //this.platform.registerBackButtonAction(() => this.backButtonClick)
    //this.page_id = navParams.get('page');
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('/profile');
  }
  backButtonClick() {
    console.log('// Back button function')
    // if(this.page_id==1){

    //   this.navCtrl.navigateForward('/todayworkout');

    // }else if(this.page_id==2){

      //this.navCtrl.push(ProfilePage);
      this.navCtrl.navigateForward('/profile');
      
    //}
   
  }
  // ionViewDidLoad() {

    
  // }
  
  // ionViewWillLeave() {
  //   console.log("Looks like I'm about to leave :(");
  //  // this.backButtonClick();
  // }

  changeTmax(index,ex_id) {
   
    if(this.planSet){
   
    var ex_tmax = this.allExercises[index].updatetmax;
    console.log(ex_tmax);
    console.log(ex_id);
    this.tmaxValue.numbers=[];
    var wtType = localStorage.getItem('weightunit');
    for(let x=0;x<20;x++){
      this.tmaxValue.numbers.push({description:String(ex_tmax+x)});
    }
    this.tmaxValue.numbers.reverse();

     for(let x=1;x<20;x++){

      if(wtType==='lbs'){

        if(ex_tmax-x < 44){
          console.log("low pounds");
        }else{

          this.tmaxValue.numbers.push({description:String(ex_tmax-x)});
       
        }
      }else{
        if( ex_tmax-x < 20){
          console.log("low kgs");
        }else{

          this.tmaxValue.numbers.push({description:String(ex_tmax-x)});

        }
     }
    }
     //this.tmaxValue.numbers.push({description:String(ex_tmax)});
   

    this.selectorWheel.show({
      title: "Tmax Change",
      items: [
        this.tmaxValue.numbers
      ],
      defaultItems: [
        {index:0, value: ex_tmax}
    ]
    }).then(
      result => {
      
      
        this.prompt = this.alertCtrl.create({
          // message: 'Tmax change!',
          message:'Do you want to change Tmax of other exercises too?',
          buttons: [
            {
              text: 'Yes',
              handler: workout => {
               
                var exTmaxChanged = this.loadData.convertWeight(parseInt(result[0].description,10),"db");
                this.editAllTmax(index,ex_id,exTmaxChanged);


              }
            },{
              text: 'No',
              handler: workout => {

                var exTmaxChanged = this.loadData.convertWeight(parseInt(result[0].description,10),"db");
               this.editTmax(index,ex_id,exTmaxChanged);
               
              }
            }
          ]
        });
        this.prompt.present();
       
      },
      err => console.log('Error: ', err)
      );
    }else{
      this.toastmsg("Please subscribe to a program to edit your Tmax values");
      // let toast = await this.toastCtrl.create({
      //   message: "Please subscribe to a program to edit your Tmax values",
      //   duration: 3000
      // });
      // toast.present();

    }
    }
  async  tmaxShowPreview(exObj,excercise,tmax,metric){
      console.log(exObj);
    
      let modal = await this.modalCtrl.create({
        component:TmaxpreviewPage,
        componentProps:{ExObj:exObj,ExerciseName:excercise,Tmax:tmax,Metric:metric,FromPage:"summary"}
      });
      modal.present();
      // modal.onDidDismiss(data=>{
      //   //this.getSetData();
      //   this.initialData();
      // });
    
    }
editAllTmax(index,ex_id,ex_tmax){
  var exercises=[];
  console.log("at edit all tmax",ex_tmax);

  if(this.allExercises[index].derivedFrom===0){

    this.allExercises[index].updatetmax = ex_tmax;
    this.sqlStorageNew.query("UPDATE exercises SET tmax="+this.allExercises[index].updatetmax+",updatetmax="+this.allExercises[index].updatetmax+" WHERE id="+this.allExercises[index].id);
    exercises.push({"tmax":this.allExercises[index].updatetmax,"updatetmax":this.allExercises[index].updatetmax,"id":this.allExercises[index].id,"exerciseName":this.allExercises[index].exerciseName});
  
    var tmaxEx=[];
    for (var pr = 0; pr < this.allExercises.length; pr++) {

      if(this.allExercises[pr].derivedFrom === 0) {
  
        tmaxEx.push(this.allExercises[pr]);
  
      } else {
  
        console.log(tmaxEx);
        for (var ei = 0; ei < tmaxEx.length; ei++) {
  
          if (this.allExercises[pr].derivedFrom === tmaxEx[ei].id) {
  
            var exIndex = ei;
  
          }

        }
  
        this.allExercises[pr].updatetmax = Math.round(tmaxEx[exIndex].updatetmax * this.allExercises[pr].derivedFormula);
       
        this.sqlStorageNew.query("UPDATE exercises SET tmax="+this.allExercises[pr].updatetmax+",updatetmax="+this.allExercises[pr].updatetmax+" WHERE id="+this.allExercises[pr].id);
       exercises.push({"tmax":this.allExercises[pr].updatetmax,"updatetmax":this.allExercises[pr].updatetmax,"id":this.allExercises[pr].id,"exerciseName":this.allExercises[pr].exerciseName});

      }
    }

  }else{

    this.allExercises[index].updatetmax = ex_tmax;
    var tmaxEx=[];
   
    for (var pr = 0; pr < this.allExercises.length; pr++) {

      if (this.allExercises[pr].derivedFrom === 0) {
  
        tmaxEx.push(this.allExercises[pr]);
        if (this.allExercises[index].derivedFrom === this.allExercises[pr].id) {
        
          this.allExercises[pr].updatetmax = Math.round(this.allExercises[index].updatetmax/this.allExercises[index].derivedFormula);
          this.sqlStorageNew.query("UPDATE exercises SET tmax="+this.allExercises[pr].updatetmax+",updatetmax="+this.allExercises[pr].updatetmax+" WHERE id="+this.allExercises[pr].id);
          exercises.push({"tmax":this.allExercises[pr].updatetmax,"updatetmax":this.allExercises[pr].updatetmax,"id":this.allExercises[pr].id,"exerciseName":this.allExercises[pr].exerciseName});
        
        
        }
  
      }else {
  
        for (var ei = 0; ei < tmaxEx.length; ei++) {
  
          if (this.allExercises[pr].derivedFrom === tmaxEx[ei].id) {
  
            console.log("Main Excercise",tmaxEx[ei].updatetmax);
            var exIndex = ei;
  
          }
        }
       
        this.allExercises[pr].updatetmax = Math.round(tmaxEx[exIndex].updatetmax * this.allExercises[pr].derivedFormula);
        this.sqlStorageNew.query("UPDATE exercises SET tmax="+this.allExercises[pr].updatetmax+",updatetmax="+this.allExercises[pr].updatetmax+" WHERE id="+this.allExercises[pr].id);
        exercises.push({"tmax":this.allExercises[pr].updatetmax,"updatetmax":this.allExercises[pr].updatetmax,"id":this.allExercises[pr].id,"exerciseName":this.allExercises[pr].exerciseName});
      
        }
    }
   
  }
//   setTimeout(function(){
//   for (var pr = 0; pr < this.allExercises.length; pr++) {

//   this.sqlStorage.query("UPDATE exercises SET tmax="+this.allExercises[pr].updatetmax+",updatetmax="+this.allExercises[pr].updatetmax+" WHERE id="+this.allExercises[pr].id);
//   exercises.push({"tmax":this.allExercises[pr].updatetmax,"updatetmax":this.allExercises[pr].updatetmax,"id":this.allExercises[pr].id,"exerciseName":this.allExercises[pr].exerciseName});

//   }
//  },2000);
 
  this.updateTmax(exercises);
}


 async editTmax(index,ex_id,ex_tmax){
    if(this.planSet){
   
      var exercises=[];
      var isBreak = false;
      console.log("original tmax", this.allExercises[index].updatetmax);
      console.log("change tmax", ex_tmax);
      this.allExercises[index].updatetmax = ex_tmax;
      console.log("changed tmax", this.allExercises[index].updatetmax);

      for(var ei=0;ei<this.allExercises.length;ei++){

        var uTmax = this.loadData.convertWeight(this.allExercises[ei].updatetmax,"db");
        var tempTmax = this.loadData.convertWeight(this.tempAllExercises[ei].updatetmax,"db");

        if(localStorage.getItem('weightunit')==='lbs'){

          if(this.allExercises[ei].updatetmax < 22){
         
            let toast = await this.toastCtrl.create({
              message: "Tmax for "+ this.allExercises[ei].exerciseName + "should be more than 10 Kgs/22 Lbs" ,
              duration: 3000
            });
            toast.present();
            isBreak = true;
            break;
  
          }else{
  
              this.sqlStorageNew.query("UPDATE exercises SET tmax="+uTmax+",updatetmax="+uTmax+" WHERE id="+this.allExercises[ei].id);
              exercises.push({"tmax":uTmax,"updatetmax":uTmax,"id":this.allExercises[ei].id,"exerciseName":this.allExercises[ei].exerciseName});
           
          }
          
        }else{
          if( this.allExercises[ei].updatetmax < 10){
         
            let toast = await this.toastCtrl.create({
              message: "Tmax for "+ this.allExercises[ei].exerciseName + "should be more than 10 Kgs/22 Lbs" ,
              duration: 3000
            });
            toast.present();
            isBreak = true;
            break;
  
          }else{
  
            this.sqlStorageNew.query("UPDATE exercises SET tmax="+uTmax+",updatetmax="+uTmax+" WHERE id="+this.allExercises[ei].id);
            exercises.push({"tmax":uTmax,"updatetmax":uTmax,"id":this.allExercises[ei].id,"exerciseName":this.allExercises[ei].exerciseName});
         
          }
        }
       
       }

       if(!isBreak){
       
        this.updateTmax(exercises);

       }else{

        this.loadData.stopLoading();

       }
     
    }else{

      let toast = await this.toastCtrl.create({
        message: "Please subscribe to a program to edit your Tmax values",
        duration: 3000
      });
      toast.present();
    }
    
  }
  ngOnInit() {
    this.planSet=(localStorage.getItem('planSet') === 'true') ? true : false;
    this.platform.backButton.subscribe(async () => {
    
     //todo something
     this.backButtonClick();
   });

    this.initialData();
  }
  initialData(){

    this.skipStatus = ((localStorage.getItem('skipBtn')!==null && localStorage.getItem('skipBtn')==='true')) ? true :false;
    this.tempAllExercises=[];
    this.allExercises=[];
    this.mainExercises=[];
    this.extraExercises=[];
    this.exercises =[];
    this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    this.firstTime = (localStorage.getItem('tmaxfirstTime')==='true')?true:false;
    this.loadData.startLoading();
    this.sqlStorageNew.query("SELECT * FROM exercises ORDER BY exerciseName ASC").then(
      sdata => {
        console.log(sdata);
        for(var i=0;i<sdata.res.rows.length;i++){
          sdata.res.rows.item(i).tmax = this.loadData.convertWeight(sdata.res.rows.item(i).tmax,"view");
          if(sdata.res.rows.item(i).accessLevel===0){
            sdata.res.rows.item(i).wMetric = this.wMetric;
          }else{
            if(sdata.res.rows.item(i).tmaxWeight){
              sdata.res.rows.item(i).wMetric = this.wMetric;
            }else if(sdata.res.rows.item(i).tmaxDistance){
              sdata.res.rows.item(i).wMetric = "Meters";
            }else if(sdata.res.rows.item(i).tmaxTime){
              sdata.res.rows.item(i).wMetric = "Minutes";
            }else if(sdata.res.rows.item(i).tmaxReps){
              sdata.res.rows.item(i).wMetric = "Reps";
            }else if(sdata.res.rows.item(i).tmaxSpeed){
              sdata.res.rows.item(i).wMetric = "Kmph";
            }else if(sdata.res.rows.item(i).tmaxHeight){
              sdata.res.rows.item(i).wMetric = "Cms";
            }
          }
          this.allExercises.push(sdata.res.rows.item(i));
          this.tempAllExercises.push(sdata.res.rows.item(i));
          //this.getExtraExercises(this.mainExercises[i].id);
        }
        //console.log(this.allExercises);
        this.loadData.stopLoading();
      }
    );
    this.sqlStorageNew.query("select p.*,u.startdate from userplan u left join plan p on u.plan_id = p.id where u.status = 1").then(
      pdata => {
        if(pdata.res.rows.length>0){
          this.planId = pdata.res.rows.item(0).id;
          this.planPhoto = pdata.res.rows.item(0).planPhoto;
          var todayDate = this.loadData.changeDateFormat(pdata.res.rows.item(0).startdate,"view");
          todayDate = new Date(todayDate);
          this.startDate = this.loadData.dateFormat(todayDate);
	        this.planName = pdata.res.rows.item(0).planName;
        }else{
          this.sqlStorageNew.query("select p.*,u.startdate from userplan u left join plan p on u.plan_id = p.id where u.status = 3").then(
          fplan=>{
	      if(fplan.res.rows.length>0){
            this.planId = fplan.res.rows.item(0).id;
            this.planPhoto = fplan.res.rows.item(0).planPhoto;
	          this.planName = fplan.res.rows.item(0).planName;
            var todayDate = this.loadData.changeDateFormat(fplan.res.rows.item(0).startdate,"view");
            todayDate = new Date(todayDate);
            this.startDate = this.loadData.dateFormat(todayDate);
	          }
          });
        }
        setTimeout(function(){
          localStorage.removeItem('tmaxfirstTime');
          localStorage.removeItem('skipBtn');
        },1000);
    });

    console.log("ex list initialize",this.allExercises);
  }
 async updateTmax(exercises){

    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      // var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.token);
      var tmaxdata = {tmaxData:exercises};
        // this.http.post(global.baseURL + 'userprogram/updateBulkTmaxData/',tmaxdata, { headers: headers })
        // .subscribe(response => {
        //     this.loadData.stopLoading();
        //     if(response.json().success){
        this.apiService.updateBulkTmaxData(tmaxdata,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            this.loadData.stopLoading();
              if(res.success){
              this.toastmsg("Tmax updated successfully");
              // let toast = await this.toastCtrl.create({
              //   message: "Tmax updated successfully",
              //   duration: 3000
              // });
              // toast.present();
            }else{
            }
        },(err) => {
          this.toastmsg(err);
          // let toast = await this.toastCtrl.create({
          //   message: err,
          //   duration: 3000
          // });
          // toast.present();
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
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

  gotoHome(){
    this.navCtrl.navigateForward('/todayworkout');
  }
  retest(){
    this.navCtrl.navigateForward('/tmax');
  }

}
