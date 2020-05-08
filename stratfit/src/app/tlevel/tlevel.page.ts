import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,Platform,NavController} from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Headers } from '@angular/http';
import { LoadData } from '../../providers/loaddata';
import { ApiService } from '../../app/api.service';

@Component({
  selector: 'app-tlevel',
  templateUrl: './tlevel.page.html',
  styleUrls: ['./tlevel.page.scss'],
})
export class TlevelPage implements OnInit {
  items: any = [];
  itemExpandHeight: number = 100;
  selectedLevel;
  userId;

  constructor(public navCtrl: NavController,private apiService: ApiService, private loadData: LoadData, public http: HttpClient, public toastCtrl: ToastController, public modalCtrl: ModalController) {

    this.items = [
      {title:"Untrained",desc:"I haven't done any resistance training in over 6 months and have a non-physical job.",expanded: false,value:1},
      {title:"Beginner",desc:"I have been consistently doing resistance training for less than 6 months, or I don't train but have a physical job.",expanded: false,value:2},
      {title:"Intermediate",desc:"I have consistently doing resistance training for between 6 and 12 months.",expanded: false,value:3},
      {title:"Advanced",desc:"I have been consistently on a organised barbell lifting program for over 12 months.",expanded: false,value:4},
      {title:"Elite",desc:"I have been consistently on an organised barbell lifting program for multiple years and/or am a competitive Strength athlete.",expanded: false,value:5}
    ];
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.selectedLevel = (localStorage.getItem('traininglevel')!==undefined)?localStorage.getItem('traininglevel'):'';
    this.getItemFromLevel(this.selectedLevel)
  }
  selectFLevel(item){
    if(item.value !== this.selectedLevel){
    
      if(item.expanded==false){

        this.selectedLevel = item.value;
        this.expandItem(item);
  
      }
     
    }
   
  }
  expandItem(item){
    this.items.map((listItem) => {
      if(item == listItem){
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
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

 async continueBtn(){
    if(localStorage.getItem('internet')==='online'){
      this.loadData.startLoading();
      let userInfo = {"id":parseInt(this.userId),"trainingLevel":this.selectedLevel};
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let usertoken = localStorage.getItem('usertoken');
      // this.http.post(global.baseURL + 'subscriber/fitnessprofile/', {"id":parseInt(this.userId),"userInf":{"trainingLevel":this.selectedLevel}}, { headers: headers })
      //   .subscribe(response => {
      //     if(response.json().success){
      this.apiService.fitnessprofile(userInfo,usertoken).subscribe((response)=>{
        const userStr = JSON.stringify(response);
          let res = JSON.parse(userStr);
          this.loadData.stopLoading();
          if(res.success){
            this.toastmsg(res.message);
            // let toast = await this.toastCtrl.create({
            //   message: res.message,
            //   duration: 3000
            // });
            // toast.present();
            localStorage.setItem('traininglevel',this.selectedLevel);
            this.modalCtrl.dismiss();
          }else{
            this.loadData.stopLoading();
            this.toastmsg("Unable to process your request. Please try after some time");
            // let toast = await this.toastCtrl.create({
            //   message: "Unable to process your request. Please try after some time",
            //   duration: 3000
            // });
            // toast.present();
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

  public backButtonAction(){
    this.modalCtrl.dismiss(); 
  }
}
