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
  loader: any
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

  save() {
    //do validations
    //do save action here
    let self = this

    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {
      self.backendService.saveSeason(self.formData).subscribe(data => {
        loader.dismissAll();
        if (data.success) {
          let alert = self.alertCtrl.create({
            title: 'Save Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          self.events.publish('Season: saved');
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
    this.getVarieties();
    this.formData = {farmer:{}};
  }
  refresh() {
    this.formData = {farmer:{}};
  }

}
