import { Component } from '@angular/core';

import { Platform, AlertController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var navigator: any; 
declare var Connection: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  alert;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertCtrl:AlertController,
    modalCtrl: ModalController
    

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      window.addEventListener("keyboardDidShow", () => {
        document.activeElement.scrollIntoView(false);

        const elem: HTMLCollectionOf<Element> = document.getElementsByClassName("scroll-content"); // The last content shown, so the current page
        if (elem !== undefined && elem.length > 0) {
        elem[elem.length - 1].scrollTop += 40; // add 40px between the keyboard and the input
      }
      });
      // this.ga.startTrackerWithId('UA-160600239-1')
      // .then(() => {}).catch(e => alert('Error starting GoogleAnalytics == '+ e));
      console.log('connection check');
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
     
      //statusBar.styleDefault();
      this.statusBar.styleLightContent();
      //let splash = modalCtrl.create(SplashPage);
            //splash.present();
      //this.statusBar.backgroundColorByHexString('#019c9c');
       this.splashScreen.hide(); 
	  //firebase push notification starts here
		//this.pushsetup();

   

    });
  }
}
