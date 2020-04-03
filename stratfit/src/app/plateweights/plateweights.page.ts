import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';


@Component({
  selector: 'app-plateweights',
  templateUrl: './plateweights.page.html',
  styleUrls: ['./plateweights.page.scss'],
})
export class PlateweightsPage implements OnInit {
  token;
  metric;
  resBarbelData:any=[];
  resPlatesData:any=[];

  displayPtWts;
  displayBarbelWts;

  barbelKgsArr;
  plateKgsArr;
  barbelLbsArr;
  plateLbsArr;

  getplateWeights:any=[];
  getBarbelWts:any=[];

  barbelwtres:any=[];
  plateWtsres:any=[];
  TempdisplayPtWts;
  TempbarbelwtArr;

  weightcalpage;
  prompt;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,private apiService: ApiService, public navParams: NavParams, private http: HttpClient, public sqlStorageNew: SqlStorageNew,public toastCtrl: ToastController,public loadData:LoadData, public modalCtrl: ModalController) {
    this.weightcalpage = navParams.get("wtcalpopuppage");
  }


 async ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.metric = localStorage.getItem('weightunit');

    this.barbelKgsArr = [{'weight':10,'count':1,'checked':true,'barbell':1,'index':0},{'weight':15,'count':1,'checked':true,'barbell':1,'index':1},{'weight':20,'count':1,'checked':true,'barbell':1,'index':2}];

    this.plateKgsArr = [{'weight':50,'count':4,'checked':true,'barbell':0,'index':0},{'weight':30,'count':4,'checked':true,'barbell':0,'index':1},{'weight':20,'count':4,'checked':true,'barbell':0,'index':2},{'weight':15,'count':4,'checked':true,'barbell':0,'index':3},{'weight':10,'count':4,'checked':true,'barbell':0,'index':4},{'weight':7.5,'count':4,'checked':true,'barbell':0,'index':5},{'weight':5,'count':4,'checked':true,'barbell':0,'index':6},{'weight':2.5,'count':4,'checked':true,'barbell':0,'index':7},{'weight':1,'count':4,'checked':true,'barbell':0,'index':8}];

    this.barbelLbsArr = [{'weight':22,'count':1,'checked':true,'barbell':1,'index':0},{'weight':33,'count':1,'checked':true,'barbell':1,'index':1},{'weight':45,'count':1,'checked':true,'barbell':1,'index':2}];

    this.plateLbsArr = [{'weight':100,'count':4,'checked':true,'barbell':0,'index':0},{'weight':55,'count':4,'checked':true,'barbell':0,'index':1},{'weight':45,'count':4,'checked':true,'barbell':0,'index':2},{'weight':35,'count':4,'checked':true,'barbell':0,'index':3},{'weight':25,'count':4,'checked':true,'barbell':0,'index':4},{'weight':10,'count':4,'checked':true,'barbell':0,'index':5},{'weight':5,'count':4,'checked':true,'barbell':0,'index':6},{'weight':2.5,'count':4,'checked':true,'barbell':0,'index':7},{'weight':1.25,'count':4,'checked':true,'barbell':0,'index':8}];

    if(this.metric==='kgs'){
      this.displayBarbelWts = this.barbelKgsArr;
      this.displayPtWts = this.plateKgsArr;
    }else if(this.metric==='lbs'){
      this.displayBarbelWts = this.barbelLbsArr;
      this.displayPtWts = this.plateLbsArr;
    } else {
      this.displayBarbelWts = this.barbelKgsArr;
      this.displayPtWts = this.plateKgsArr;
    }

    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Authorization', this.token);
      // this.http.get(global.baseURL + 'subscriber/getplateweights/', { headers: headers })
      //     .subscribe(response => {
      //     if(response.json().success){
      this.apiService.getplateweights(this.token).subscribe((response)=>{
          const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
            this.resBarbelData = res.barbelWts;
            this.resPlatesData = res.plateWts;
            if(this.resBarbelData.length > 0){
                //checked barbel weights
                for (var i = 0; i < this.resBarbelData.length; i++) {
                    for (var j = 0; j < this.displayBarbelWts.length; j++) {
                      if(i===0){
                        this.displayBarbelWts[j].checked = false;
                      }
                      if (this.resBarbelData[i].index === this.displayBarbelWts[j].index) {
                        this.displayBarbelWts[j].checked = true;
                      }
                    }
                }
            }
            if(this.resPlatesData.length > 0){
                //checked plate weights
                for (var p = 0; p < this.resPlatesData.length; p++) {
                    for (var b = 0; b < this.displayPtWts.length; b++) {
                      if(p===0){
                        this.displayPtWts[b].checked = false;
                        this.displayPtWts[b].count = 0;
                      }
                      if (this.resPlatesData[p].index === this.displayPtWts[b].index) {
                        this.displayPtWts[b].checked = true;
                        this.displayPtWts[b].count = this.resPlatesData[p].count;
                      }
                    }
                }
            }
            this.loadData.stopLoading();
          }else{
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try after some time");
            // let toast = await this.toastCtrl.create({
            //   message: "Unable to process your request. Please try after some time",
            //   duration: 3000
            // });
            // toast.present();
          }
      },(err) => {
        this.loadData.stopLoading();
        if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
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
  tapEvent(ind) {
    if(this.displayPtWts[ind].count===10){
      this.displayPtWts[ind].count =0; 
      this.displayPtWts[ind].checked =false;
    }else{
      this.displayPtWts[ind].count +=2; 
      this.displayPtWts[ind].checked =true;
    }
  }
  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  async savePWtVal(){
    if(localStorage.getItem('internet')==='online'){
      var dbweights = false;
      var pweights = 0;
      for(var bind= 0;bind<this.displayBarbelWts.length;bind++){
        if(this.displayBarbelWts[bind].checked===true){
          dbweights = true;
        }
      }
      for(var pind= 0;pind<this.displayPtWts.length;pind++){
        if(this.displayPtWts[pind].checked===true){
          pweights++;
        }
      }
      if(dbweights && (pweights>1)){
        var data ={'wtinfo':this.displayBarbelWts.concat(this.displayPtWts)};
        var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', this.token);
        return new Promise((resolve) =>{
          // this.http.post(global.baseURL + 'subscriber/createplatewts/', data, { headers: headers })
          // .subscribe(response => {
          //   //console.log(response.json().message);
          //   this.plateWtsres= response.json().plateWts;
          this.apiService.createplatewts(data,this.token).subscribe((response)=>{
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            // if(res.success){
            this.plateWtsres= res.plateWts;
            this.sqlStorageNew.query("DELETE FROM plateweights").then(data=>{
              for(var k=0; k<this.plateWtsres.length; k++){
                this.sqlStorageNew.query("INSERT INTO `plateweights` (`id`, `weight`, `count`, `barbell`, `status`, `index`) VALUES ('"+this.plateWtsres[k].id+"','"+this.plateWtsres[k].weight+"','"+this.plateWtsres[k].count+"','"+this.plateWtsres[k].barbell+"','"+this.plateWtsres[k].status+"','"+this.plateWtsres[k].index+"')")
                .catch(err => {
                  //console.error('plan error');
                });
              }
            });
            this.modalCtrl.dismiss();
            this.toastmsg(res.message);
            // let toast = await this.toastCtrl.create({
            //   message: response.json().message,
            //   duration: 3000
            // });
            // toast.present();
          },(err) => {
            console.log("Something wrong please try again later...");
          });
        })
      }else{
        var mandatoryMsg;
        if(!dbweights){
          mandatoryMsg = 'Please check any one barbel';
        }else{
          mandatoryMsg='Please check any two plates';
        }
        this.prompt = this.alertCtrl.create({
          message: mandatoryMsg,
          buttons: ['OK']
        });
        this.prompt.present();
      }
        
    }else{
      let toast = await this.toastCtrl.create({
        message: "Please check your internet connectivity and try again",
        duration: 3000
      });
      toast.present();
    }
  }

  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }


}
