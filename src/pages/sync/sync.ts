import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
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
  networkType: string
  transfering: boolean
  lastTransferDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserDataProvider, public storage: Storage, public alertCtrl: AlertController, public localdb: LocaldbProvider, public backendService: BackendProvider, public events: Events, public network: Network) {
    this.activity = "...";
    this.status = "Offline";
    this.networkType = "unknown"
    this.transfering = false;
    this.events.subscribe('Sync: Complete', () => {

    });
    this.events.subscribe('Network: Online', () => {
      this.networkType =  this.network.type;
      this.status = "Online";
    });
    this.events.subscribe('Network: Offline', () => {
      this.networkType =  this.network.type;
      this.status = "Offline";
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad sync page');

    this.userService.getConnectionStatus().then(status => {
      this.status = status;
      this.networkType =  this.network.type;

    })
      .catch((err) => {
      });;

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
        console.log(this.lastTransferDate);
        this.pushFarmers();
      }
    }, (error) => {
      console.log(error);
    });
  }

  PushData(table: string, data: any[]) {
    if(data.length == 0){
      if (table == "Farmers") this.pushFarms();
        if (table == "Farms") this.pushSeasons();
        if (table == "Seasons") this.pushRequests();
    }    
    var obj = {
      table: table,
      data: JSON.stringify(data)
    }
    this.backendService.pushData(obj).subscribe(data => {
      if (data.success) {
        this.activity = "Finished pushing " + table;
        if (table == "Farmers") this.pushFarms();
        if (table == "Farms") this.pushSeasons();
        if (table == "Seasons") this.pushRequests();
        if (table == "Requests") {
          this.events.publish('Sync: Complete');
          this.transfering = false;
          this.activity = "Data has been transfered successfully";
        }
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
    this.activity = "Pushing Farmers ...";
    this.localdb.getRecords('farmers')
      .then(recs => {
        console.log("Farmers")
        var blength = recs.length;
        let lst = recs.filter(x => this.lastTransferDate <= new Date(x.modifiedAt) );
        var alength = lst.length;
        console.log(blength+" / "+alength);
        this.PushData("Farmers", lst);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pushFarms() {
    this.activity = "Pushing Farms ...";
    this.localdb.getRecords('farms')
      .then(recs => {
        var blength = recs.length;
        let lst = recs.filter(x => this.lastTransferDate <= new Date(x.modifiedAt) );
        var alength = lst.length;
        console.log("Farms-- "+blength+" / "+alength);
        this.PushData("Farms", lst);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  pushSeasons() {
    this.activity = "Pushing Seasons ...";
    this.localdb.getRecords('seasons')
      .then(recs => {
        var blength = recs.length;
        let lst = recs.filter(x => this.lastTransferDate <= new Date(x.modifiedAt) );
        var alength = lst.length;
        console.log("Seasons-- "+blength+" / "+alength);
        this.PushData("Seasons", lst);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  pushRequests() {
    this.activity = "Pushing Requests ...";
    this.localdb.getRecords('requests')
      .then(recs => {
        var blength = recs.length;
        let lst = recs.filter(x => this.lastTransferDate <= new Date(x.modifiedAt) );
        var alength = lst.length;
        console.log("Requests-- "+blength+" / "+alength);
        this.PushData("Requests", lst);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
