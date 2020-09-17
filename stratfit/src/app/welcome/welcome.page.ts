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

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }


  public dashboard(){
    // this.modalCtrl.dismiss(); 
    this.navCtrl.navigateForward('/dashboard');
}

public dietprofile(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateForward('/dietprofile');
}

public store(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateForward('/store');
}

public community(){
  // this.modalCtrl.dismiss(); 
  this.navCtrl.navigateForward('/community');
}


}
