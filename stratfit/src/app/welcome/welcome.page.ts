import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { DashboardPage } from '../dashboard/dashboard.page';
import { DietprofilePage } from '../userdiet/dietprofile.page';
import { StorePage } from '../store/store.page';
import { CommunityPage } from '../community/community.page';
// import { GymsPage } from '../gyms/gyms.page';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  name;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
  }


  public dashboard(){
    // this.modalCtrl.dismiss(); 
    this.navCtrl.navigateRoot('/dashboard');
}

public dietprofile(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateRoot('tabs/tabs/dietprofile');
}

public store(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateRoot('tabs/tabs/store');
}

public community(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateForward('/community');
}


}
