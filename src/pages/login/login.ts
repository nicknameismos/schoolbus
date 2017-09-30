import { HomePage } from './../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Component, ViewChild } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AuthenService, SignupModel, SigninModel } from '@ngcommerce/core';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  dataUser: any = {
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  credentail: any = {};

  @ViewChild(Slides) slides: Slides;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: Facebook,
    public authenService: AuthenService,
    public loadingCtrl: LoadingController
  ) {
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) =>
        this.fb.api('me?fields=email,id,first_name,last_name', null).then((res: FacebookLoginResponse) =>
          this.registerFb(res))
          .catch(e => {
            alert(JSON.stringify(e));
          })
      )
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
  registerFb(data) {
    // alert(JSON.stringify(data));
    this.dataUser.firstName = data.first_name;
    this.dataUser.lastName = data.last_name;
    this.dataUser.email = data.email;
    if (!this.dataUser.username) {
      this.dataUser.username = data.email;
    }
    this.slides.slideTo(1, 500, this.dataUser);

  }

  submit(dataUser) {
    console.log(this.dataUser);
    this.authenService.signUp(this.dataUser).then((data) => {
      this.navCtrl.push(HomePage);
      this.dataUser = '';

    }, (error) => {
      console.error(error);
      alert(JSON.stringify(error));
    })
  }

  logIn() {
    this.credentail.username = this.dataUser.email;
    this.credentail.password = this.dataUser.password;

    let loading = this.loadingCtrl.create();
    loading.present();

    this.authenService.signIn(this.credentail).then((data) => {
      console.log(data);
      loading.dismiss();
      this.navCtrl.push(HomePage);

    }, (error) => {
      loading.dismiss();
      console.error(error);
      alert(JSON.stringify(error));
    })
  }

  next(dataUser) {
    console.log(dataUser);
    this.slides.slideTo(2, 500, dataUser);
  }
  
  register() {
    this.slides.slideTo(1, 500);
  }
}
