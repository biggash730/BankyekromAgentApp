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
import { UpdatefarmerPage } from '../../pages/updatefarmer/updatefarmer';
import { ViewfarmPage } from '../../pages/viewfarm/viewfarm';
import { LocaldbProvider } from '../../providers/localdb';


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewfarmer',
  templateUrl: 'viewfarmer.html',
})
export class ViewfarmerPage {
  formData: any
  farms: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  openFarm(data) {
    this.navCtrl.push(ViewfarmPage, data);
  }

  openUpdate(data) {
    this.navCtrl.push(UpdatefarmerPage, data);
  }

  getFarms() {
    this.localdb.getRecords('farms')
      .then(recs => {
        this.farms = recs;
      })
      .catch((err) => {
      });
  }

  start() {
    this.getFarms();
  }
}
