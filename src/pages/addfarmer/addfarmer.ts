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
  selector: 'page-addfarmer',
  templateUrl: 'addfarmer.html',
})
export class AddfarmerPage {
  loader: any
  score: any
  amountRange: any
  rates: any[]
  durations: any[]
  formData: any
  districts: any[]
  idtypes: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
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
  getIdTypes() {
    this.backendService.getIdTypes().subscribe(data => {
      if (data.success) {
        this.idtypes = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }


  /*getScore() {
    this.loader.present();
    this.backendService.getUserScore().subscribe(data => {
      //console.log(data)
      this.loader.dismissAll();
      if (data.success) {
        this.score = data.data;
        this.data.creditScore = this.score.totalScore;

      }
    }, (error) => {
      this.loader.dismissAll();
      console.log(error);
    });
  }
  getAmountRange() {
    this.backendService.getAmountRange().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.amountRange = data.data;
        this.data.amount = data.data.minAmount;
        this.data.rate = data.data.rate;
        this.data.days = data.data.days;
        this.data.interest = (data.data.rate/100) * data.data.minAmount;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getRates() {
    this.backendService.getInterestRates().subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.rates = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }
  getDurations() {
    this.backendService.getLoanDurations({}).subscribe(data => {
      //console.log(data)
      if (data.success) {
        this.durations = data.data;
      }
    }, (error) => {
      console.log(error);
    });
  }*/

  valuesChanged() {
    //var self = this
    //console.log('calculate rate and interest');
    /*if (this.data.amount > 0) {
      this.data.interest = this.data.amount * (this.data.rate / 100);
    }
    else{
      this.data.interest = 0;
    }*/
  }

  save() {
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
      this.formData = {};
    }
    refresh() {
      this.formData = {}
    }

  }
