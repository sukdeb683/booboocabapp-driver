import { MysharedserviceService } from './../services/mysharedservice.service';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
//import { Event } from '@angular/router';

import { UserShareData } from '../shared/models/user-data';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private auth: AuthService,
    private mysharedserviceService: MysharedserviceService
  ) 
  {
    this.user.id = this.auth.getUser()['user_id'] !== undefined ? this.auth.getUser()['user_id'] : -1;
  }

  user:any = {
    id: -1,
    first_name: '',
    last_name: '',
    imgUrl: '',
    username:'', // and email
    phone: ''
  };

  userShareData: UserShareData;

  ionViewWillEnter() {
    this.auth.setNewAccess();

    setTimeout(() => {
      this.getProfile();

    }, 500);

  }

  ionViewDidEnter(){
  }
  

  logout() {
    this.auth.logout();
  }

  // getBaseUrl(){
  //   // return environment.apiEndPoint.replace('/mobiapi/','');
  //   //!!https://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string/41899895
  //   return environment.apiEndPoint.replace(/\/mobiapi\/([^\/mobiapi\/]*)$/, '' + '$1');
  // }



  getProfile(){
    this.mysharedserviceService.getProfile(this.user.id).subscribe(
      async res => {
        console.log(" response: " , res );
        this.user.phone = res.hasOwnProperty('phone') ? res['phone'] : '' ;
        this.user.first_name = res.hasOwnProperty('first_name') ? res['first_name'] : '' ;
        this.user.last_name = res.hasOwnProperty('last_name') ? res['last_name'] : '' ;
        this.user.username = res.hasOwnProperty('username') ? res['username'] : '' ;
        
        this.user.imgUrl = res.hasOwnProperty('img_url') ? res['img_url'] : '';
      },
      err => { console.log(" err: ", err); },
      () => {
        this.userShareData = <UserShareData>this.user;
        this.mysharedserviceService.setUserSharedData( this.userShareData);
      }
    );
  }

  doRefresh(event:any) {
    console.log('Begin async operation');
    this.auth.setNewAccess();

    setTimeout(() => {
      
      this.getProfile();
      console.log('Async operation has ended');

      event.target.complete();
    }, 1000);
  }


    
  saveProfileTextData(){
    this.userShareData = <UserShareData>this.user;
    this.mysharedserviceService.setUserSharedData(this.userShareData);

    
    this.mysharedserviceService.saveProfileTextData().subscribe(
      async res => {  console.log(" @tabs3 ", res)  },
      err => { console.log(" err: ", err); },
      () => {}

    );
  }



}


