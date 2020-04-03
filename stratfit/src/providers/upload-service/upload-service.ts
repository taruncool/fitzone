import { ToastController,Platform, LoadingController } from '@ionic/angular';
import { Injectable,NgZone } from "@angular/core";
import { Headers,RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { global } from '../../app/global';

@Injectable()
export class UploadServiceProvider {
  sizeIssue:boolean;
  apiUrl = global.rootUrl+'/s3Details/s3signature.php';
  constructor(public http: HttpClient, private transfer: FileTransfer, private file: File, public loadingController:LoadingController, public ngZone: NgZone, public toastCtrl: ToastController, private sanitizer: DomSanitizer) {
   }

  //config S3 params
  s3UploadConfig(file, s3Params,key) {
    return{
      url: s3Params.bucket,
      method: 'POST',
      chunkedMode: false,
      headers: {
        connection: "close"
      },
      params : {
        bucket: s3Params.bucket,
        key: key,
        acl:s3Params.acl,
        "X-Amz-Date": s3Params.dateString,
        "X-Amz-Algorithm": s3Params.algorithm,
        "X-Amz-Credential": s3Params.accessKey+'/'+s3Params.date+'/'+s3Params.region+'/s3/aws4_request',
        "Policy": s3Params.policy,
        "X-Amz-Signature": s3Params.signature
      }
    };
  }

  // Get Signature
  async generateSignature(avatar) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');

    const options: RequestOptions = new RequestOptions();
    options.headers = headers;
    // Call API to get Signature
   //  return this.http.post(`${this.apiUrl}`, {avatar:avatar}, options)
  }
  async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  getProgressBar(percent,loaded,totlaSize) {
    let html: string =  '<div text-center><span style="text-align: center">Uploading...'+ Math.round(percent)+'%</span><br><progress value="' + percent + '" max="100"></progress><br>('+loaded+' MB/'+totlaSize+' MB)</div>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  // Upload Image to s3
  async upload(file,format,avatar): Promise<any>{
   //  let loading = await this.loadingController.create({content : "Preparing for Upload. Please Wait...",spinner: 'hide',});
   //  loading.present();
   //  return new Promise((resolve, reject) => {
   //    this.generateSignature(avatar).subscribe(
   //      response => {
   //        var s3Params = response.json();
   //        let key = new Date().getTime()+'.'+format;
   //        let serveConfig = this.s3UploadConfig(file, s3Params,key);
   //        const fileTransfer: FileTransferObject = this.transfer.create();
   //        //**Progress Bar**
   //        fileTransfer.onProgress((e)=>{
   //          if(format==='jpg' && e.total/1024/1024>5){
   //            this.sizeIssue=true;
   //            fileTransfer.abort();
   //          }else if(e.total/1024/1024>200){
   //            this.sizeIssue=true;
   //            fileTransfer.abort();
   //          }else{
   //            let prg=(e.lengthComputable) ?  Math.round(e.loaded / e.total * 100) : -1;
   //            var loaded = (e.loaded/1024/1024).toFixed(2);
   //            var totlaSize = (e.total/1024/1024).toFixed(2);
   //            this.ngZone.run(() => {
   //              loading.data.content = this.getProgressBar(prg,loaded,totlaSize);
   //            });
   //          }
   //        });

   //        fileTransfer.upload(file, encodeURI('http://'+s3Params.bucket+'.s3.amazonaws.com/'), serveConfig)
   //          .then((result) => {
   //            // when finished upload photo. S3 will return a link of image.
   //            // This link is combined from `s3Params.bucket_name + key`
   //            this.sizeIssue=false;
   //            loading.dismiss();
   //            resolve(key);
   //          }, (error) => {
   //            loading.dismiss();
   //            if(this.sizeIssue){
   //              this.presentToast('Video file size must be less than 100 MB.');
   //            }else{
   //              this.presentToast('Error while uploading Video.');
   //            }
   //          });
   //      });
   //  });
  }

}