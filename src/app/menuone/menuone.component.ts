import { MysharedserviceService } from './../services/mysharedservice.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-menuone',
  templateUrl: './menuone.component.html',
  styleUrls: ['./menuone.component.scss'],
})
export class MenuoneComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private mysharedserviceService: MysharedserviceService,
    public loadingController: LoadingController,
    private router: Router,
  ) 
  {

    this.user['id'] = this.auth.getUser()['user_id'] !== undefined ? this.auth.getUser()['user_id'] : '';
    this.user['name'] = this.auth.getUser()['username'] !== undefined ? this.auth.getUser()['username'] : '';
    this.user['imgUrl'] = this.auth.getUser()['imgUrl'] !== undefined ? `${this.getBaseUrl()}${this.auth.getUser()['imgUrl']}` : '';
    
    
  }

  menuHide: boolean = true;

  user:any = {id: -1,  name: '', imgUrl: '' };

  ngOnInit() {
  }
  // ionViewWillEnter() {
  // }
  // ionViewWillLeave(){
  // }
  // ionViewDidEnter(){
  // }

  

  toggleMenu() {
    this.menuHide= !this.menuHide;

    //this.getProfile();/// 

    //console.log("user data menu ", this.auth.getUser() );
    this.getSharedProfile();

  }
  hideMenu(e: Event) {
    console.log("clickOutside");
    this.menuHide= true;
  }


  logout() {
    this.presentLoading();
    this.auth.logout();
  }
  goToTab1(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab1');
  }
  goToTab2(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab2');
  }
  goToRefernEarn(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab1');
  }
  goToProfile(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab3');
  }
  goToHistory(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab1');
  }
  goToChangePassword(){
    this.presentLoading();
    this.router.navigateByUrl('/members/tab1');
  }


  

  getBaseUrl(){
    // return environment.apiEndPoint.replace('/mobiapi/','');
    //!!https://stackoverflow.com/questions/5497318/replace-last-occurrence-of-character-in-string/41899895
    return environment.apiEndPoint.replace(/\/mobiapi\/([^\/mobiapi\/]*)$/, '' + '$1');
  }



  getSharedProfile(){
    let shu = this.mysharedserviceService.getUserSharedData();
    if( shu?.username != undefined ){
      this.user['name'] = shu.username;
      this.user['imgUrl'] = shu.imgUrl;
    }
    
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
