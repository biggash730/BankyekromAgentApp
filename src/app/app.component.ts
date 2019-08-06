import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {
  user: any;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Seasons',
      url: '/seasons',
      icon: 'list'
    },
    {
      title: 'Requests',
      url: '/requests',
      icon: 'list'
    },
    {
      title: 'Farms',
      url: '/farms',
      icon: 'list'
    },
    {
      title: 'Farmers',
      url: '/farmers',
      icon: 'list'
    },
    // {
    //   title: 'Settings',
    //   url: '/settings',
    //   icon: 'list'
    // },
    {
      title: 'Sync Data',
      url: '/sync',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: StorageService,
    private router: Router, public alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // this.initializeApp();
  }

  initializeApp() {
    console.log(0);
    this.platform.ready().then(() => {
      console.log(1);
      this.storage.isLoggedIn().then((val) => {
        console.log(2);
        if (val) {
          this.storage.getCurrentUser().then((v) => {
            this.user = v;
            this.router.navigate(['/dashboard']);
            // this.router.navigate(['/requests']);
          });
        } else {
          this.router.navigate(['/login']);
        }
      });
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
  }
  async logout() {
    const alert = await this.alertCtrl.create({
      subHeader: 'App Logout',
      message: 'Are you sure you want to be logged out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storage.clear().then(
              res => {
                this.router.navigate(['/login']);
              },
              error => {
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
}
