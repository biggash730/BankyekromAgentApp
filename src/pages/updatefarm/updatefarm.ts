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
  selector: 'page-updatefarm',
  templateUrl: 'updatefarm.html',
})
export class UpdatefarmPage {
  loader: any
  formData: any
  districts: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
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

update() {
    //do validations
    //do save action here
    let self = this

    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present().then(() => {

        self.backendService.updateFarm(self.formData).subscribe(data => {
          loader.dismissAll();
          if (data.success) {
            let alert = self.alertCtrl.create({
              title: 'Updated Successful',
              subTitle: data.message,
              buttons: ['OK']
            });
            alert.present();
            self.events.publish('Farm: saved');
            self.navCtrl.pop();
          } else {
            let alert = self.alertCtrl.create({
              title: 'Update Error',
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
    }
  }
