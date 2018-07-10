import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  score: any
  stats: any
  loan: any


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public storage: Storage, public userService: UserDataProvider,public events: Events) {
    this.start()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() {
    this.start()
  }

  onPageWillEnter() {
    console.log('onPageWillEnter ****on page will enter messages pane');

  }

  getScore() {
    this.backendService.getUserScore().subscribe(data => {
      //console.log(data.data)
      if (data.success) {
        this.score = data.data.scorePercentage;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getActiveLoan() {
    this.backendService.getActiveLoan().subscribe(data => {
      //console.log(data)

      if (data.success) {
        this.loan = data.data;
        this.loan.showActive = true;
      }
      else {
        this.loan.showActive = false;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getStats() {
    this.backendService.getUserStats().subscribe(data => {
      //console.log(data)
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
    this.score = 0
    this.stats = {}
    this.loan = {}
    this.getScore()
    this.getStats();
    this.getActiveLoan()
  }

}
