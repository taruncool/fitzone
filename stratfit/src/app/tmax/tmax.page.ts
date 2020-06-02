import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { global } from "../../app/global";
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TmaxtestingPage } from '../tmaxtesting/tmaxtesting.page';

@Component({
  selector: 'app-tmax',
  templateUrl: './tmax.page.html',
  styleUrls: ['./tmax.page.scss'],
})
export class TmaxPage implements OnInit {
  token:string;
  tmaxdata:any[]=[];
  completedExArr:any[]=[];
  metrics;
  continueClick;
  prompt;
  AllExercises=[];
  s3url;
  btnDisable;

  constructor(public nav: NavController, private alertCtrl: AlertController,public router: Router,private apiService: ApiService, public navParams: NavParams, private http:HttpClient,public sqlStorageNew: SqlStorageNew,public loadData:LoadData, private ga:GoogleAnalytics,public toastCtrl: ToastController) {
    this.token = localStorage.getItem('usertoken');
  }

  startTest(id){
    // this.router.navigate(TmaxtestingPage, {
    //     exercise: id
    // });
    let navigationExtras: NavigationExtras = {
      state: {
        "exercise":id
      }
    };
    this.router.navigate(['tmaxtesting'], navigationExtras);
  }
  ngOnInit() {
    this.s3url=global.s3URL;
    //this.ga.trackView('tmax');
    //this.ga.setAllowIDFACollection(true);
    this.loadData.startLoading();
    this.metrics = (localStorage.getItem('weightunit')==='lbs')?" Lb":" Kg";
    this.tmaxdata=[];
    this.sqlStorageNew.query("SELECT * FROM exercises where accessLevel=1").then(
      sdata => {
        this.btnDisable=false;
        for(var i=0;i<sdata.res.rows.length;i++){
          sdata.res.rows.item(i).updatetmax = this.loadData.convertWeight(sdata.res.rows.item(i).updatetmax,'view');
          sdata.res.rows.item(i).defaultTmax = this.loadData.convertWeight(sdata.res.rows.item(i).defaultTmax,'view');
          if(sdata.res.rows.item(i).defaultTmax===0 && sdata.res.rows.item(i).updatetmax===0){
            this.btnDisable=true;
          }
          if(sdata.res.rows.item(i).accessLevel===1){
            if(sdata.res.rows.item(i).tmaxWeight){
              sdata.res.rows.item(i).tmaxParameter = "Weight";
              sdata.res.rows.item(i).metrics = this.metrics;
            }else if(sdata.res.rows.item(i).tmaxDistance){
              sdata.res.rows.item(i).tmaxParameter = "Distance";
              sdata.res.rows.item(i).metrics = "Meters";
            }else if(sdata.res.rows.item(i).tmaxTime){
              sdata.res.rows.item(i).tmaxParameter = "Time";
              sdata.res.rows.item(i).metrics = "Minutes";
            }else if(sdata.res.rows.item(i).tmaxReps){
              sdata.res.rows.item(i).tmaxParameter = "Reps";
              sdata.res.rows.item(i).metrics = "Reps";
            }else if(sdata.res.rows.item(i).tmaxSpeed){
              sdata.res.rows.item(i).tmaxParameter = "Speed";
              sdata.res.rows.item(i).metrics = "Kmph";
            }else if(sdata.res.rows.item(i).tmaxHeight){
              sdata.res.rows.item(i).tmaxParameter = "Height";
              sdata.res.rows.item(i).metrics = "Centemeter";
            }
          }else{
            sdata.res.rows.item(i).metrics = this.metrics;
          }
          this.tmaxdata.push(sdata.res.rows.item(i));
        }
        this.loadData.stopLoading();
      }
    );
    this.sqlStorageNew.query("SELECT * FROM exercises where tmax=0 and accessLevel=1").then(
      sdata => {
        if(sdata.res.rows.length===0){
          this.continueClick = true;
        }else{
          this.continueClick = false;
        }
      });
  }
  continueBtn(){
    // this.ga.trackEvent('TmaxCompletion',localStorage.getItem('email'));
    this.sqlStorageNew.query("SELECT * FROM exercises where and tmax=0").then(
      odata => {
        this.loadData.stopLoading();
        //this.nav.pop();
        if(odata.res.rows.length>0){
          //this.nav.push(OlympictestPage);
        }else{
          localStorage.setItem('redirectPage', 'tmaxsummary');
          //this.nav.setRoot(TabsPage);
          this.nav.navigateForward('/todayworkout');
        }
      });
  }

  async skipBtn(){
  this.prompt = await this.alertCtrl.create({
      message: 'Are you sure you want to skip?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.skipBtnConfirm();
          }
        }
      ]
    });
    this.prompt.present();
  }
  skipBtnConfirm(){
    var Tmax;
    this.loadData.startLoading();
    this.AllExercises=[];
    localStorage.setItem("skipBtn","true");
    for(var ti=0;ti<this.tmaxdata.length;ti++){
      if(this.tmaxdata[ti].accessLevel===0){
        Tmax = this.loadData.convertWeight(this.tmaxdata[ti].defaultTmax,'db');
      }else{
        Tmax = this.tmaxdata[ti].updatetmax;
      }
      this.AllExercises.push({"tmax":Tmax,"updatetmax":Tmax,"id":this.tmaxdata[ti].id,"exerciseName":this.tmaxdata[ti].exerciseName});
      this.sqlStorageNew.query("UPDATE exercises SET tmax="+Tmax+",updatetmax="+Tmax+" where id="+this.tmaxdata[ti].id);
      this.sqlStorageNew.query("SELECT * FROM exercises where derivedFrom="+this.tmaxdata[ti].id+" and olympicLift=0").then(
        sdata => {
          for(var i=0;i<sdata.res.rows.length;i++){
            var updatedWW = Math.round(Tmax*sdata.res.rows.item(i).derivedFormula);
            this.AllExercises.push({"tmax":updatedWW,"updatetmax":updatedWW,"id":sdata.res.rows.item(i).id,"exerciseName":sdata.res.rows.item(i).exerciseName});
            this.sqlStorageNew.query("UPDATE exercises SET tmax="+updatedWW+", updateTmax="+updatedWW+" WHERE id = " + sdata.res.rows.item(i).id);
          }
          this.updateInServer();
        }
      );
    }
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
            this.continueBtn();
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
      this.continueBtn();
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
