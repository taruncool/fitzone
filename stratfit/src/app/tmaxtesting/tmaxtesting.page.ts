import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { global } from "../../app/global";
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../providers/sql-storage-new';

@Component({
  selector: 'app-tmaxtesting',
  templateUrl: './tmaxtesting.page.html',
  styleUrls: ['./tmaxtesting.page.scss'],
})
export class TmaxtestingPage implements OnInit {
  response;
  token;
  exeIndex;
  exDetails:any[]=[];
  knownWorkWeight;
  programType:number;
  exercise=[];
  testprogram:any=[];
  exId;
  AllExercises=[];
  tmaxStatus;
  wMetric;
  // tab:Tabs;
  prompt;
  s3url;
  tmaxParameter;
  tmaxValues;

  constructor(public navParams: NavParams,private nav: NavController,private route: ActivatedRoute, private router: Router,private apiService: ApiService, private http: HttpClient,private loadData:LoadData,public toastCtrl: ToastController,private ga: GoogleAnalytics,public SqlStorageNew: SqlStorageNew) {
    this.token = localStorage.getItem('usertoken');
    this.tmaxStatus='yes';
    // this.tab = this.nav.parent;
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.exId = this.router.getCurrentNavigation().extras.state.exercise;
      }
    });
  }
  yes(){
    this.tmaxStatus='yes';
  }
  no(){
    this.tmaxStatus='no';
  }
  public getPlans(){
    // this.exId = this.navParams.get('exercise');
    if(!this.exId){
      this.exId=1;
    }
    this.knownWorkWeight = '';
    this.SqlStorageNew.query("SELECT * FROM exercises where derivedFrom=0 and updatetmax=0 and id="+this.exId).then(
      sdata => {
        this.loadData.stopLoading();
        this.testprogram = sdata.res.rows.item(0);
        if(this.testprogram.accessLevel===1){
          if(this.testprogram.tmaxWeight){
            this.tmaxParameter = "Weight";
          }else if(this.testprogram.tmaxDistance){
            this.tmaxParameter = "Distance";
            this.wMetric = "Meters";
          }else if(this.testprogram.tmaxTime){
            this.tmaxParameter = "Time";
            this.wMetric = "Min";
          }else if(this.testprogram.tmaxReps){
            this.tmaxParameter = "Reps";
            this.wMetric = "Reps";
          }else if(this.testprogram.tmaxSpeed){
            this.tmaxParameter = "Speed";
            this.wMetric = "Kmph";
          }else if(this.testprogram.tmaxHeight){
            this.tmaxParameter = "Height";
            this.wMetric = "Cms";
          }
          this.tmaxValues = '';
          if(this.testprogram.tmaxWeightValue!=='null'){
            var tmaxWeightValue = this.loadData.convertWeight(this.testprogram.tmaxWeightValue,'view');
            this.tmaxValues +='<h2>Specified Weight : '+tmaxWeightValue + ' '+this.wMetric+'</h2>';
          }
          if(this.testprogram.tmaxDistanceValue!=='null'){
            this.tmaxValues +='<h2>Specified Distance : '+this.testprogram.tmaxDistanceValue+' Meters</h2>';
          }
          if(this.testprogram.tmaxTimeValue!=='null'){
            this.tmaxValues +='<h2>Specified Time : '+this.testprogram.tmaxTimeValue+' Min</h2>';
          }
          if(this.testprogram.tmaxRepsValue!=='null'){
            this.tmaxValues +='<h2>Specified Reps : '+this.testprogram.tmaxRepsValue+'</h2>';
          }
          if(this.testprogram.tmaxSpeedValue!=='null'){
            this.tmaxValues +='<h2>Specified Speed : '+this.testprogram.tmaxSpeedValue+' Kmph</h2>';
          }
          if(this.testprogram.tmaxHeightValue!=='null'){
            this.tmaxValues +='<h2>Specified Height : '+this.testprogram.tmaxHeightValue+' Cms</h2>';
          }
        }
        this.knownWorkWeight = (this.loadData.convertWeight(sdata.res.rows.item(0).defaultTmax,"view")!==0)?this.loadData.convertWeight(sdata.res.rows.item(0).defaultTmax,"view"):'';
      }
    );
  }

  ngOnInit() {
    this.s3url=global.s3URL;
    this.tmaxStatus='yes';
    //this.ga.trackView('tmaxtesting');
    //this.ga.setAllowIDFACollection(true);
    this.wMetric = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    this.loadData.startLoading();
    this.getPlans();
  }
  public submitWW(testprogram,knownWorkWeight){
    this.loadData.startLoading();
    knownWorkWeight = (this.loadData.convertWeight(knownWorkWeight,"db") !==0)?this.loadData.convertWeight(knownWorkWeight,"db"):'';
    this.AllExercises.push({"tmax":knownWorkWeight,"updatetmax":knownWorkWeight,"id":testprogram.id,"exerciseName":testprogram.exerciseName});
    this.SqlStorageNew.query("UPDATE exercises SET tmax="+knownWorkWeight+", updateTmax="+knownWorkWeight+" WHERE id = " + testprogram.id).then(
      edata => {
        this.SqlStorageNew.query("SELECT * FROM exercises where derivedFrom="+testprogram.id).then(
          sdata => {
            for(var i=0;i<sdata.res.rows.length;i++){
              var updatedWW = Math.round(knownWorkWeight*sdata.res.rows.item(i).derivedFormula);
              this.AllExercises.push({"tmax":updatedWW,"updatetmax":updatedWW,"id":sdata.res.rows.item(i).id,"exerciseName":sdata.res.rows.item(i).exerciseName});
              this.SqlStorageNew.query("UPDATE exercises SET tmax="+updatedWW+", updateTmax="+updatedWW+" WHERE id = " + sdata.res.rows.item(i).id);
            }
            this.updateInServer()
          }
        );
      }
    );
    //var data = { 'exerciseName': testprogram.exerciseName, 'exId':testprogram.id,'workWeight': knownWorkWeight }
  }
  checkTmax(){
    this.SqlStorageNew.query("SELECT * FROM exercises where derivedFrom=0 and updatetmax=0").then(
      sdata => {
        /*if(sdata.res.rows.length===0){
          this.sqlStorage.query("SELECT * FROM exercises where olympicLift=1").then(
            odata => {
              this.stopLoading();
              this.nav.pop();
              if(odata.res.rows.length>0){
                this.nav.push(OlympictestPage);
              }else{
                this.nav.pop();
              }
            });
        }else{*/
          this.loadData.stopLoading();
          this.nav.navigateForward('/todayworkout');
        //}
      }
    );
  }
 async updateInServer(){
    if(localStorage.getItem('internet')==='online'){
      var tmaxdata = {tmaxData:this.AllExercises};
      return new Promise((resolve) => {
        this.apiService.updateBulkTmaxData(tmaxdata,this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
              // this.loadData.stopLoading();
            if(res.success){
            this.checkTmax();
          }else{
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try after some time");
          }
        },(err) => {
          console.log(err);
          this.loadData.stopLoading();
          if(err.status === 403){
            this.loadData.forbidden();
            this.nav.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
          }
        });
      });
    }else{
      this.checkTmax();
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
}
