import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSliderModule } from "@angular-slider/ngx-slider";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { File } from '@ionic-native/file/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadData } from "../providers/loaddata";
import { SqlStorageNew } from '../providers/sql-storage-new';
import { ApiService } from '../app/api.service';
//import { ProgressloginPage } from './login/progresslogin/progresslogin.page';
import { ComponentsModule } from '../components/components.module';
import { IonicRatingModule } from 'ionic4-rating';
/*import { EditprofilePage } from './userprofile/editprofile/editprofile.page';
import { FiltercountryPage } from './userprofile/filtercountry/filtercountry.page';
import { PlanpreviewPage } from './programdetails/planpreview/planpreview.page';
import { TimerpopupPage } from './workout/timerpopup/timerpopup.page';
import { MorerepsPage } from './todayworkout/morereps/morereps.page';
import { MorerepscomplexPage } from './todayworkout/morerepscomplex/morerepscomplex.page';
import { SessionsummaryPage } from './todayworkout/sessionsummary/sessionsummary.page';
import { TmaxeditpopupPage } from './tmaxeditpopup/tmaxeditpopup.page';*/
import { ProgressbarPage } from './todayworkout/Progressbar/progressbar.page';
//import { TimerComponent } from './workout/timer/timer.component';
//import { AddmealPage } from './userdiet/addmeal/addmeal.page';
import { DiethistoryPage } from './userdiet/diethistory/diethistory.page';
import { ImageProvider } from 'src/providers/image/image';
/*import { ImagepreviewPage } from './profile/imagepreview/imagepreview.page';*/
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
//import { TmaxpreviewPage } from './todayworkout/tmaxpreview/tmaxpreview.page';
import { CalendarModule } from 'ion2-calendar';
//import { ExcpreviewPage } from './todayworkout/excpreview/excpreview.page';*/
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [
    AppComponent,
    /*ProgressloginPage,
    PlanpreviewPage,
    TimerpopupPage,
    MorerepsPage,
    MorerepscomplexPage,
    SessionsummaryPage,
    EditprofilePage,
    FiltercountryPage,
    TmaxeditpopupPage,*/
    ProgressbarPage,
    //TimerComponent,
    /*AddmealPage,
    ImagepreviewPage,
    TmaxpreviewPage,
    ExcpreviewPage*/
  ],
  entryComponents: [
    /*ProgressloginPage,
    PlanpreviewPage,
    TimerpopupPage,
    MorerepsPage,
    MorerepscomplexPage,
    SessionsummaryPage,
    EditprofilePage,
    FiltercountryPage,
    TmaxeditpopupPage,*/
    ProgressbarPage,
    DiethistoryPage,
    //TimerComponent,
    /*AddmealPage,
    ImagepreviewPage,
    TmaxpreviewPage,
    ExcpreviewPage,*/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ComponentsModule,
    NoopAnimationsModule,
    IonicRatingModule,
    NgxSliderModule,
    CalendarModule,
    IonicModule.forRoot(),
     AppRoutingModule
    ],
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
    Insomnia,
    NativeAudio,
    Facebook,
    ImageProvider,
    Crop,
    Base64,
    StreamingMedia,
    InAppPurchase,
    LocalNotifications,
    // StreamingVideoOptions,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
