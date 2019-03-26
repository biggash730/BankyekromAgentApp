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
  selector: 'page-addseason',
  templateUrl: 'addseason.html',
})
export class AddseasonPage {
  formData: any
  districts: any[]
  farmers: any[]
  farms: any[]
  varieties: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  getVarieties() {
    this.localdb.getRecords('varieties')
      .then(recs => {
        this.varieties = recs;
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

  save(data: any) {
    let self = this
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    data.farmId = data.farm.id;
    data.varietyId = data.variety.id
    this.localdb.saveRecord(self.formData,'seasons')
      .then(res => {
        loader.dismissAll();
        //console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Save Successful',
          subTitle: "Season saved Successfully",
          buttons: ['OK']
        });
        alert.present();
        this.events.publish('Season: saved');
        this.navCtrl.pop();
      })
      .catch((err) => { });
  }

  start() {
    this.getDistricts();
    this.getVarieties();
    this.formData = {farmer:{}};
  }
  refresh() {
    this.formData = {farmer:{}};
  }

}
