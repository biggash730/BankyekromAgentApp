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
  selector: 'page-addfarmer',
  templateUrl: 'addfarmer.html',
})
export class AddfarmerPage {
  formData: any
  districts: any[]
  idtypes: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad add farmer Page');
    this.start()
  }

  getDistricts() {
    this.localdb.getRecords('districts')
      .then(recs => {
        this.districts = recs;
      })
      .catch((err) => { });
  }
  getIdTypes() {
    this.localdb.getRecords('idtypes')
      .then(recs => {
        this.idtypes = recs;
      })
      .catch((err) => { });
  }

  save(data: any) {
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    if(data.idType) data.idTypeId = data.idType.id;
    data.districtId = data.district.id
    this.localdb.saveRecord(data,'farmers')
      .then(res => {
        loader.dismissAll();
        console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Save Successful',
          subTitle: "Farmer saved Successfully",
          buttons: ['OK']
        });
        alert.present();
        this.events.publish('Farmer: saved');
        this.formData = {};
        this.navCtrl.pop();
      })
      .catch((err) => { });
  }

  start() {
    this.getDistricts();
    this.getIdTypes();    
  }
  refresh() {
    this.formData = {}
  }

}
