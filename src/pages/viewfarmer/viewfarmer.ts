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

  openUpdate(data) {
    this.navCtrl.push(UpdatefarmerPage, data);
  }

  getDistricts() {
    this.backendService.getDistricts().subscribe(data => {
      if (data.success) {
        this.districts = data.data;
      }
    }, (error) => {
      console.log(error);
    });
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
    //this.getDistricts();
    //this.getIdTypes();
    this.getFarmer();
  }
}
