import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { StorageService } from '../services/storage.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  activity: string;
  syncStarted: boolean;
  data: any;
  constructor(private router: Router, private apisService: ApisService,
              private storageService: StorageService, public menuCtrl: MenuController) {
    this.activity = 'Syncing Data';
  }

  ngOnInit() {
    this.data = {};
  }
  async beginSetup() {
    this.syncStarted = true;
    await this.getFarmers();
  }
  async getFarmers() {
    console.log(1);
    await this.storageService.getKeyValue('farmers').then(
      data => {
        if (data) {
          this.data.farmers = data;
        }
        this.getFarms();
      }
    );
  }

  async getFarms() {
    console.log(2);
    await this.storageService.getKeyValue('farms').then(
      data => {
        if (data) {
          this.data.farms = data;
        }
        this.getSeasons();
      }
    );
  }

  async getSeasons() {
    console.log(3);
    await this.storageService.getKeyValue('seasons').then(
      data => {
        if (data) {
          this.data.seasons = data;
        }
        this.getRequests();
      }
    );
  }

  async getRequests() {
    console.log(4);
    await this.storageService.getKeyValue('requests').then(
      data => {
        if (data) {
          this.data.requests = data;
        }
        this.pushData();
      }
    );
  }

  pushData() {
    console.log(5);
    this.activity = 'Pushing Data';
    this.apisService.pushData(this.data)
      .subscribe(res => {
        this.syncStarted = false;
        if (res.success) {
          this.activity = 'Finished Pushing Data';
          this.onFinish();
        } else {
          this.activity = res.message;
        }
      }, (err) => {
        console.log(err);
      });
  }


  onFinish() {
    this.storageService.clear().then(
      res => {
        this.router.navigate(['/login']);
      },
      error => {
      }
    );
  }
}
