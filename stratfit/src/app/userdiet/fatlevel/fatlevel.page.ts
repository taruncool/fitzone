import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController, ToastController } from '@ionic/angular';
import { Options } from '@angular-slider/ngx-slider';
import { LoadData } from '../../../providers/loaddata';
import { ApiService } from '../../../app/api.service';

@Component({
  selector: 'app-fatlevel',
  templateUrl: './fatlevel.page.html',
  styleUrls: ['./fatlevel.page.scss'],
})
export class FatlevelPage implements OnInit {

  gender;
  genderTxt;
  token;
  dob;
  age;
  avgheight;
  avgweight;
  essentialbodyfatpercnt;
  essentialbodyfatkg;
  essentialbodyfatcal;
  bodyfatpercnt;
  bodyfatkg;
  bodyfatcal;
  mifflin;
  bmi;
  ninfo:any={};
  waterVal: number = 3;
  options: Options = {
    floor: 0,
    ceil: 8
  };

  constructor(public navCtrl: NavController,private apiService:ApiService, private loadData: LoadData, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    this.gender = localStorage.getItem('gender');
    this.ninfo.gender = this.gender;
    this.dob = localStorage.getItem('dob');
    this.age = this.getAge(this.dob);
    this.avgheight = localStorage.getItem('height');
    this.avgweight = localStorage.getItem('weight');
    this.bmi = this.avgweight/((this.avgheight/100)*(this.avgheight/100));
    this.ninfo.bmi = this.bmi;
    if(this.gender === 1) {
      this.genderTxt = "Male";
      this.essentialbodyfatpercnt = (this.age < 40)?8:(this.age <= 59)?11:13;
      this.essentialbodyfatkg = (this.age < 40)?(this.avgweight*.08):(this.age <= 59)?(this.avgweight*.11):(this.avgweight*.13);
      this.essentialbodyfatcal = (this.age < 40)?(this.avgweight*80*9):(this.age <= 59)?(this.avgweight*110*9):(this.avgweight*130*9);
      this.bodyfatpercnt = (1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9;
      this.ninfo.bodyfatpercnt = this.bodyfatpercnt;
      this.bodyfatkg = this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9)/100);
      this.bodyfatcal = ((this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9)/100))*1000)*9;
      this.mifflin = (10*this.avgweight)+(6.25*this.avgheight)-(5*this.age)+5;
    } else {
      this.genderTxt = "Female";
      this.essentialbodyfatpercnt = (this.age < 40)?21:(this.age <= 59)?23:24;
      this.essentialbodyfatkg = (this.age < 40)?(this.avgweight*.21):(this.age <= 59)?(this.avgweight*.23):(this.avgweight*.24);
      this.essentialbodyfatcal = (this.age < 40)?(this.avgweight*210*9):(this.age <= 59)?(this.avgweight*230*9):(this.avgweight*240*9);
      this.bodyfatpercnt = (1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9;
      this.ninfo.bodyfatpercnt = this.bodyfatpercnt;
      this.bodyfatkg = this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9)/100);
      this.bodyfatcal = ((this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9)/100))*1000)*9;
      this.mifflin = (10*this.avgweight)+(6.25*this.avgheight)-(5*this.age)-161;
    }
    this.apiService.getHealthInfo(this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        if(res.success){  
          console.log(res);
          this.ninfo = res.message[0];
          this.waterVal = this.ninfo.water_intake_perday?parseInt(this.ninfo.water_intake_perday):3;
        }
      },(err) =>{
        if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
        }
      })
  }

  public backButtonAction(){
    // this.modalCtrl.dismiss();
    this.navCtrl.navigateBack('tabs/tabs/profile');
   }
    
  public waterChange() {
    this.ninfo.water_intake_perday = this.waterVal;
  }


   public nextStep(){
    //this.navCtrl.navigateBack('/dietprofile/mealtimings');
    console.log("After Submit diet data", this.ninfo);
    this.ninfo.bmi = this.bmi;
    this.ninfo.bodyfatpercnt = this.bodyfatpercnt;
    this.apiService.creatHealthInfo(this.ninfo,this.token).subscribe((response)=>{
        const userStr = JSON.stringify(response);
        let res = JSON.parse(userStr);
        if(res.success){  
          this.toastmsg("Your data has been saved successfully");
          console.log(res);
        }
      },(err) =>{
        if(err.status === 403){
          this.loadData.forbidden();
          this.navCtrl.navigateForward('/login');
          //this.app.getRootNav().setRoot(LoginPage);
        }
      })
  }

  async toastmsg(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

}
