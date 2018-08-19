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
  selector: 'page-viewseason',
  templateUrl: 'viewseason.html',
})
export class ViewseasonPage {
  loader: any
  formData: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  deactivate(data) {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Deactivate Planting Season',
      message: 'Do you really want to deactivate this planting season?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            self.backendService.deactivateSeason(data.id).subscribe(data => {
              if (data.success) {
                self.start()
              }
            }, (error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    alert.present();
  }
  getSeason() {
    this.backendService.getSeason(this.formData.id).subscribe(data => {
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
    this.getSeason();
  }
}
