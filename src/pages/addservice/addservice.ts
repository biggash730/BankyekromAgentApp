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
import { LocaldbProvider } from '../../providers/localdb';


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
  formData: any
  districts: any[]
  farmers: any[]
  farms: any[]
  services: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = { items: [] };
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
    this.start();
  }

  getServices() {
    this.localdb.getRecords('services')
      .then(recs => {
        this.services = recs;
      })
      .catch((err) => { });
  }

  getDistricts() {
    this.localdb.getRecords('districts')
      .then(recs => {
        this.districts = recs;
      })
      .catch((err) => { });
  }
  getDistrictFarmers(id: number) {
    this.localdb.getRecords('farmers')
      .then(recs => {
        this.farmers = recs.filter(x => x.districtId == id);
      })
      .catch((err) => { });
  }

  getFarmerFarms(id: number) {
    this.localdb.getRecords('farms')
      .then(recs => {
        this.farms = recs.filter(x => x.farmerId == id);
      })
      .catch((err) => { });
  }

  addService(serv:any) {
    serv.serviceId = serv.id;
    this.formData.items.push(serv)
  }

  save(data:any) {
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    data.farmId = data.farm.id
    this.localdb.saveRecord(data, 'requests')
      .then(res => {
        loader.dismissAll();
        //console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Save Successful',
          subTitle: "Services saved Successfully",
          buttons: ['OK']
        });
        alert.present();
        this.events.publish('Service: saved');
        this.formData = { items: [] };
        this.navCtrl.pop();
      })
      .catch((err) => { });
  }

  start() {
    this.getDistricts();
    this.getServices();
    
  }
  refresh() {
    this.formData = { items: [] };
  }

}
