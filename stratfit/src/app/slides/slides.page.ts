import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController, Platform, LoadingController,IonSlides } from '@ionic/angular';
import { trigger, style, animate, transition, group, query, animateChild, state } from '@angular/animations';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { LoadData } from '../../providers/loaddata';
import {SqlStorageNew} from '../../providers/sql-storage-new';
import { global } from "../../app/global";
import { ApiService } from '../../app/api.service';

import { timer } from 'rxjs/observable/timer';


declare var navigator: any; 
declare var Connection: any;
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
  animations: [

    trigger('container', [
      state('*', style({
        opacity: '1'
      })),
      transition(':enter', [
          style({opacity: '0'}),
          group([
            animate('2000ms ease-out', style({opacity: '1'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])
          
      ]),
      transition(':leave', [
          group([
            animate('2000ms ease-out', style({opacity: '0'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])
      ]),
      transition('* => swipe', [
          style({opacity: '0'}),
          group([
            animate('2000ms ease-out', style({opacity: '1'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])
          
      ])
    ]),

    trigger('badge', [
      state('*', style({
        transform: 'translateY(0)'
      })),
      transition(':enter', [
          style({transform: 'translateY(900%)'}),
          animate('2000ms ease-out', style({transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
          animate('500ms ease-in', style({transform: 'translateY(900%)'}))   
      ]),
      transition('* => swipe', [
          style({transform: 'translateY(900%)'}),
          animate('2000ms ease-out', style({transform: 'translateY(0)'}))
      ]),
    ]),

    trigger('message', [
      state('*', style({
        opacity: '1'
      })),
      transition(':enter', [
          style({opacity: '0'}),
          animate('500ms 2000ms ease-out', style({opacity: '1'}))
      ]),
      transition(':leave', [
          animate('500ms ease-in', style({opacity: '0'}))   
      ]),
      transition('* => swipe', [
          style({opacity: '0'}),
          animate('500ms 2000ms ease-out', style({opacity: '1'}))
      ]),
    ])

  ]
})
export class SlidesPage implements OnInit {
   @ViewChild('slides', {static: false}) slides: IonSlides;
   @ViewChild ('Navbar', {static: false}) navBar : NavController; // add this line
  skipMsg: string = "NEXT";
  state: string = 'x';
  showSplash = true;
  showSlide = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  token;
  prompt;
  public displayAchievement: boolean = false;
  constructor(public platform: Platform, public navCtrl: NavController,private apiService:ApiService, private http: HttpClient, private network: Network, private loadData: LoadData, public sqlStorageNew: SqlStorageNew, private alertCtrl: AlertController) {
    this.token = localStorage.getItem('usertoken');
     localStorage.setItem('generalwarmupcmpl','false');

     if(localStorage.getItem('nutritionData')==null || localStorage.getItem('nutritionData')==undefined){

      if(!localStorage.getItem('nutritionData')){

        localStorage.setItem('nutritionData',"");

      }
      

     }

     if(localStorage.getItem('workoutData')==null || localStorage.getItem('workoutData')==undefined){

      if(!localStorage.getItem('workoutData')){

        localStorage.setItem('workoutData',"");
        
      }
      

     }
    
    //localStorage.setItem('excercisewarmupcmpl','false');
    //localStorage.setItem('excercisewarmupcmplcount',"0");
  }
  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.platform.ready().then(() => {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    if(networkState==='none'){
      localStorage.setItem('internet','offline');
    }else{
      localStorage.setItem('internet','online');
    }
    this.network.onConnect().subscribe(data => {
      console.log(data)
      localStorage.setItem('internet','online');
      //this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  
    this.network.onDisconnect().subscribe(data => {
      console.log(data)
      localStorage.setItem('internet','offline');
      //this.displayNetworkUpdate(data.type);
    }, error => console.error(error));

    timer(6000).subscribe(() => {
      this.showSplash = false;
      this.showSlide = true;
    });
  });
  
    this.afterInternetCheck();

  }

  afterInternetCheck(){
    if(this.token !='' && this.token !=null && this.token !=undefined){
      if(localStorage.getItem('internet')==='online'){
        //this.loadData.startLoading();
        var data ={"utokken":this.token}
        this.apiService.loginchecking(data,this.token).subscribe((response)=>{
            console.log("loginnew response",response);
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
              if(res.isProfileSet){
                if(res.isPlanSet){
                  for(var k=0; k<res.plans.length; k++){
                    if(res.plans[k].status===1){
                      localStorage.setItem('subplanid',res.plans[k].plan_id);
                    }else if(res.plans[k].status===3){
                      localStorage.setItem('futureplanid',res.plans[k].plan_id);
                    }else{
                      localStorage.setItem('previousplanid',res.plans[k].plan_id);
                    }
                  }
                 // this.loadData.stopLoading();
                  localStorage.setItem('planSet','true');
    
                  this.navCtrl.navigateRoot('/tabs/tabs/welcome');
                }else{
                  //this.loadData.stopLoading();
                  this.navCtrl.navigateRoot('/tabs/tabs/welcome');
                }
              }else{
                //this.loadData.stopLoading();
                this.navCtrl.navigateRoot('/fitnessinput');
              }
              //this.navCtrl.setRoot(StorePage);
            }else{
              //this.loadData.stopLoading();
              console.log(res);
            }
        },(err) => {
          this.loadData.stopLoading();
          console.log("Unable to process your request. Please try after some time");
        });
      }else{
        if(localStorage.getItem('profileSet')==='true'){
          if(localStorage.getItem('planSet')==='true'){
          
    
            this.navCtrl.navigateRoot('/tabs/tabs/welcome');
          }else{
            localStorage.setItem('redirectPage','welcome');
            this.navCtrl.navigateRoot('tabs/tabs/welcome');
          }
        }else{
          this.navCtrl.navigateForward('/fitnessinput');
        }
      }
    }
  }

  public Privacyid(){
    this.navCtrl.navigateForward('/privacypolicy');
  }

  async disclaimerid(){
    this.prompt = await this.alertCtrl.create({
      message: 'StratFit strongly recommends that you consult with your physician before beginning any exercise program.if you engage in these exercise or any exercise program,you agree that you do so at your own risk, are voluntarily participating in these activities, assume all risk of injury to yourself, and agree to release and discharge StratFit from any and all claims or causes of action.',
      buttons: ['OK']
    });
    this.prompt.present();
  }

  public gotologin(){
    this.navCtrl.navigateForward('/login');
  }
  public gotosignup(){
    this.navCtrl.navigateForward('/signup');
  }

  skip() {
    this.navCtrl.navigateForward('/login');
    //localStorage.setItem('introShown','true');
  }

  next() {

    this.navCtrl.navigateForward('/signup');
  
  }

  slideChanged() {

    // if (this.slides.isEnd()){

    //   this.skipMsg = "GOT IT";

    // }else{

    //   this.skipMsg = "NEXT";

    // }
    
  }

  slideMoved() {

    //if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'swipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
