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
 * Generated class for the UpdateProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  profile: any
  cities: any[]
  eduLevels: any[]
  empStatuses: any[]
  empTypes: any[]
  idTypes: any[]
  maritalStatuses: any[]
  religions: any[]
  genderOpts: any[]
  userTypes: any[]
  studentStatuses: any[]
  schools: any[]
  nationalities: any[]
  districts: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.profile = {}
    this.genderOpts = ["Male", "Female"]
    this.getProfile()
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UpdateProfilePage');
  }

  

  getProfile() {
    this.backendService.getProfile().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.profile = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  updateProfile() {
    let self = this
    let loader = this.loadingCtrl.create({
      content: "Updating ..."
    });
    loader.present().then(() => {
      //todo: do validations on it

      self.backendService.updateProfile(self.profile).subscribe(data => {
        //console.log(data)
        loader.dismissAll();
        if (data.success) {
          self.navCtrl.pop();
          self.events.publish('Profile: Updated');

        } else {
          let alert = self.alertCtrl.create({
            title: 'Error',
            subTitle: data.message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, (error) => {
        loader.dismissAll();
        console.log(error);
      });
    })

  }

}
