import { MysharedserviceService } from './../services/mysharedservice.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserShareData } from '../shared/models/user-data';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    pw: ''
  };
 
  constructor(
    private auth: AuthService,
    private mysharedserviceService: MysharedserviceService,
    private router: Router,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {}
 
  ngOnInit() {}

  user:any = {
    id: -1,
    first_name: '',
    last_name: '',
    imgUrl: '',
    username:'', // and email
    phone: ''
  };

  userShareData: UserShareData;

  private async showAlert(header:string , msg:string ) {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert-class',
      mode: "ios",
      header: header,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentLoading( duration: number ) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: duration
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }









 
  login() {
    this.presentLoading(4000);
    this.auth.login(this.credentials).subscribe(
      async res => {
        if (res) {
          console.log('login page res ', res);
          this.router.navigateByUrl('/members');
        } else {
          this.showAlert("Login Failed", "Wrong credentials");
        }
      },
      err => { 
        console.log('HTTP Error', err);
        this.showAlert("Error", err.error['detail'] !== undefined ? err.error['detail'] : "Invalid Credentials" ); //"Invalid Credentials"
      },
      () => {

        console.log( this.auth.getUser()['user_id'] );/////////
        this.getProfile( this.auth.getUser()['user_id'] );///////

        console.log('HTTP request completed.'); 
      }
    );
  }







  getProfile(id :number){
    this.mysharedserviceService.getProfile(id).subscribe(
      async res => {
        //console.log(" 1111111 response: " , res['phone'] );

        this.user['id'] = id;
        this.user['first_name'] = res.hasOwnProperty('first_name') ? res['first_name'] : '' ;
        this.user['last_name'] = res.hasOwnProperty('last_name') ? res['last_name'] : '' ;
        this.user['username'] = res.hasOwnProperty('username') ? res['username'] : '' ;
        this.user['imgUrl'] = res.hasOwnProperty('img_url') ? res['img_url'] : '';
        this.user['phone'] = res.hasOwnProperty('phone')  ? res['phone'] : '';
      
      },
      err => { console.log(" err: ", err); },
      () => {
        this.userShareData = <UserShareData>this.user;
        this.mysharedserviceService.setUserSharedData( this.userShareData);
      }
    );
  }



  
}