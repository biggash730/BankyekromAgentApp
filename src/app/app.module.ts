import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {Storage, IonicStorageModule} from '@ionic/storage';
import {HttpModule, XHRBackend, RequestOptions, Http} from '@angular/http';
import {HttpInterceptor} from './http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { UserDataProvider } from '../providers/user-data';
import { BackendProvider } from '../providers/backend';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { VerifyPage } from '../pages/verify/verify';
import { ResendVerificationPage } from '../pages/resend-verification/resend-verification';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { PhotoPage } from '../pages/photo/photo';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { DashboardPage } from '../pages/dashboard/dashboard';;
import { SettingsPage } from '../pages/settings/settings';
import { ResetPage } from '../pages/reset/reset';
import { ResetRequestPage } from '../pages/reset-request/reset-request';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var window;

export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    window.Ionic.handleNewError(err);
  }
}

export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
  return new HttpInterceptor(xhrBackend, requestOptions, storage);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    LoginPage,
    SignupPage,
    VerifyPage,
    ResendVerificationPage,
    ResetPage,
    ResetRequestPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    LoginPage,
    SignupPage,
    VerifyPage,
    ResendVerificationPage,
    ResetPage,
    ResetRequestPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserDataProvider,
    BackendProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: Http,
      useFactory: httpInterceptorFactory,
      deps: [XHRBackend, RequestOptions, Storage]
    },
  ]
})
export class AppModule {}
