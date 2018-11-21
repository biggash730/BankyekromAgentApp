import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddfarmerPage } from '../../pages/addfarmer/addfarmer';
import { ViewfarmerPage } from '../../pages/viewfarmer/viewfarmer';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
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
      self.backendService.getFarmers(self.obj).subscribe(data => {
        //console.log(data)
        this.loader.dismissAll();
        if (data.success) {
          self.farmers = data.data;
          self.total = data.total
        }
      }, (error) => {
        this.loader.dismissAll();
        console.log(error);
      });
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
