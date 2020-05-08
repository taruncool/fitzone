import { Component, OnInit,Input  } from '@angular/core';
import { NavParams, NavController, ModalController} from '@ionic/angular';
//import {Http, Headers} from '@angular/http';
import {global} from "../../../app/global";

@Component({
  selector: 'app-filtercountry',
  templateUrl: './filtercountry.page.html',
  styleUrls: ['./filtercountry.page.scss'],
})
export class FiltercountryPage implements OnInit {
  @Input('countrydata') countrydata_ip;
  @Input('phcode') phcode_ip;
  token;
	countrydata;
	tempcountrydata;
	countrysearch;
	alertmsg;
	phcode;
  items:any=[];
  
  constructor(public navCtrl: NavController, public params: NavParams, public modalCntrl: ModalController){
	
    }

  ngOnInit() {

    this.token = localStorage.getItem('usertoken');
		this.countrydata = this.countrydata_ip;
		this.tempcountrydata = this.countrydata_ip;
    this.phcode = this.phcode_ip;

    console.log("this phone code---------",this.phcode);
    
  }

  public dismiss(){
    this.modalCntrl.dismiss(); 
  }

getItems(ev) {
  this.alertmsg =false;
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.countrydata = this.tempcountrydata.filter((item) => {
    return (item.name.toLowerCase().startsWith(val.toLowerCase()));
    })
    if(this.countrydata.length ===0){
    this.alertmsg =true;
    this.alertmsg ="Couldn't find any results";
    }else{
    this.alertmsg =false;
    }
  }
  if(val===''){
    this.countrydata = this.tempcountrydata;
  }
}

public searchCountry(countrysearch){
    /*var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', this.token);
  var creds= {countryname:countrysearch,appreq:1};
  this.http.post(global.baseURL + 'stratadmin/countrySearch/', creds, { headers: headers })
  .subscribe(response => {
    this.countrydata = response.json();
    this.alertmsg =false;
    if(this.countrydata.length ==0){
      this.alertmsg =true;
      this.alertmsg ="Couldn't find any results";
    }
   });*/
}

public submit(){
  //console.log(this.phcode);
  this.modalCntrl.dismiss(this.phcode);
}

}
