import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddfarmPage } from '../../pages/addfarm/addfarm';
import { ViewfarmPage } from '../../pages/viewfarm/viewfarm';
import { LocaldbProvider } from '../../providers/localdb';


@Component({
  selector: 'page-farms',
  templateUrl: 'farms.html'
})
export class FarmsPage {
  farms: any[]
  total: any = 0
  page: any = 1
  size: any = 20
  obj: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.farms = []    
    //this.start()
    this.newFarm()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad farms page');
    this.start()
  }

  ionViewWillEnter() {
    
  }

  newFarm() {
    this.events.subscribe('Farm: saved', () => {
      this.start();
    });
  }

  openAdd() {
    this.navCtrl.push(AddfarmPage);
  }

  openView(data) {
    this.navCtrl.push(ViewfarmPage, data);
  }

  openMap() {
    this.navCtrl.push(AddfarmPage);
  }

  getList() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.localdb.getRecords('farms')
      .then(recs => {
        loader.dismissAll();
        console.log(recs)
        self.farms = recs;
        self.total = recs.length
      })
      .catch((err) => {
        loader.dismissAll();
      });
  }

  start() {
    this.getList()
  }

  doRefresh(refresher) {
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


}
