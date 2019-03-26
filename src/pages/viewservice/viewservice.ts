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
  selector: 'page-viewservice',
  templateUrl: 'viewservice.html',
})
export class ViewservicePage {
  formData: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = this.navParams.data;
    this.start()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
  }

  cancel(data) {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Cancel Service Request',
      message: 'Do you really want to cancel this service request?',
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
            data.status = "Cancelled";
            var res = this.localdb.saveRecord(data,"requests");
            console.log(res);
            self.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  /*getRequest() {
    this.backendService.getRequest(this.formData.id).subscribe(data => {
      if (data.success) {
        this.formData = data.data
      }
    }, (error) => {
      console.log(error);
    });
  }*/

  start() {
    //this.getRequest();
  }
}
