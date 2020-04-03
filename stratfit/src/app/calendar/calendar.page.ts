import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { CalendarModule,CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  // dateRange: { from: string; to: string; };
  // type: 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  // optionsRange: CalendarComponentOptions = {
  //   pickMode: 'range'
  // };
  constructor(public modalCtrl: ModalController) {
  }

  backButtonAction() {
    this.modalCtrl.dismiss();
  }

  onDaySelect(event){
    console.log(event);
  }
  ngOnInit() {
  }

}
