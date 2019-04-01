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
import { ViewseasonPage } from '../../pages/viewseason/viewseason';
import { LocaldbProvider } from '../../providers/localdb';


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
  formData: any
  seasons: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events, public localdb: LocaldbProvider) {
    this.formData = this.navParams.data;
    console.log(JSON.stringify(this.formData))
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequestsPage');
    this.start()
  }

  openUpdate(data) {
    this.navCtrl.push(UpdatefarmPage, data);
  }

  getLocation(data) {
    this.navCtrl.push(GetLocationPage, data);
  }

  openSeason(data) {
    this.navCtrl.push(ViewseasonPage, data);
  }


  getSeasons() {
    let farmId = this.formData.id
    this.localdb.getRecords('seasons')
      .then(recs => {
        console.log(recs)
        this.seasons = recs.filter(s => s.farmId === farmId);
      })
      .catch((err) => {
      });
  }

  start() {
    this.getSeasons();
  }
}
