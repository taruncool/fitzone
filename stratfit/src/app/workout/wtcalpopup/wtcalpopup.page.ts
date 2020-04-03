import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { PlateweightsPage } from 'src/app/plateweights/plateweights.page';

@Component({
  selector: 'app-wtcalpopup',
  templateUrl: './wtcalpopup.page.html',
  styleUrls: ['./wtcalpopup.page.scss'],
})
export class WtcalpopupPage implements OnInit {
  workweight;
  barbellwt;
  remainingwt;
  half_leftover;
  remainingwrkwt;
  checked_wt;
  Wstring;
  barbelwgt;
  metrics;
  totalCheckedWts;
  displayWtValues;
  errbarbelmsg;
  errmsg;
  displayclampswt;
  hidepanel;
  nearestwt;
  nobarbelwt;
  nearestWtMsg;
  nobarbelWtMsg;
  bwfound;

  barbellWtKgs;
  plateWtsKgs;
  barbellWtLbs;
  plateWtsLbs;
  plateweightPage;
 
  constructor(public navCtrl: NavController,public platform: Platform,public params: NavParams, public modalCtrl: ModalController, public sqlStorageNew: SqlStorageNew){
    this.metrics = (localStorage.getItem('weightunit')==='lbs')?" Lbs":" Kgs";
    this.workweight = this.params.get('weight');
  }
  ngOnInit() {
    this.nearestWtMsg =false;
    this.nobarbelWtMsg =false;
    this.hidepanel =false;
    this.displayclampswt = false;
    this.errbarbelmsg =false;

    function sortFloat(a,b) { return a.weight - b.weight; }

    if(this.plateweightPage){
      this.backButtonAction();
      this.plateweightPage = false;
    }

    if(this.workweight <10){
      this.hidepanel = true;
    }else{
      this.sqlStorageNew.query("select * from plateweights")
      .then(response => {
        this.barbellwt =[];
        this.checked_wt =[];
        this.barbellWtKgs = [10,15,20];
        this.barbellWtLbs = [22,33,45];
        //Default barbel & plate arrays in kgs
        this.plateWtsKgs = [50,30,20,15,10,7.5,5,2.5,1];
        //Default barbel & plate arrays in lbs
        this.plateWtsLbs = [100,55,45,35,25,10,5,2.5,1.25];
        if(response.res.rows.length > 0){
          if(localStorage.getItem('weightunit')==='kgs'){
            this.barbellwt = this.barbellWtKgs;
            for(let i = 0; i < response.res.rows.length; i++) {
              if(response.res.rows.item(i).barbell ===0){
                this.checked_wt.push({'weight':this.plateWtsKgs[response.res.rows.item(i).index],'count':response.res.rows.item(i).count});
                //this.barbellwt.push(response.res.rows.item(i).weight);
              }
            }
          }else if(localStorage.getItem('weightunit')==='lbs'){
            this.barbellwt = this.barbellWtLbs;
            for(let i = 0; i < response.res.rows.length; i++) {
              if(response.res.rows.item(i).barbell ===0){
                this.checked_wt.push({'weight':this.plateWtsLbs[response.res.rows.item(i).index],'count':response.res.rows.item(i).count});
                //this.barbellwt.push(response.res.rows.item(i).weight);
              }
            }
          }
          this.checked_wt.sort(sortFloat);
          this.barbellwt.sort();
          this.checked_wt.reverse();
          //this.barbellwt.reverse();
        }else{
          if(localStorage.getItem('weightunit')==='kgs'){
            this.barbellwt = this.barbellWtKgs;
            this.checked_wt = this.plateWtsKgs;
          }else if(localStorage.getItem('weightunit')==='lbs'){
            this.barbellwt = this.barbellWtLbs;
            this.checked_wt = this.plateWtsLbs;
          }
        }

        if(this.barbellwt.length <1){
            this.errbarbelmsg = true;
            this.errmsg = 'No barbels found';
        }else if(this.checked_wt.length <1){
            this.errbarbelmsg = true;
            this.errmsg = 'No plates found';
        }else{
            this.plateMathCal();
        }
      });
    }
 }

 public plateMathCal(){
    this.displayWtValues = [];
    this.Wstring='';
    this.bwfound = false;
    for(var bw=this.barbellwt.length-1;bw>=0;bw--){
      if(this.workweight>=this.barbellwt[bw] && !this.bwfound){
        this.remainingwt = this.workweight - this.barbellwt[bw];
        this.barbelwgt = this.barbellwt[bw];
        this.bwfound=true;
      }else if(this.workweight>=this.barbellwt[bw]-3 && !this.bwfound){
        this.nearestWtMsg = true;
        this.nearestwt = "Use a nearest weight barbel";
      }else{
        this.nobarbelWtMsg = true;
        this.nobarbelwt = "No barbel found with your work weight";
      }
    }
    if(this.nearestWtMsg ==true && this.nobarbelWtMsg == true){
      this.nobarbelWtMsg = false;
    }
    if(this.bwfound ==true){
      this.nearestWtMsg =false;
      this.nobarbelWtMsg = false;
    }
    this.calculateWeight();
 }
public changeWeight(weight){
  this.displayclampswt = false;
  this.errbarbelmsg =false;
  this.displayWtValues = [];
  this.Wstring='';
  this.bwfound = false;
  if(this.workweight>=weight && !this.bwfound){
    this.remainingwt = this.workweight - weight;
    this.barbelwgt = weight;
    this.bwfound=true;
  }else if(this.workweight>=weight-3 && !this.bwfound){
    this.nearestWtMsg = true;
    this.nearestwt = "Use a nearest weight barbel";
  }else{
    this.nobarbelWtMsg = true;
    this.nobarbelwt = "No barbel found with your work weight";
  }
  if(this.nearestWtMsg ==true && this.nobarbelWtMsg == true){
    this.nobarbelWtMsg = false;
  }
  if(this.bwfound ==true){
    this.nearestWtMsg =false;
    this.nobarbelWtMsg = false;
  }
  this.calculateWeight();
}
 public calculateWeight(){
    this.half_leftover = this.remainingwt/2;
    for(var ind=0;ind<this.checked_wt.length && this.checked_wt[ind] !==0;ind++){
      var plateCount = this.checked_wt[ind].count/2;
      var displayPlateCount = 0;
      for(var pc =0;this.half_leftover>=this.checked_wt[ind].weight && pc<plateCount;pc++){
        displayPlateCount=pc+1;
        //this.displayWtValues.push({'weight':this.checked_wt[ind].weight});
        this.half_leftover= this.half_leftover-this.checked_wt[ind].weight;
      }
      if(displayPlateCount!==0){
        this.displayWtValues.push({'weight':this.checked_wt[ind].weight,'count':displayPlateCount});
      }
    }
    if(this.half_leftover !==0 && !isNaN(this.half_leftover)){
      this.displayclampswt = true;
      this.remainingwrkwt = this.half_leftover * 2;
    }
 }

 public chngePtWts(){
   this.plateweightPage = true;
   this.modalCtrl.create({
     component:PlateweightsPage,
     componentProps:{wtcalpopuppage:true}
    });
 }

backButtonAction() {
  this.modalCtrl.dismiss();
}
}
