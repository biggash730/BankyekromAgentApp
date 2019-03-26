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
  selector: 'page-updatefarm',
  templateUrl: 'updatefarm.html',
})
export class UpdatefarmPage {
  formData: any
  districts: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  getDistricts() {
    this.localdb.getRecords('districts')
      .then(recs => {
        this.districts = recs;
      })
      .catch((err) => { });
  }

  update() {
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    this.formData.districtId = this.formData.district.id
    this.localdb.saveRecord(this.formData, 'farms')
      .then(res => {
        loader.dismissAll();
        //console.log(res)
        let alert = this.alertCtrl.create({
          title: 'Save Successful',
          subTitle: "Farm saved Successfully",
          buttons: ['OK']
        });
        alert.present();
        this.events.publish('Farm: saved');
        this.navCtrl.pop();
      })
      .catch((err) => { });
  }

  start() {
    this.getDistricts();
  }
}
