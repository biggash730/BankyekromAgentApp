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
import { FarmersPage } from '../pages/farmers/farmers';
import { AddfarmerPage } from '../pages/addfarmer/addfarmer';
import { UpdatefarmerPage } from '../pages/updatefarmer/updatefarmer';
import { ViewfarmerPage } from '../pages/viewfarmer/viewfarmer';
import { FarmsPage } from '../pages/farms/farms';
import { AddfarmPage } from '../pages/addfarm/addfarm';
import { ViewfarmPage } from '../pages/viewfarm/viewfarm';
import { UpdatefarmPage } from '../pages/updatefarm/updatefarm';
import { GetLocationPage } from '../pages/getlocation/getlocation';
import { LocationPage } from '../pages/location/location';
import { SeasonsPage } from '../pages/seasons/seasons';
import { AddseasonPage } from '../pages/addseason/addseason';
import { ViewseasonPage } from '../pages/viewseason/viewseason';
import { ServicesPage } from '../pages/services/services';
import { AddservicePage } from '../pages/addservice/addservice';
import { ViewservicePage } from '../pages/viewservice/viewservice';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { ProfilePage } from '../pages/profile/profile';
import { PhotoPage } from '../pages/photo/photo';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';


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
    IntroPage,
    LoginPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    FarmersPage,
    AddfarmerPage,
    ViewfarmerPage,
    UpdatefarmerPage,
    FarmsPage,
    AddfarmPage,
    ViewfarmPage,
    UpdatefarmPage,
    GetLocationPage,
    LocationPage,
    SeasonsPage,
    AddseasonPage,
    ViewseasonPage,
    ServicesPage,
    AddservicePage,
    ViewservicePage
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
    IntroPage,
    LoginPage,
    ProfilePage,
    PhotoPage,
    UpdateProfilePage,
    SettingsPage,
    FarmersPage,
    AddfarmerPage,
    ViewfarmerPage,
    UpdatefarmerPage,
    FarmsPage,
    AddfarmPage,
    ViewfarmPage,
    UpdatefarmPage,
    GetLocationPage,
    LocationPage,
    SeasonsPage,
    AddseasonPage,
    ViewseasonPage,
    ServicesPage,
    AddservicePage,
    ViewservicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
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
