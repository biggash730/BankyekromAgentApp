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
    //console.log('ionViewDidLoad RequestsPage');
  }

  ionViewWillEnter() {
    this.start()
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
        self.farms = recs;
        self.total = recs.length
      })
      .catch((err) => {
        loader.dismissAll();
      });
  }

  start() {
    this.page = 1; 
    this.obj = { pager: { page: this.page, size: this.size } };   
    this.getList()
  }

  loadMore() {
    let self = this
    self.obj.pager.page = self.obj.pager.page + 1;
    self.getList()
  }

  doRefresh(refresher) {
    this.start()
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }


}
