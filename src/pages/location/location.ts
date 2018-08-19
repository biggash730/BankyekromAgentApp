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
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  loader: any
  formData: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, private geolocation: Geolocation) {
    this.formData = {}
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  getLocation() {
    var self = this;
    this.geolocation.getCurrentPosition().then((resp) => {
      self.formData.latitude = resp.coords.latitude;
      self.formData.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  start() {
    this.loader = this.loadingCtrl.create({
      content: ""
    });
    this.getLocation();
  }
}
