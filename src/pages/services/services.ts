import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend';
import { AddservicePage } from '../../pages/addservice/addservice';
import { ViewservicePage } from '../../pages/viewservice/viewservice';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.services = []
    this.start()
    this.newService()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
  }

  ionViewWillEnter() {
    this.start()
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
    loader.present().then(() => {
      self.backendService.getRequests(self.obj).subscribe(data => {
        //console.log(data)
        loader.dismissAll();
        if (data.success) {
          self.services = data.data;
          self.total = data.total
        }
      }, (error) => {
        loader.dismissAll();
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
