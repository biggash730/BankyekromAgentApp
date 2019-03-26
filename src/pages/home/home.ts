import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score: any
  stats: any


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public storage: Storage, public userService: UserDataProvider,public events: Events) {
    //this.start()
    this.stats = {}
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() {
    this.start()
  }

  onPageWillEnter() {
    //console.log('onPageWillEnter ****on page will enter messages pane');

  }

  getStats() {
    this.backendService.getStats().subscribe(data => {
      if (data.success) {
        this.stats = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  trackSignout() {
    this.events.subscribe('User: SignOut', () => {
      this.backendService.logout().subscribe(data => {
        if (data.success) {
          this.storage.remove(this.userService.HAS_LOGGED_IN)
          this.navCtrl.parent.parent.setRoot(LoginPage);
        }
      }, (error) => {
        console.log(error);
      });
    });
    
  }

  start() {
    this.trackSignout()    
    this.getStats();
  }

}
