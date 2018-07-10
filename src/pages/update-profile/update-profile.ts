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
    this.getUserTypes()
    this.getCities()
    this.getStudentStatuses()
    this.getActiveSchools()
    this.getDistricts()
    this.getEmploymentTypes()
    this.getIdTypes()
    //this.getMaritalStatuses()
    this.getNationalities()

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UpdateProfilePage');
  }

  getNationalities() {
    this.backendService.getNationalities().subscribe(data => {
      if (data.success) {
        this.nationalities = data.data;
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

  getCities() {
    this.backendService.getCities({}).subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.cities = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getEducationalLevels() {
    this.backendService.getEducationalLevels().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.eduLevels = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getEmploymentStatuses() {
    this.backendService.getEmploymentStatuses().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.empStatuses = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getEmploymentTypes() {
    this.backendService.getEmploymentTypes().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.empTypes = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getIdTypes() {
    this.backendService.getIdTypes().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.idTypes = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getMaritalStatuses() {
    this.backendService.getMaritalStatuses().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.maritalStatuses = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getReligions() {
    this.backendService.getReligions().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.religions = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getActiveSchools() {
    this.backendService.getactiveschools({}).subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.schools = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getUserTypes() {
    this.backendService.getUserTypes().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.userTypes = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }

  getStudentStatuses() {
    this.backendService.getStudentStatuses().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.studentStatuses = data.data;
      }
    }, (error) => {
      console.log(error);
    });
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
