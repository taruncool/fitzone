import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { File } from '@ionic-native/file/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { CalendarModule ,CalendarComponentOptions, DayConfig, CalendarResult, CalendarComponent} from "ion2-calendar";
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadData } from "../providers/loaddata";
import { SqlStorageNew } from '../providers/sql-storage-new';
import { ApiService } from '../app/api.service';
import { ProgressloginPage } from './login/progresslogin/progresslogin.page';

@NgModule({
  declarations: [AppComponent,ProgressloginPage],
  entryComponents: [ProgressloginPage],
  imports: [BrowserModule,HttpClientModule,FormsModule,BrowserAnimationsModule,NoopAnimationsModule, IonicModule.forRoot(),
    NgCircleProgressModule.forRoot({
    }), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    LoadData,
    SqlStorageNew,
    SQLite,
    ApiService,
    Network,
    GoogleAnalytics,
    GooglePlus,
    Camera,
    File,
    WheelSelector,
    CalendarModule,
    Insomnia,
    NativeAudio,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
