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
  loader: any
  formData: any
  districts: any[]
  idtypes: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
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

  getFarmer() {
    this.backendService.getFarmer(this.formData.id).subscribe(data => {
      if (data.success) {
        this.formData = data.data
      }
    }, (error) => {
      console.log(error);
    });
  }

  start() {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.getFarmer();
  }
}
