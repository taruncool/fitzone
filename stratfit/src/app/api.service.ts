import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
//import 'rxjs/add/operator/map'; 
import { global } from './global';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

import { Headers } from '@angular/http';

declare var oauthSignature: any;
const headers = new Headers();
headers.append('Content-Type', 'application/json');



// export class loginCred {
//   email: string;
//   password: string;
//   deviceType: string;
// }

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  options: any = {}

  constructor(private http: HttpClient) {
    this.options.withCredentials = true;
    this.options.headers = headers;
  }

  private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

  public sociallogin(creds){
    return this.http.post(global.baseURL + 'subscriber/socialloginnew/', creds, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public loginnew(creds){
    console.log("login new service",creds);
    return this.http.post(global.baseURL + 'subscriber/logInnew/', creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        })
        }).pipe (data =>
          data);
  }
  public regiser(data){
    return this.http.post(global.baseURL + 'subscriber/register/', data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        })
        }).pipe (data =>
          data);
  }
  public forgotpswd(creds){
    console.log("login new service",creds);
    return this.http.post(global.baseURL + 'subscriber/forgotPwd/', creds, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public otpvalidate(data){
    console.log("login new service",data);
    return this.http.post(global.baseURL + 'subscriber/ionicotpvalidate/', data, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public resetpswd(creds){
    return this.http.post(global.baseURL + 'subscriber/resetPwd/', creds, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public resendotp(data){
    return this.http.post(global.baseURL + 'subscriber/resendotp/', data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        })
        }).pipe (data =>
          data);
  }
  public validateOTP(data){
    return this.http.post(global.baseURL + 'subscriber/validateOTP/', data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        })
        }).pipe (data =>
          data);
  }

  public activatePlan(usertoken,data){
    return this.http.post(global.baseURL + 'userprogram/activateuserplan/', data, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': usertoken
         })
         }).pipe (data =>
           data);
}
  public getmeal(mealDateJson,usertoken){
    return this.http.post(global.baseURL + '/userplan/getmeal/', mealDateJson, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': usertoken
         })
         }).pipe (data =>
           data);
  }
  public accountValidateotp(otpdata){
    return this.http.post(global.baseURL + 'subscriber/accountValidateotp/', otpdata, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public userlogout(token){
    return this.http.post(global.baseURL + 'subscriber/logout/',token, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
         })
         }).pipe (data =>
           data);
  }
  public loginchecking(data,token){
    return this.http.post(global.baseURL + 'subscriber/ionicloginchecking/', data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public plandetails(token,planInfo){
    return this.http.post(global.baseURL + 'program/plandetails/',planInfo, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': token
         })
         }).pipe (data =>
           data);
  }
  public userplancheck(token){
    return this.http.post(global.baseURL + 'userprogram/userplancheck/',token, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public viewplan_byId(creds,token){
    return this.http.post(global.baseURL + 'program/viewPlan_by_id/', {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public createuserplan(data,token){
    return this.http.post(global.baseURL + 'userprogram/createuserplan/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public newextypedetailspdc(token){
    return this.http.post(global.baseURL + 'userprogram/newextypedetailspdc/', {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
         })
         }).pipe (data =>
           data);
  }
  public fitnessprofile(userInfo,token){
    return this.http.post(global.baseURL + 'subscriber/fitnessprofile/',userInfo, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public changePassword(creds,token){
    return this.http.post(global.baseURL + 'subscriber/changePassword/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public uploadpic(data,token){
    return this.http.post(global.baseURL + 'subscriber/uploadpic/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public getupdatedTmax(token){
    return this.http.post(global.baseURL + 'userprogram/getUpdatedTmax/', {}, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'Authorization': token
         })
         }).pipe (data =>
           data);
  }
  public usertestExercise(token){
    return this.http.post(global.baseURL + 'userprogram/userTestExercise/', {
       headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': token
         })
         }).pipe (data =>
           data);
  }
  public getplateweights(token){
    return this.http.post(global.baseURL + 'subscriber/getplateweights/', {}, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
         })
         }).pipe (data =>
           data);
  }
  public filtersql(usertoken,filter){
    return this.http.post(global.baseURL + 'program/filterSqlv2/',filter, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': usertoken
         })
         }).pipe (data =>
           data);
  }
  public getcoachs(data,usertoken,){
    return this.http.post(global.baseURL + 'program/getcoachs/',data, {
       headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': usertoken
         })
         }).pipe (data =>
           data);
  }
  public createplatewts(data,token){
    return this.http.post(global.baseURL + 'subscriber/createplatewts/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public getpriceMap(token){
    return this.http.post(global.baseURL + 'utility/getpriceMap/', {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public createPlanRating(creds,token){
    return this.http.post(global.baseURL + 'program/createPlanRating/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public viewplan(creds,usertoken){
    return this.http.post(global.baseURL + 'program/viewplan/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': usertoken
        })
        }).pipe (data =>
          data);
  }
  public sessionCheck(token){
    let creds = {};
    return this.http.post(global.baseURL + 'subscriber/sessionCheck/', creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public ionicSaveTransactions(creds,token){
    return this.http.post(global.baseURL + 'payment/ionicSaveTransactions/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public updaterenewaldate(data,token){
    return this.http.post(global.baseURL + 'userprogram/updaterenewaldate/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public updatestartdate(userInfo,token){
    return this.http.post(global.baseURL + 'userprogram/updatestartdate/',userInfo, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public checkinseason(creds,token){
    return this.http.post(global.baseURL + 'program/checkinseason/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public userReferral(data,token){
    return this.http.post(global.baseURL + 'campaign/userReferral/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public getreferralcode(token){
    return this.http.post(global.baseURL + 'campaign/getreferralcode/', {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public feedback(creds){
    return this.http.post(global.baseURL + 'campaign/feedback/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        })
        }).pipe (data =>
          data);
  }
  public gymLists(usertoken){
    return this.http.post(global.baseURL + 'startorg/gymLists/', {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': usertoken
        })
        }).pipe (data =>
          data);
  }
  public individualuserplans(creds,token){
    return this.http.post(global.baseURL + 'program/individualuserplansv2/',creds, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public getcountrydata(token){
    return this.http.post(global.baseURL + 'utility/getcountrydata/',token, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public updateBulkTmaxData(tmaxdata,token){
    return this.http.post(global.baseURL + 'userprogram/updateBulkTmaxData/',tmaxdata, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
  public updateTmaxData(data,usertoken){
    return this.http.post(global.baseURL + 'userprogram/updateTmaxData/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': usertoken
        })
        }).pipe (data =>
          data);
  }
  public createsetdetails(data,usertoken){
    return this.http.post(global.baseURL + 'userprogram/createsetdetails/',data, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': usertoken
        })
        }).pipe (data =>
          data);
  }
  // public activateuserplan(data,usertoken){
  //   return this.http.post(global.baseURL + 'userprogram/activateuserplan/',data, {
  //     headers: new HttpHeaders({
  //      'Content-Type':  'application/json',
  //      'Authorization': usertoken
  //       })
  //       }).pipe (data =>
  //         data);
  // }
  public addmeal(mealInfoJson,token){
    return this.http.post(global.baseURL + '/userplan/addmeal/',mealInfoJson, {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': token
        })
        }).pipe (data =>
          data);
  }
}
