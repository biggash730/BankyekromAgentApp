import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data';
import { LocaldbProvider } from '../../providers/localdb';
import { BackendProvider } from '../../providers/backend';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  activity: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public storage: Storage, public alertCtrl: AlertController, public localdb: LocaldbProvider, public backendService: BackendProvider,
    private platform: Platform) {
    this.activity = "Please wait, App is being setup for offline use ...";
    this.platform.ready().then(() => {
      this.localdb.createPouchDBs();
      this.localdb.destroyPouchDBs();
      this.localdb.createPouchDBs();
      this.start()
    });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SetupPage');
    //this.localdb.createPouchDBs();
    //this.localdb.destroyPouchDBs();
    //this.localdb.createPouchDBs();
    //this.start()
  }
  ionViewDidEnter() {
    //console.log('ionViewDidLoad SetupPage');
    //this.localdb.createPouchDBs();
    //this.localdb.destroyPouchDBs();
    
  }

  finished() {
    this.navCtrl.setRoot(HomePage)
  }

  pullDistricts() {
    this.activity = "Updating Districts ...";
    this.backendService.getDistricts().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "districts")
        this.activity = "Finished Updating Districts ...";
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullServices() {
    this.activity = "Updating Services ...";
    this.backendService.getServices().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "services")
        this.activity = "Finished Updating Services ...";
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullVarieties() {
    this.activity = "Updating Cassava Varieties ...";
    this.backendService.getVarieties().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "varieties")
        this.activity = "Finished Updating Cassava Varieties ...";
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullIdTypes() {
    this.activity = "Updating Identification Types ...";
    this.backendService.getIdTypes().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "idTypes")
        this.activity = "Finished Updating Identification Types ...";
      }
    }, (error) => {
      console.log(error);
    });
  }

  start() {
    this.storage.get(this.userService.CONNECTIONSTATUS).then((val) => {
      if (val == "offline") {
        let alert = this.alertCtrl.create({
          title: 'Offline Network',
          subTitle: 'Please check that you have internet connection',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
    });
    //pull districts
    this.pullDistricts();
    //pull services
    this.pullServices();
    //pull varieties
    this.pullVarieties();
    //pull idtypes
    this.pullIdTypes();

  }

}
