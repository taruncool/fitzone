import { Component, OnInit, ViewChild ,Renderer,ElementRef} from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,IonInput,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { TmaxPage } from '../tmax/tmax.page';

@Component({
  selector: 'app-tmaxeditpopup',
  templateUrl: './tmaxeditpopup.page.html',
  styleUrls: ['./tmaxeditpopup.page.scss'],
})
export class TmaxeditpopupPage implements OnInit {
  @ViewChild('input',{static:false}) myInput : IonInput;
  @ViewChild('navbar',{static:false}) navBar: NavController;

  read_only;
  allExercises:any[]=[];
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
  tempExercises=[];
  isEditDisable;

  bpStressFactor;
  weight;
  gender;
  dob;
  trainingLevelcode;
  sexCoef;
  bpTmax;
  userAge;

  constructor(public platform: Platform, 
    public navCtrl: NavController,public modalCtrl: ModalController,
     public navParams: NavParams,public toastCtrl: ToastController,private apiService: ApiService, private http:HttpClient,private loadData:LoadData,private renderer: Renderer, private elementRef: ElementRef, private ga: GoogleAnalytics,public sqlStorageNew: SqlStorageNew) {
    this.token = localStorage.getItem('usertoken');
    //this.platform.registerBackButtonAction(() => this.backButtonClick)
    this.tempExercises = navParams.get('exercises');
   
    if(this.tempExercises[0].id==0){

      this.isEditDisable = true;

    }else{

      this.isEditDisable = false;

    }
    console.log(this.tempExercises)
  }
  backButtonAction() {
    //this.viewCtrl.dismiss();
  }
  // backButtonClick() {
  //   console.log('// Back button function')
  //   if(this.page_id==1){

  //     this.navCtrl.setRoot(TodayworkoutPage);

  //   }else if(this.page_id==2){

  //     this.navCtrl.push(ProfilePage);
      
  //   }
   
  // }

  // ionViewDidLoad() {

    //this.platform.backButton.subscribe(async () => {
    
     // todo something
     // this.backButtonClick();
   // });
  // }
  // ionViewWillLeave() {
  //   console.log("Looks like I'm about to leave :(");
  //  // this.backButtonClick();
  // }
  closeTmax(){

    this.modalCtrl.dismiss();

  }

  // validatenumber(value){
  //  var maxlength = 3;
  //   if (value.length > maxLength){

  //     this.value = this.value.slice(0, this.maxLength);"
   
  //   } 
  // }
  editTmax(){
    this.loadData.startLoading();
    var exercises=[];
    for(var ei=0;ei<this.allExercises.length;ei++){
      var uTmax = this.loadData.convertWeight(this.allExercises[ei].updatetmax,"db");
      this.sqlStorageNew.query("UPDATE exercises SET tmax="+this.allExercises[ei].updatetmax+",updatetmax="+this.allExercises[ei].updatetmax+" WHERE id="+this.allExercises[ei].id);
      exercises.push({"tmax":uTmax,"updatetmax":uTmax,"id":this.allExercises[ei].id,"exerciseName":this.allExercises[ei].exerciseName});
    }
    this.updateTmax(exercises)
  }
  
  ngOnInit() {
        //this.ga.trackView('tmaxsummary');
        this.weight = localStorage.getItem('weight');
 
        this.gender = localStorage.getItem('gender');
        this.dob = localStorage.getItem('dob');
    
        this.trainingLevelcode = localStorage.getItem('traininglevel');
      
        this.skipStatus = ((localStorage.getItem('skipBtn')!==null && localStorage.getItem('skipBtn')==='true')) ? true :false;
        this.allExercises=[];
        this.mainExercises=[];
        this.extraExercises=[];
        this.exercises =[];
        this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
        this.firstTime = (localStorage.getItem('tmaxfirstTime')==='true')?true:false;
        this.loadData.startLoading();
        this.sqlStorageNew.query("SELECT * FROM exercises ORDER BY exerciseName ASC").then(
          sdata => {
            console.log("excercise data",sdata);
            var trainingCoeff;
            for(var i=0;i<sdata.res.rows.length;i++){
              console.log("tmax ex",sdata.res.rows.item(i).tmax);
              sdata.res.rows.item(i).tmax = this.loadData.convertWeight(sdata.res.rows.item(i).tmax,"view");
              if(this.tempExercises[0].id==0){
    
                this.allExercises.push(sdata.res.rows.item(i));
               
              }else{
    
                for(var j=0;j<this.tempExercises.length;j++){
               
                  if(sdata.res.rows.item(i).id == this.tempExercises[j].id){
      
                    this.allExercises.push(sdata.res.rows.item(i));
      
                  }
      
                }
              }
            //}
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
      }
    async  updateTmax(exercises){
        if(localStorage.getItem('internet')==='online'){
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
                  this.modalCtrl.dismiss();
                }else{
                  this.toastmsg("Unable to process your request. Please try again");
                  // let toast = await this.toastCtrl.create({
                  //   message: "Unable to process your request. Please try again",
                  //   duration: 3000
                  // });
                  // toast.present();
    
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
