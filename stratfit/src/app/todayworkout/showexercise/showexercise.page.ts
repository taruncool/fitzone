import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';

@Component({
  selector: 'app-showexercise',
  templateUrl: './showexercise.page.html',
  styleUrls: ['./showexercise.page.scss'],
})
export class ShowexercisePage implements OnInit {
  data:any;
  exinfo:any;

  constructor(public navCtrl: NavController, public params: NavParams, public modalCtrl: ModalController, public navParams: NavParams){
    this.exinfo = navParams.get("ExcDetails");
    console.log(this.exinfo);
    //this.data ="<b>Setup</b><p>. Lie on the bench with the eyes directly below the Barbell.<br>Pull your feet back and under the bench creating tension in the anterior thigh and the hip.<br> Take an Underhand grip on the bar and pick your torso up, arch the back raising the sternum as high as possible.<br> Pull your shoulders together as high as possible and lower yourself back on the bench.<br> Without losing any tension in the body take a grip in which the index finger is aligned with outside of the deltoid.<br></p><br><b>Lift</b><p>. With the elbows locked pull the barbell forward with the lats to disengage the bar from the rack. As you take the bar out drive the heels into the floor.<br> Stabilize the barbell directly over the shoulder joint.<br> Lower the barbell in a controlled fashion to the upper abdomen.<br> To begin the ascent drive the heels as hard as possible into the floor.<br> Imagine driving the entire body into the barbell.<br> Accelerate the bar through lockout.<br> Rerack the bar with arms locked.<br><br></p><br><b>Cues</b><p>. Stay Tight .<br> Squat it up .<br> Drive your entire body into the barbell .<br> Elbows fixed .<br></p></p>"
  }

  public backButtonAction(){
      this.modalCtrl.dismiss(); 
  }
  ngOnInit() {
  }

}
