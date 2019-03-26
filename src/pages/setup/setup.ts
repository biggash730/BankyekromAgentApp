import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, Events } from 'ionic-angular';
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
    private platform: Platform, public events: Events) {
    this.activity = "Please wait, App is being setup for offline use ...";
    this.platform.ready().then(() => {
      //this.localdb.createPouchDBs();
      //this.localdb.destroyPouchDBs();
      this.localdb.createPouchDBs();
      this.start();
      this.events.subscribe('SETUP: Complete', () => {
        this.finished();
      });
    });
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
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
        //pull services
        this.pullServices();
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
        //pull varieties
        this.pullVarieties();
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
        //pull idtypes
        this.pullIdTypes();
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullIdTypes() {
    this.activity = "Updating Identification Types ...";
    this.backendService.getIdTypes().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "idtypes")
        this.activity = "Finished Updating Identification Types ...";
        //pull idtypes
        this.pullFarmers();
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullFarmers() {
    this.activity = "Updating Farmers ...";
    this.backendService.getAllFarmers().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "farmers")
        this.activity = "Finished Updating Farmers ...";
        this.pullFarms();
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullFarms() {
    this.activity = "Updating Farms ...";
    this.backendService.getAllFarms().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "farms")
        this.activity = "Finished Updating Farms ...";
        this.pullSeasons();
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullSeasons() {
    this.activity = "Updating Seasons ...";
    this.backendService.getAllSeasons().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "seasons")
        this.activity = "Finished Updating Seasons ...";
        this.pullRequests()
      }
    }, (error) => {
      console.log(error);
    });
  }
  pullRequests() {
    this.activity = "Updating Requests ...";
    this.backendService.getAllRequests().subscribe(data => {
      if (data.success) {
        this.localdb.addBulkRecords(data.data, "requests")
        this.activity = "Finished Updating Requests ...";
        this.events.publish('SETUP: Complete');
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
      else {
        //pull districts
        this.pullDistricts();
      }
    });

  }

}
