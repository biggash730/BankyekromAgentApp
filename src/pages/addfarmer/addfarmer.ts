import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Events,
  Platform
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
  loader: any
  formData: any
  districts: any[]
  idtypes: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider, private platform: Platform) {
    this.start()
    this.loader = this.loadingCtrl.create({
      content: ""
    });
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
  getIdTypes() {
    this.backendService.getIdTypes().subscribe(data => {
      if (data.success) {
        this.idtypes = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  save() {
    //do validations
    //do save action here
    let self = this


    this.loader.present().then(() => {

      self.backendService.saveFarmer(self.formData).subscribe(data => {
        this.loader.dismissAll();
        if (data.success) {
          let alert = self.alertCtrl.create({
            title: 'Save Successful',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
          self.events.publish('Farmer: saved');
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
        this.loader.dismissAll();
        console.log(error);
      });
    });
  }

  start() {
    this.getDistricts();
    this.getIdTypes();
    this.formData = {};
  }
  refresh() {
    this.formData = {}
  }

}
