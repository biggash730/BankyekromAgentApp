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
import { UpdatefarmPage } from '../../pages/updatefarm/updatefarm';
import { GetLocationPage } from '../../pages/getlocation/getlocation';


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewfarm',
  templateUrl: 'viewfarm.html',
})
export class ViewfarmPage {
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

  openUpdate(data) {
    this.navCtrl.push(UpdatefarmPage, data);
  }

  getLocation(data) {
    this.navCtrl.push(GetLocationPage, data);
  }


  getFarm() {
    this.backendService.getFarm(this.formData.id).subscribe(data => {
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
    this.getFarm();
  }
}
