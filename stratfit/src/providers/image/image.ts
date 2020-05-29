import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as AWS from 'aws-sdk';
declare const Buffer;
/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(private camera: Camera) {
    console.log('Hello ImageProvider Provider');
  }

  private options:CameraOptions = {
    targetWidth: 500,
    targetHeight: 500,
    quality: 100,
    
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  setProfilePhoto(name, sourceType): Promise<any>{
    return new Promise((resolve, reject) => {
      this.options.sourceType = sourceType;
      this.camera.getPicture(this.options).then((res) => {
        //needs to import file plugin
    //split the file and the path from FILE_URI result
   
        //let base64Image = 'data:image/jpeg;base64,' + res;
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }


  uploadImage(image, imageName) {
    return new Promise((resolve, reject) => {

      const body = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const ext = image.split(';')[0].split('/')[1] || 'jpg';
      let date =  Date.now();
      const key = imageName + date;

     this.s3Putimage({ body, mime: `image/${ext}` }, key, 'base64').then((result) => { resolve(result); }).catch((err) => { reject(err); });
    })
  }


  s3Putimage(file, key, encoding){
    return new Promise((resolve, reject) => {
      AWS.config.accessKeyId = 'AKIAIQZO4VY764NTBCEQ';
      AWS.config.secretAccessKey = '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';
      AWS.config.region = 'us-east-1';
      AWS.config.signatureVersion = 'v4';
      let s3 = new AWS.S3();
      
      const params = {
        Bucket: 'stratfitmedia',
        Key: 'stratfitmedia/'+key,
        Body: file.body,
        ACL: 'public-read',
        ContentType: 'image/png'
    };
      s3.upload(params, function (err, data) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            reject(err);
        }else{

          console.log('Successfully uploaded file.', data);
          resolve(key);
        }
        
    });
    
    })
  }

}
