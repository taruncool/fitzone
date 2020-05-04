import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { global } from "../../../app/global";
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';
import { HttpClient } from '@angular/common/http';
import { TmaxsummaryPage } from '../../tmaxsummary/tmaxsummary.page';

@Component({
  selector: 'app-tmaxpreview',
  templateUrl: './tmaxpreview.page.html',
  styleUrls: ['./tmaxpreview.page.scss'],
})
export class TmaxpreviewPage implements OnInit {
  data:any;
  exercise:any;
  tmax:any;
  metric:any;
  exObj:any=[];
  exerciseTmax;
  prompt;
  s3url;
  exId;
  token;
  fromPage;
  showTmaxNav = true;
  kgsLbs;
  
   

  allExercises:any[]=[];

  constructor(public navCtrl: NavController, public params: NavParams,private apiService: ApiService, public navParams: NavParams,
      private loadData: LoadData, private http: HttpClient, public toastCtrl: ToastController,private modalCtrl: ModalController, private alertCtrl: AlertController,public sqlStorageNew: SqlStorageNew){
    
        this.token = localStorage.getItem('usertoken');
        this.fromPage = navParams.get("FromPage");
        this.exercise = navParams.get("ExerciseName");

        this.tmax = navParams.get("Tmax");
        this.exerciseTmax = navParams.get("Tmax");
        this.metric = navParams.get("Metric");
        this.exObj = navParams.get("ExObj");

        console.log(this.exObj);
        if(this.fromPage=="workout"){
          this.exId = this.exObj.id;
          this.showTmaxNav = true;
        }else{
          this.exId = this.exObj.id;
          this.showTmaxNav = false;
        }
       

    console.log(this.exId);
    console.log(this.exerciseTmax);

    this.kgsLbs = localStorage.getItem('weightunit');
    console.log(this.kgsLbs);
    //this.data ="<b>Setup</b><p>. Lie on the bench with the eyes directly below the Barbell.<br>Pull your feet back and under the bench creating tension in the anterior thigh and the hip.<br> Take an Underhand grip on the bar and pick your torso up, arch the back raising the sternum as high as possible.<br> Pull your shoulders together as high as possible and lower yourself back on the bench.<br> Without losing any tension in the body take a grip in which the index finger is aligned with outside of the deltoid.<br></p><br><b>Lift</b><p>. With the elbows locked pull the barbell forward with the lats to disengage the bar from the rack. As you take the bar out drive the heels into the floor.<br> Stabilize the barbell directly over the shoulder joint.<br> Lower the barbell in a controlled fashion to the upper abdomen.<br> To begin the ascent drive the heels as hard as possible into the floor.<br> Imagine driving the entire body into the barbell.<br> Accelerate the bar through lockout.<br> Rerack the bar with arms locked.<br><br></p><br><b>Cues</b><p>. Stay Tight .<br> Squat it up .<br> Drive your entire body into the barbell .<br> Elbows fixed .<br></p></p>"
  }

  public backButtonAction(){
      this.modalCtrl.dismiss(); 
  }

  async saveExerciseTmax(){

    console.log("pounds kgs",this.kgsLbs);

    if(this.kgsLbs==='lbs'){

      if(this.exerciseTmax < 44){
     
        let toast = await this.toastCtrl.create({
          message: "Tmax for "+ this.exercise + "should be more than 20 Kgs/44 Lbs" ,
          duration: 3000
        });
        toast.present();
       

      }else{

        this.showMessageAllEx();   
      }
    }else{

      if( this.exerciseTmax < 20){
     
        let toast = await this.toastCtrl.create({
          message: "Tmax for "+ this.exercise + "should be more than 20 Kgs/44 Lbs" ,
          duration: 3000
        });
        toast.present();
     

      }else{

        this.showMessageAllEx(); 
      }
    }
  

  }

  showMessageAllEx(){

    console.log(this.exObj);
    
    let exerciseTmaxKgs = Math.round(this.loadData.convertWeight(this.exerciseTmax, 'db'));
    if(exerciseTmaxKgs <20){
      exerciseTmaxKgs = 20;
    }
    this.prompt = this.alertCtrl.create({
      // title: 'Tmax change!',
      message:'Do you want to change Tmax of other exercises too?',
      buttons: [
        {
          text: 'Yes',
          handler: workout => {
           
            console.log(this.exId);
            console.log(this.exerciseTmax);
            
            this.editAllTmax(this.exId,exerciseTmaxKgs);

          }
        },{
          text: 'No',
          handler: workout => {

            console.log(this.exId);
            console.log(this.exerciseTmax);
           
            if(localStorage.getItem('internet')==='online'){
              this.updateTmaxData();
            }
            this.sqlStorageNew.query("UPDATE exercises SET updatetmax = "+exerciseTmaxKgs+", tmax = "+exerciseTmaxKgs+" WHERE id="+this.exId).then(data=>{
              //this.getSetData();
              
             
            });
           
          }
        }
      ]
    });
    this.prompt.present();

  }

