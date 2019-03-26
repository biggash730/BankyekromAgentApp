import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data';
import { LocaldbProvider } from '../../providers/localdb';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score: any
  stats: any


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public storage: Storage, public userService: UserDataProvider,public events: Events, public localdb: LocaldbProvider) {
    
    this.stats = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.start()
  }

  ionViewWillEnter() {
    //this.start()
  }

  onPageWillEnter() {
    //console.log('onPageWillEnter ****on page will enter messages pane');

  }

  getFarms() {
    this.localdb.getRecords('farms')
      .then(recs => {
        this.stats.registeredFarms = recs.length;
      })
      .catch((err) => {
      });
  }

  getFarmers() {
    this.localdb.getRecords('farmers')
      .then(recs => {
        this.stats.registeredFarmers = recs.length;
      })
      .catch((err) => {
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
    this.getFarms();
    this.getFarmers();
  }

}
