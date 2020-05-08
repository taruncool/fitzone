import { Component, OnInit } from '@angular/core';
import {AlertController,ModalController,ToastController,NavParams,Platform,NavController} from '@ionic/angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-excpreview',
  templateUrl: './excpreview.page.html',
  styleUrls: ['./excpreview.page.scss'],
})
export class ExcpreviewPage implements OnInit {
  data:any;
  exinfo:any;
  fromPg;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private streamingMedia: StreamingMedia, public navParams: NavParams){
    this.exinfo = navParams.get("ExcDetails");
    this.fromPg = navParams.get("isFrom");
    console.log(this.exinfo);

    if(this.fromPg==='0'){

      this.exinfo.newExImage = this.exinfo.exercise_id__cover_image;//"http://stratfit.net/newEx/"+this.exinfo.exercise_id+".jpg";
      this.exinfo.newExThumbImage =  this.exinfo.exercise_id__thumb_image;//'http://stratfit.net/newExThumb/'+this.exinfo.exercise_id+'.jpg';

    }else if(this.fromPg==='1'){

      this.exinfo.newExImage = "http://stratfit.net/newEx/"+this.exinfo.id+".jpg";
      this.exinfo.newExThumbImage = 'http://stratfit.net/newExThumb/'+this.exinfo.id+'.jpg';

    }
  }

  onExImageError(){
    this.exinfo.newExImage =  "assets/images/plan_2.png";
  }
  onExThumbImageError(){
    this.exinfo.newExThumbImage =  "assets/images/icon.png";
  }
  public backButtonAction(){
      this.modalCtrl.dismiss(); 
  }

playVideo(idplan){
    
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      //shouldAutoClose: true,
      //controls: false
    };
     if(this.fromPg==='0'){

      this.streamingMedia.playVideo(this.exinfo.exercise_id__video, options);//'http://stratfit.net/newExVideo/'+this.exinfo.exercise_id+'.mp4'    
      
    }else if(this.fromPg==='1'){

      this.streamingMedia.playVideo('http://stratfit.net/newExVideo/'+this.exinfo.id+'.mp4', options);    

    }
    

  }

  ngOnInit() {
  }

}
