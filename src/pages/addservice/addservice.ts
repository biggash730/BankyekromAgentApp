import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Events
} from 'ionic-angular';
import {
  BackendProvider
} from '../../providers/backend';


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addservice',
  templateUrl: 'addservice.html',
})
export class AddservicePage {
  loader: any
  formData: any
  districts: any[]
  farmers: any[]
  services: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  getServices() {
    this.backendService.getServices().subscribe(data => {
      if (data.success) {
        this.services = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getDistricts() {
    this.backendService.getDistricts().subscribe(data => {
      if (data.success) {
        this.districts = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getDistrictFarmers(id: number) {
    this.backendService.getDistrictFarmers(id).subscribe(data => {
      if (data.success) {
        this.farmers = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  addService(serv) {
    console.log(serv)
    serv.serviceId = serv.id;
    this.formData.items.push(serv)
  }

  save() {
    //do validations
    //do save action here
    let self = this

    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {
      self.backendService.saveRequest(self.formData).subscribe(data => {
        loader.dismissAll();
        if (data.success) {
          let alert = self.alertCtrl.create({
            title: 'Save Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          self.events.publish('Service: saved');
          self.navCtrl.pop();
        } else {
          let alert = self.alertCtrl.create({
            title: 'Save Error',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, (error) => {
        loader.dismissAll();
        console.log(error);
      });
    });
  }

  start() {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.getDistricts();
    this.getServices();
    this.formData = { items: [] };
  }
  refresh() {
    this.formData = { items: [] };
  }

}