  editAllTmax(ex_id,ex_tmax){
    var exercises=[];
    console.log("at edit all tmax",ex_tmax);
    this.allExercises=[];
    var index =  0;
    var wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    console.log("metric",wMetric);
    var firstTime = (localStorage.getItem('tmaxfirstTime')==='true')?true:false;
    // this.loadData.startLoading();
    let derivedTmax = 0;
    this.sqlStorageNew.query("SELECT * FROM exercises WHERE id = " + ex_id).then(
      selectedExData => {
        let selectedExStressFactor = selectedExData.res.rows.item(0).stressFactor;
        this.sqlStorageNew.query("SELECT * FROM exercises ORDER BY exerciseName ASC").then(
          sdata => {
            for(var i=0;i<sdata.res.rows.length;i++){
              derivedTmax = ex_tmax * (sdata.res.rows.item(i).stressFactor/selectedExStressFactor);
             
              if(derivedTmax<20){

                derivedTmax = 20;
              }

              this.sqlStorageNew.query("UPDATE exercises SET tmax="+derivedTmax+",updatetmax="+derivedTmax+" WHERE id="+sdata.res.rows.item(i).id);
              exercises.push({"tmax":derivedTmax,"updatetmax":derivedTmax,"id":sdata.res.rows.item(i).id,"exerciseName":sdata.res.rows.item(i).exerciseName});
            }
            this.updateTmax(exercises);
          }
        );
       
      }
    )   
    
  }

 async updateTmaxData() {
    var data = {
      exercise_id: this.exId,
      updateTmax: this.loadData.convertWeight(this.exerciseTmax, "db"),
      updateType: ''
    };
    // this.loadData.startLoading();
    var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    let usertoken =  headers.append('Authorization', localStorage.getItem('usertoken'));
    // this.http.post(global.baseURL + 'userprogram/updateTmaxData/', data, { headers: headers })
    //   .subscribe(response => {
    //     if(response.json().success){
    this.apiService.updateTmaxData(data,usertoken).subscribe((response)=>{
      const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        if(res.success){
          this.toastmsg("Tmax updated successfully");
          // let toast = await this.toastCtrl.create({
          //   message: "Tmax updated successfully",
          //   duration: 1000
          // });
          // toast.present();
          if(this.showTmaxNav){

            this.modalCtrl.dismiss();

           }
          
        }else{
          this.toastmsg("Something went wrong! Please try again");
          // let toast = await this.toastCtrl.create({
          //   message: "Something went wrong! Please try again",
          //   duration: 1000
          // });
          // toast.present();
        }

        //setTimeout(() => {
          // this.loadData.stopLoading();
        //},2000);
      }, (err) => {
       
          // this.loadData.stopLoading();
       
        if (err.status === 403) {
          //this.restModal.dismiss();
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
        }
      });
  }
  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

 async updateTmax(exercises){
    if(localStorage.getItem('internet')==='online'){
      // this.loadData.startLoading();
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
            // this.loadData.stopLoading();
            if(res.success){
              this.toastmsg("Tmax updated successfully");
              // let toast = await this.toastCtrl.create({
              //   message: "Tmax updated successfully",
              //   duration: 1000
              // });
              // toast.present();
              if(this.showTmaxNav){

               this.modalCtrl.dismiss();

              }
             
            }else{
              this.toastmsg("Something went wrong! Please try again");
              // let toast = await this.toastCtrl.create({
              //   message: "Something went wrong! Please try again",
              //   duration: 1000
              // });
              // toast.present();
            }
        },(err) => {
          // this.loadData.stopLoading();
          this.toastmsg(err);
          // let toast = await this.toastCtrl.create({
          //   message: err,
          //   duration: 1000
          // });
          // toast.present();
          if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
    }else{
      // this.loadData.stopLoading();
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 1000
      });
      toast.present();
    }
  }
  public openTmax(){
    this.modalCtrl.create({component:TmaxsummaryPage});
  }

  ngOnInit() {
  }

}
