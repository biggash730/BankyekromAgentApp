import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserDataProvider } from '../../providers/user-data';
import { LocaldbProvider } from '../../providers/localdb';
import { BackendProvider } from '../../providers/backend';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html',
})
export class SyncPage {
  activity: any
  status: string
  transfering: boolean
  lastTransferDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public storage: Storage, public alertCtrl: AlertController, public localdb: LocaldbProvider, public backendService: BackendProvider,
    private platform: Platform, public events: Events, public network: Network, ) {
    this.activity = "...";
    this.transfering = false;
    this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        this.status = "Offline";
      });
      this.network.onConnect().subscribe(() => {
        this.status = "Online";
      });
      this.events.subscribe('Sync: Complete', () => {

      });
    });
  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
  }

  startTransfer() {
    let self = this
    this.activity = "Transfer Initiated ...";
    this.transfering = true;
    setTimeout(function () { self.getDate() }, 3000);
  }

  getDate() {
    this.backendService.getLastTransferDate().subscribe(res => {
      if (res.success) {
        this.lastTransferDate = new Date(res.data);
        this.pushFarmers();
      }
    }, (error) => {
      console.log(error);
    });
  }

  PushData(table: string, data: any[]) {
    data = data.filter(x => new Date(x.modifiedAt) > this.lastTransferDate);
    var obj = {
      table: table,
      data: JSON.stringify(data)
    }
    this.backendService.pushData(obj).subscribe(data => {
      if (data.success) {
        this.activity = "Finished pushing " + table;
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Transfer Error',
          subTitle: data.message,
          buttons: ['OK']
        });
        alert.present().then(() => {
          return;
        })
      }
    }, (error) => {
      console.log(error);
    });
  }

  pushFarmers() {
    let self = this
    this.activity = "Pushing Farmers ...";
    this.localdb.getRecords('farmers')
      .then(recs => {
        let lst = recs;
        this.PushData("Farmers", lst);
        setTimeout(function () { self.pushFarms() }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pushFarms() {
    let self = this
    this.activity = "Pushing Farms ...";
    this.localdb.getRecords('farms')
      .then(recs => {
        let lst = recs;
        this.PushData("Farms", lst);
        setTimeout(function () { self.pushSeasons() }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  pushSeasons() {
    let self = this
    this.activity = "Pushing Seasons ...";
    this.localdb.getRecords('seasons')
      .then(recs => {
        let lst = recs;
        this.PushData("Seasons", lst);
        setTimeout(function () { self.pushFarms() }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  pushRequests() {
    this.activity = "Pushing Requests ...";
    this.localdb.getRecords('requests')
      .then(recs => {
        let lst = recs;
        this.PushData("Requests", lst);
        setTimeout(function () {
          this.events.publish('Sync: Complete');
          this.transfering = false;
          this.activity = "Data has been transfered successfully";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
