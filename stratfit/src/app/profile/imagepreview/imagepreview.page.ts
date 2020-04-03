import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController,ToastController,NavParams, Platform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers } from '@angular/http';
import { LoadData } from '../../../providers/loaddata';
import {SqlStorageNew} from '../../../providers/sql-storage-new';
import { global } from "../../../app/global";
import { UploadServiceProvider } from '../../../providers/upload-service/upload-service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.page.html',
  styleUrls: ['./imagepreview.page.scss'],
})
export class ImagepreviewPage implements OnInit {
  base64img;
  uploadtype;
  token;

  constructor(public navCtrl: NavController, public params: NavParams,private apiService:ApiService, private loadData: LoadData, public http: HttpClient,public modalCtrl:ModalController, public uploadService:UploadServiceProvider,  public toastCtrl: ToastController){
      this.base64img = this.params.get('base64img');
      this.uploadtype = this.params.get('uploadtype');
  }


  ngOnInit() {
    this.token = localStorage.getItem('usertoken');
  }
  public backButtonAction(){
    this.modalCtrl.dismiss(); 
}

public uploadImage(){
    this.uploadService.upload(this.base64img,'jpg',true).then(data=>{
        this.saveImagePath(data);
    });
}

async saveImagePath(imgname){
    if(localStorage.getItem('internet')==='online'){
        this.loadData.uploadLoader();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var data;
        if(this.uploadtype ==true){
            data = {cover:'/'+imgname};
        }else{
            data = {image:'/'+imgname};
        }
        // this.http.post(global.baseURL + 'subscriber/uploadpic/', data, {headers: headers})
        // .subscribe(response => {
          this.apiService.uploadpic(data).subscribe((response)=>{
            this.loadData.stopLoading();
            const userStr = JSON.stringify(response);
            let res = JSON.parse(userStr);
            if(res.success){
                var upavatar = '/'+imgname;
                if(this.uploadtype ==true){
                    localStorage.setItem('coverImage', upavatar);
                }else{
                    localStorage.setItem('avatar', upavatar);
                }
                // this.viewCtrl.dismiss('');
            }else{
              this.toastmsg("Unable to process your request. Please try after some time");
                // let toast = await this.toastCtrl.create({
                //     message: "Unable to process your request. Please try after some time",
                //     duration: 3000
                // });
                // toast.present();
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
