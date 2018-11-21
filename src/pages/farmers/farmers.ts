import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddfarmerPage } from '../../pages/addfarmer/addfarmer';
import { ViewfarmerPage } from '../../pages/viewfarmer/viewfarmer';
import { LocaldbProvider } from '../../providers/localdb';


@Component({
  selector: 'page-farmers',
  templateUrl: 'farmers.html'
})
export class FarmersPage {
  loader: any
  farmers: any[]
  total: any = 0
  page: any = 1
  size: any = 20
  obj: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.farmers = []
    this.start()
    this.newFarmer()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }

  ionViewWillEnter() {
    this.start()
  }

  newFarmer() {
    this.events.subscribe('Farmer: saved', () => {
      this.start();
    });
  }

  openAdd() {
    this.navCtrl.push(AddfarmerPage);
  }

  openView(data) {
    this.navCtrl.push(ViewfarmerPage, data);
  }
  
  getList() {
    let self = this
    this.loader.present().then(() => {
      this.localdb.getRecords('farmers')
        .then(recs => {
          console.log(recs)
          self.loader.dismissAll();
          self.farmers = recs;
          self.total = recs.length
        })
        .catch((err) => { self.loader.dismissAll();});
    })
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
