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
  selector: 'page-addfarm',
  templateUrl: 'addfarm.html',
})
export class AddfarmPage {
  formData: any
  districts: any[]
  farmers: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
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
  getFarmers() {
    this.localdb.getRecords('farmers')
      .then(recs => {
        this.farmers = recs;
      })
      .catch((err) => { });
  }

  save() {
    let loader = this.loadingCtrl.create({
      content: "Saving ..."
    });
    loader.present();
    this.formData.farmerId = this.formData.farmer.id;
    this.localdb.saveRecord(this.formData,'farms')
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

  saveLive() {
    //do validations
    //do save action here
    let self = this
    let loader = this.loadingCtrl.create({
      content: " ... "
    });
    loader.present().then(() => {
      self.formData.farmerId = self.formData.farmer.id;
      self.backendService.saveFarm(self.formData).subscribe(data => {
        loader.dismissAll();
        if (data.success) {
          let alert = self.alertCtrl.create({
            title: 'Save Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          self.events.publish('Farm: saved');
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
    this.getDistricts();
    this.getFarmers();
    this.formData = {farmer:{}};
  }
  refresh() {
    this.formData = {farmer:{}};
  }

}
