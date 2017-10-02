import { WalkthroughPage } from './../pages/walkthrough/walkthrough';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Facebook } from '@ionic-native/facebook';
import { EcommerceCoreModule, AuthenService } from '@ngcommerce/core';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WalkthroughPage
  ],
  imports: [
    BrowserModule,
    EcommerceCoreModule.forRoot('https://school-bus-server.herokuapp.com/api/'),
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WalkthroughPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    AuthenService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
