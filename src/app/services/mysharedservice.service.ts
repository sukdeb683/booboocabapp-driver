import { UserShareData } from './../shared/models/user-data';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Mydata } from '../shared/models/mydata.model';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';

import { take, map, switchMap } from 'rxjs/operators';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const TOKEN_REFRESH = 'jwt-token-refresh';

@Injectable({
  providedIn: 'root'
})
export class MysharedserviceService {

  public user: Observable<any>;
  public userData = new BehaviorSubject(null);

  private access: string = '';
  private refresh: string = '';

  private newaccess: string = '';
  

  //public sharedData = new BehaviorSubject(null);
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private auth:AuthService
  ) {

      this.apiEndPoint = environment.apiEndPoint;
      
      //this.auth.loadStoredToken();

      //this.loadTokenRefresh();

    }

  apiEndPoint: string="";  

  private mydata: Mydata;


  private userDataShared: UserShareData;

  // myUserData:any = {
  //   id: -1,
  //   first_name: '',
  //   last_name: '',
  //   imgUrl: '',
  //   username:'', // and email
  //   phone: ''
  // };


   
  

  getMydata(){
    return this.mydata;
  }

  setMydata(data: Mydata){
    this.mydata = data;
  }



  getUserSharedData(){
    return this.userDataShared;
  }

  setUserSharedData(data: UserShareData){
    console.log(" @setUserSharedData " );
    
    this.userDataShared = data;
  }



  createRide():Observable<any> {

    console.log("@createRide : ", this.auth.newaccess);

    let data = this.mydata;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + this.auth.newaccess
      })
    };
    return this.http.post(`${this.apiEndPoint}rest_createride/`, JSON.stringify(data), httpOptions);
  }


  ListPassengers():Observable<any>{
    console.log("@ListPassengers...");

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + this.auth.newaccess
      })
    };

    return this.http.get<any[]>(`${this.apiEndPoint}rest_listpassengers/`, httpOptions);

  }

  deletePassenger(pk: number):Observable<any>{

    console.log("@deletePassenger : ", this.auth.newaccess);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + this.auth.newaccess
      })
    };
    return this.http.post(`${this.apiEndPoint}rest_deleteride/${pk}/`, JSON.stringify({}), httpOptions);
  }


  getProfile(id: number):Observable<any>{
    console.log("@GetProfile...");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + this.auth.newaccess
      })
    };

    //return this.http.post(`${this.apiEndPoint}hello/`, JSON.stringify({}), httpOptions);
    return this.http.get<any[]>(`${this.apiEndPoint}users/${id}/`, httpOptions);     
  }


  saveProfileTextData():Observable<any>{
    console.log("@saveProfileTextData", this.userDataShared );


    let data = this.userDataShared;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer  ' + this.auth.newaccess
      })
    };
    //Boilerplate code
    return this.http.post(`${this.apiEndPoint}rest_saveprofiletext/`, JSON.stringify(data), httpOptions)
      .pipe(
        take(1),
        map(res => { return res; } ),
        switchMap( 
          r =>{
            console.log(" switchMap : ", r);
            let a = of(<any>r);
            return a;  
          }
        )
      );
  }




}
