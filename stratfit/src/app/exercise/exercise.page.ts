import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  backButtonAction() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
