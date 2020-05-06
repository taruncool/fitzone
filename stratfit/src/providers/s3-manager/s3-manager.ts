import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
// import * as AWS from 'aws-sdk/global';

/*
  Generated class for the S3ManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class S3ManagerProvider {

  constructor(public http: Http) {
    console.log('Hello S3ManagerProvider Provider');
  }

}
