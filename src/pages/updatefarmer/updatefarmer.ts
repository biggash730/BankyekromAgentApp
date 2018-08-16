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


/**
 * Generated class for the AddrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-updatefarmer',
  templateUrl: 'updatefarmer.html',
})
export class UpdatefarmerPage {
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

  getFarmer() {
    this.backendService.getFarmer(this.formData.id).subscribe(data => {
      if (data.success) {
        this.formData = data.data
      }
    }, (error) => {
      console.log(error);
    });
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

update() {
    //do validations
    //do save action here
    let self = this

    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {

        self.backendService.saveFarmer(self.formData).subscribe(data => {
          loader.dismissAll();
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
      this.getIdTypes();
      this.getFarmer();
    }
  }
