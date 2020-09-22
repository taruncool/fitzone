import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController,ToastController,NavParams, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadData } from '../../../providers/loaddata';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { global } from "../../../app/global";

import { ApiService } from 'src/app/api.service';
import { ImageProvider } from '../../../providers/image/image';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.page.html',
  styleUrls: ['./imagepreview.page.scss'],
})
export class ImagepreviewPage implements OnInit {
  base64img;
  displayImage;
  uploadtype;
  token;
  pictureData;
  private win: any = window;

  constructor(public platform: Platform, public navCtrl: NavController, public params: NavParams,public imageProvider: ImageProvider,private crop: Crop,private base64: Base64,private apiService:ApiService, private loadData: LoadData, public http: HttpClient,public modalCtrl:ModalController, public toastCtrl: ToastController){
      this.base64img = this.params.get('base64img');
      this.uploadtype = this.params.get('uploadtype');
  }


  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
    // this.crop.crop(this.base64img, {quality: 100})
    //   .then(
    //     newImage => {
    //      this.base64img=newImage;
        
    // this.displayImage = this.win.Ionic.WebView.convertFileSrc(this.base64img);
    //       console.log('new image path is: ' + newImage);
    //       let filePath: string = this.base64img;
    //         this.base64.encodeFile(filePath).then((base64File: string) => {
    //         console.log(base64File);
    //         var bstr = base64File.split(',')[1];
    //         console.log("After replace------",bstr);
    //         this.pictureData =  'data:image/jpeg;base64,' +bstr;
    //         }, (err) => {
    //         console.log(err);
    //         });
        
             
  
    //      },
    //     error => {
    //       console.error('Error cropping image', error);

    //     }
    //   );
    if (this.platform.is('ios')) {
          console.log("I am in ios now");
          this.base64img = 'data:image/jpeg;base64,' +this.base64img;
          this.pictureData =  this.base64img;
          console.log("ios pictureData", this.pictureData);
          console.log(this.pictureData);
        } else {
          this.crop.crop(this.base64img, {quality: 100})
            .then(
              newImage => {
              this.base64img=newImage;
                console.log('new image path is: ' + newImage);
                let filePath: string = this.base64img;
                this.base64.encodeFile(filePath).then((base64File: string) => {
                console.log(base64File);
                var bstr = base64File.split(',')[1];
                console.log("After replace------",bstr);
                this.pictureData =  'data:image/jpeg;base64,' +bstr;
                }, (err) => {
                console.log(err);
                });
              },
              error => {
                console.error('Error cropping image', error);

              }
            );
        }

  }
  public backButtonAction(){
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('/tabs/tabs/profile');
}
submitForm(){
       
  console.log("picture data-------",this.pictureData);

  let imageName = 'ProfileImage';
  let date =  Date.now();
  const key = imageName + date;
  this.imageProvider.uploadImage( this.pictureData, imageName).then((res) => {
    console.log("Response", res);
    //this.itemPicturesStoreURL = res;
    this.saveImagePath(res);
  }).catch((err) => {
    console.log("Error is", err)
  })

}
// public uploadImage(){
//     this.uploadService.upload(this.base64img,'jpg',true).then(data=>{
//         this.saveImagePath(data);
//     });
// }

async saveImagePath(imgname){
    if(localStorage.getItem('internet')==='online'){
        this.loadData.startLoading();
        var data;
        if(this.uploadtype ==true){
          data = {cover:'https://stratfitmedia.s3.amazonaws.com/stratfitmedia/'+imgname};
        }else{
          data = {image:'https://stratfitmedia.s3.amazonaws.com/stratfitmedia/'+imgname};
        }
          this.apiService.uploadpic(data,this.token).subscribe((response)=>{
             this.loadData.stopLoading();
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
              var upavatar = 'https://stratfitmedia.s3.amazonaws.com/stratfitmedia/'+imgname;
              if(this.uploadtype ==true){
                  localStorage.setItem('coverImage', upavatar);
              }else{
                  localStorage.setItem('avatar', upavatar);
              }
              this.modalCtrl.dismiss(); 
            }else{
              this.toastmsg("Unable to process your request. Please try after some time");
                
            }
        },(err) => {
         this.loadData.stopLoading();
        if(err.status === 403){
            this.loadData.forbidden();
            this.navCtrl.navigateForward('/login');
            //this.app.getRootNav().setRoot(LoginPage);
        }
        });
    }else{
        let toast = await this.toastCtrl.create({
          message: "Please check your internet connectivity and try again",
          duration: 3000
        });
        toast.present();
    }
}
async toastmsg(msg) {
  let toast = await this.toastCtrl.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

}
