import { Component, OnInit } from '@angular/core';

import { ApisService } from '../services/apis.service';
import { StorageService } from '../services/storage.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  activity: string;
  syncStarted: boolean;
  constructor(private router: Router, private apisService: ApisService,
              private storageService: StorageService, public menuCtrl: MenuController) {
    this.activity = 'Syncing Data';
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.beginSetup();
  }
  beginSetup() {
    this.syncStarted = true;
    this.pullVarieties();
  }
  pullVarieties() {
    this.activity = 'Pulling Varieties';
    this.apisService.getVarieties()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Varieties';
          this.activity = 'Saving Varieties';
          this.storageService.setKeyValue('varieties', res.data);
          this.activity = 'Finished Saving Varieties';
          this.pullServices();
        }
      }, (err) => {
        console.log(err);
      });

  }

  pullServices() {
    this.activity = 'Pulling Services';
    this.apisService.getServices()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Services';
          this.activity = 'Saving Services';
          this.storageService.setKeyValue('services', res.data);
          this.activity = 'Finished Saving Services';
          this.pullRegions();
        }
      }, (err) => {
        console.log(err);
      });
  }

  pullRegions() {
    this.activity = 'Pulling Regions';
    this.apisService.getRegions()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Regions';
          this.activity = 'Saving Regions';
          this.storageService.setKeyValue('regions', res.data);
          this.activity = 'Finished Saving Regions';
          this.pullDistricts();
        }
      }, (err) => {
        console.log(err);
      });
  }

  pullDistricts() {
    this.activity = 'Pulling Districts';
    this.apisService.getDistricts()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Districts';
          this.activity = 'Saving Districts';
          this.storageService.setKeyValue('districts', res.data);
          this.activity = 'Finished Saving Districts';
          this.pullFarmers();
        }
      }, (err) => {
        console.log(err);
      });
  }


  pullFarmers() {
    this.activity = 'Pulling Farmers';
    this.apisService.getFarmers()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Farmers';
          this.activity = 'Saving Farmers';
          this.storageService.setKeyValue('farmers', res.data);
          this.activity = 'Finished Saving Farmers';
          this.pullFarms();
        }
      }, (err) => {
        console.log(err);
      });
  }

  pullFarms() {
    this.activity = 'Pulling Farms';
    this.apisService.getFarms()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Farms';
          this.activity = 'Saving Farms';
          this.storageService.setKeyValue('farms', res.data);
          this.activity = 'Finished Saving Farms';
          this.pullSeasons();
        }
      }, (err) => {
        console.log(err);
      });

  }

  pullSeasons() {
    this.activity = 'Pulling Seasons';
    this.apisService.getSeasons()
      .subscribe(res => {
        if (res.success) {
          this.activity = 'Finished Pulling Seasons';
          this.activity = 'Saving Seasons';
          this.storageService.setKeyValue('seasons', res.data);
          this.activity = 'Finished Saving Seasons';
          this.onFinish();
        }
      }, (err) => {
        console.log(err);
      });

  }

  onFinish() {
    this.menuCtrl.enable(true);
    this.router.navigate(['/dashboard']);
  }
}
