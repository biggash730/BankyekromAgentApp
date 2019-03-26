import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddseasonPage } from '../../pages/addseason/addseason';
import { ViewseasonPage } from '../../pages/viewseason/viewseason';
import { LocaldbProvider } from '../../providers/localdb';


@Component({
  selector: 'page-seasons',
  templateUrl: 'seasons.html'
})
export class SeasonsPage {
  seasons: any[]
  total: any = 0
  page: any = 1
  size: any = 20
  obj: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.seasons = []
    //this.start()
    this.newSeason()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  ionViewWillEnter() {
    this.start()
  }

  newSeason() {
    this.events.subscribe('Season: saved', () => {
      this.start();
    });
  }

  openAdd() {
    this.navCtrl.push(AddseasonPage);
  }

  openView(data) {
    this.navCtrl.push(ViewseasonPage, data);
  }

  getList() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.localdb.getRecords('seasons')
      .then(recs => {
        loader.dismissAll();
        self.seasons = recs;
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
