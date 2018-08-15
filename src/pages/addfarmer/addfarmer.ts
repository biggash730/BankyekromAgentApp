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
  data: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public backendService: BackendProvider, public alertCtrl: AlertController, public events: Events) {
    this.start()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestsPage');
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
    if (this.data.amount > 0) {
      this.data.interest = this.data.amount * (this.data.rate / 100);
    }
    else{
      this.data.interest = 0;
    }
  }

  /*makeRequest() {
    //do validations
    if (this.data.amount > 0) {
      //do save action here
      let self = this

      let loader = this.loadingCtrl.create({
        content: ""
      });
      loader.present().then(() => {

          self.backendService.makeLoanRequest(self.data).subscribe(data => {
            //console.log(data)
            loader.dismissAll();
            if (data.success) {
              let alert = self.alertCtrl.create({
                title: 'Request Successful',
                subTitle: data.message,
                buttons: ['OK']
              });
              alert.present();
              self.events.publish('Request: saved');
              self.navCtrl.pop();
            } else {
              let alert = self.alertCtrl.create({
                title: 'Request Error',
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
    }*/

    start() {
      this.loader = this.loadingCtrl.create({
        content: ""
      });
      this.score = {}
      this.amountRange = {}
      this.data = {}
      this.data.interest = 0.0;
      this.data.rate = 0.0;
      this.data.amount = 0.0;
      //this.getAmountRange()
      //this.getScore()
      //this.getRates()
      //this.getDurations()
    }
    refresh() {
      this.data = {}
    }

  }
