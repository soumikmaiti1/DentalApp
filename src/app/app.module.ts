import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScoreCardPage } from '../pages/ScoreCard/ScoreCard';
import { SettingsPage } from '../pages/Settings/Settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import {IndexPage} from '../pages/index/index';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { QuizPage } from '../pages/quiz/quiz';
import { Dialogs } from '@ionic-native/dialogs';
@NgModule({
  declarations: [
    MyApp,
    ScoreCardPage,
    SettingsPage,
    HomePage,
    RegistrationPage,
    LoginPage,
    IndexPage,
    QuizPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScoreCardPage,
    SettingsPage,
    HomePage,
    RegistrationPage,
    LoginPage,
    IndexPage,
    QuizPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    Camera,
    SocialSharing,
    Facebook,
    GooglePlus,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
