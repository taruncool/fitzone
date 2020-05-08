import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

export interface ITimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {
  //@ViewChild('timers', {read: ElementRef,static: false }) timers;
  @Input('timeInSeconds') timeInSeconds;
  public timer: ITimer;

  constructor(public modalCtrl: ModalController, public platform: Platform,private nativeAudio: NativeAudio,public insomnia: Insomnia) {
      if(localStorage.getItem('isSoundOn')==="true"){
      this.nativeAudio.preloadComplex('uniqueId2', 'assets/music/analog.mp3', 1, 1, 0);
      }
  }

  ngOnInit() {
      this.initTimer();
  }

  hasFinished() {
      this.insomnia.allowSleepAgain();
      return this.timer.hasFinished;
  }

  initTimer() {
      if(!this.timeInSeconds) { this.timeInSeconds = 0; }

      this.timer = <ITimer>{
          seconds: this.timeInSeconds,
          runTimer: false,
          hasStarted: false,
          hasFinished: false,
          secondsRemaining: this.timeInSeconds
      };

      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
      this.timer.hasStarted = true;
      this.timer.runTimer = true;
      this.insomnia.keepAwake();
      this.timerTick();
  }

  pauseTimer() {
      this.timer.runTimer = false;
  }

  resumeTimer() {
      this.startTimer();
  }

  timerTick() {
      setTimeout(() => {
          if (!this.timer.runTimer) { return; }
          this.timer.secondsRemaining--;
          this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
          if (this.timer.secondsRemaining > 0) {
              this.timerTick();
              if(this.timer.secondsRemaining===10){
                  if(localStorage.getItem('isSoundOn')==="true"){
                      this.nativeAudio.play('uniqueId2');
                  }
                  if(localStorage.getItem('isVibrateOn')==="true"){
                      if(this.platform.is('ios')) {
                      navigator.vibrate(3000);
                       } else {
                      navigator.vibrate([1000,1000,1000,1000,1000,1000,1000,1000,1000,1000]);  // Vibrate 1 seconds // Pause for 1 second.....
                      }
                  }
              }
          }
          else {
              this.insomnia.allowSleepAgain();
              this.timer.hasFinished = true;
              this.modalCtrl.dismiss();
              if(localStorage.getItem('isSoundOn')==="true"){
                  this.nativeAudio.stop('uniqueId2');
                  this.nativeAudio.unload('uniqueId2');
              }
          }
      }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
      var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      //var hoursString = '';
      var minutesString = '';
      var secondsString = '';
      //hoursString = (hours < 10) ? "0" + hours : hours.toString();
      minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
      secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
      return minutesString + ':' + secondsString;
  }
  

}
