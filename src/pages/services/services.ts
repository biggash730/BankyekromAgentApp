import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddservicePage } from '../../pages/addservice/addservice';
import { ViewservicePage } from '../../pages/viewservice/viewservice';
import { LocaldbProvider } from '../../providers/localdb';


@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
  services: any[]
  total: any = 0
  page: any = 1
  size: any = 20
  obj: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.services = []
    this.newService()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
    this.start()
  }

  ionViewWillEnter() {
    
  }

  newService() {
    this.events.subscribe('Service: saved', () => {
      this.start();
    });
  }

  openAdd() {
    this.navCtrl.push(AddservicePage);
  }

  openView(data) {
    this.navCtrl.push(ViewservicePage, data);
  }

  getList() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    this.localdb.getRecords('requests')
      .then(recs => {
        loader.dismissAll();
        self.services = recs;
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
