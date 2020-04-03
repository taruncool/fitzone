// import { ToastController,Platform, LoadingController } from '@ionic/angular';
// import { Injectable,NgZone } from "@angular/core";
// import { Headers,RequestOptions } from '@angular/http';
// import { HttpClient, HttpErrorResponse} from '@angular/common/http';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, tap, map } from 'rxjs/operators';
// import { global } from '../../app/global';
// // import { SqlStorageNew } from './../sql-storage-new';
// // import { async } from '@angular/core/testing';
// // import { ApiService } from '../../app/api.service';

// @Injectable()
// export class UploadService {
//   awsResource = global.rootUrl+'/s3Details/s3signature.php';
//   sizeIssue:boolean;
//   loading;

//   constructor(private http:HttpClient, private transfer: FileTransfer,public loadingController:LoadingController, public ngZone: NgZone, public toastCtrl: ToastController, private sanitizer: DomSanitizer) {
//   }

//   /*
//    This does nothing more than fetching the policy and signature from a node backend
//    Check this for more info:
//    http://stackoverflow.com/questions/18476217/amazon-s3-post-api-and-signing-a-policy-with-nodejs
//    */
//   getSignaturePolicy(isPublic = true, directory = 'public') { //the acl public is change in the back-end
//     console.log('fetching Policy and Signature');
//     let body = JSON.stringify({directory: directory, isPublic: isPublic});
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     let options = new RequestOptions({headers: headers});
//     this.loading = this.loadingController.create({content : "Preparing for Upload. Please Wait...",spinner: 'hide',});
//     this.loading.present();
//     return this.http.post(this.awsResource + '/sign', body, options)
//       .map(response => 
//         response.json()
//       )
//       .catch(this.handleError)
//       ;

//   }

//   getProgressBar(percent,loaded,totlaSize) {
//     let html: string =  '<div text-center><span style="text-align: center">Uploading...'+ Math.round(percent)+'%</span><br><progress value="' + percent + '" max="100"></progress><br>('+loaded+' MB/'+totlaSize+' MB)</div>';
//     return this.sanitizer.bypassSecurityTrustHtml(html);
//   }

//   async presentToast(text) {
//     let toast = await this.toastCtrl.create({
//       message: text,
//       duration: 3000,
//       position: 'top'
//     });
//     toast.present();
//   }

//   //config S3 params
//   s3UploadConfig(file, s3Params,key) {
//     return{
//       url: s3Params.bucket,
//       method: 'POST',
//       chunkedMode: false,
//       headers: {
//         connection: "close"
//       },
//       params : {
//         bucket: s3Params.bucket,
//         key: key,
//         acl:s3Params.acl,
//         "X-Amz-Date": s3Params.dateString,
//         "X-Amz-Algorithm": s3Params.algorithm,
//         "X-Amz-Credential": s3Params.accessKey+'/'+s3Params.date+'/'+s3Params.region+'/s3/aws4_request',
//         "Policy": s3Params.policy,
//         "X-Amz-Signature": s3Params.signature
//       }
//     };
//   }

//   // Upload Image to s3
//   public fileupload(response, file,format,avatar): Promise<any>{
//     //this.loading.dismiss();
//     //let loading = this.loadingController.create({content : "Preparing for Upload. Please Wait...",spinner: 'hide',});
//     //loading.present();
//     return new Promise((resolve, reject) => {
//       var s3Params = response;
//       let key = new Date().getTime()+'.'+format;
//       let serveConfig = this.s3UploadConfig(file, s3Params,key);
//       const fileTransfer: FileTransferObject = this.transfer.create();
//       //**Progress Bar**
//       fileTransfer.onProgress((e)=>{
//         if(format==='jpg' && e.total/1024/1024>5){
//           this.sizeIssue=true;
//           fileTransfer.abort();
//         }else if(e.total/1024/1024>200){
//           this.sizeIssue=true;
//           fileTransfer.abort();
//         }else{
//           let prg=(e.lengthComputable) ?  Math.round(e.loaded / e.total * 100) : -1;
//           var loaded = (e.loaded/1024/1024).toFixed(2);
//           var totlaSize = (e.total/1024/1024).toFixed(2);
//           this.ngZone.run(() => {
//             this.loading.data.content = this.getProgressBar(prg,loaded,totlaSize);
//           });
//         }
//       });

//       fileTransfer.upload(file, encodeURI('http://'+s3Params.bucket+'.s3.amazonaws.com/'), serveConfig)
//         .then((result) => {
//           // when finished upload photo. S3 will return a link of image.
//           // This link is combined from `s3Params.bucket_name + key`
//           this.sizeIssue=false;
//           this.loading.dismiss();
//           resolve(key);
//         }, (error) => {
//           console.log(error);
//           this.loading.dismiss();
//           if(this.sizeIssue){
//             this.presentToast('Video file size must be less than 100 MB.');
//           }else{
//             this.presentToast('Error while uploading Video.');
//           }
//         });
//     });
//   }
  

//   handleError(error:Response) {
//     console.error(error);
//     return Observable.throw(error.json().error || 'Server Error !!');
//   }


// }