import { Component, OnInit } from '@angular/core';
import { Platform,NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-bmicalculator',
  templateUrl: './bmicalculator.page.html',
  styleUrls: ['./bmicalculator.page.scss'],
})
export class BmicalculatorPage implements OnInit {

  gender;
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


  constructor( public nav: NavController) {  }

  ngOnInit() {
    this.gender = localStorage.getItem('gender');
    this.dob = localStorage.getItem('dob');
    this.age = this.getAge(this.dob);
    this.avgheight = localStorage.getItem('height');
    this.avgweight = localStorage.getItem('weight');
    if(this.gender === 1) {
      this.essentialbodyfatpercnt = (this.age < 40)?8:(this.age <= 59)?11:13;
      this.essentialbodyfatkg = (this.age < 40)?(this.avgweight*.08):(this.age <= 59)?(this.avgweight*.11):(this.avgweight*.13);
      this.essentialbodyfatcal = (this.age < 40)?(this.avgweight*80*9):(this.age <= 59)?(this.avgweight*110*9):(this.avgweight*130*9);
      this.bodyfatpercnt = (1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9;
      this.bodyfatkg = this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9)/100);
      this.bodyfatcal = ((this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*1)-9)/100))*1000)*9;
      this.mifflin = (10*this.avgweight)+(6.25*this.avgheight)-(5*this.age)+5;
    } else {
      this.essentialbodyfatpercnt = (this.age < 40)?21:(this.age <= 59)?23:24;
      this.essentialbodyfatkg = (this.age < 40)?(this.avgweight*.21):(this.age <= 59)?(this.avgweight*.23):(this.avgweight*.24);
      this.essentialbodyfatcal = (this.age < 40)?(this.avgweight*210*9):(this.age <= 59)?(this.avgweight*230*9):(this.avgweight*240*9);
      this.bodyfatpercnt = (1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9;
      this.bodyfatkg = this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9)/100);
      this.bodyfatcal = ((this.avgweight*(((1.39*(this.avgweight/((this.avgheight/100)*(this.avgheight/100))))+(0.16*this.age)-(10.34*0)-9)/100))*1000)*9;
      this.mifflin = (10*this.avgweight)+(6.25*this.avgheight)-(5*this.age)-161;
    }
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


  public backButtonAction(){
    // this.modalCtrl.dismiss();
    this.nav.navigateBack('tabs/tabs/profile');
   }


}
