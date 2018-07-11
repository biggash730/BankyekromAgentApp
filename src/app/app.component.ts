import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data';
import { BackendProvider } from '../providers/backend';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public userService: UserDataProvider, public storage: Storage, public backendService: BackendProvider, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'List', component: ListPage, icon: 'body' },
      { title: 'Settings', component: HomePage, icon: 'settings' }
    ];
    this.user = {}

    this.storage.get(this.userService.HAS_LOGGED_IN).then((val) => {

      //console.log(val)
      var res = JSON.parse(val);
      if (res) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = IntroPage;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    //let self = this
    let alert = this.alertCtrl.create({
      title: 'App Logout',
      message: 'Are you sure you want to be logged out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Cancel the request');
            this.backendService.logout().subscribe(data => {
              //console.log(data)
              if (data.success) {
                this.storage.remove(this.userService.HAS_LOGGED_IN)
                this.nav.setRoot(IntroPage);
              }
            }, (error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    alert.present();

  }
}
