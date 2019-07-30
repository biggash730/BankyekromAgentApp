import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, Events } from '@ionic/angular';
import { ApisService } from '../services/apis.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  farmers: any[];
  farms: any[];
  requests: any[];
  seasons: any[];
  total: number;
  constructor(private router: Router, private storageService: StorageService,
              public menuCtrl: MenuController, public events: Events, private zone: NgZone) {
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    const self = this;
    this.getFarms();
    this.getFarmers();
    this.getRequests();
    this.getSeasons();
  }

  async getFarms() {
    await this.storageService.getKeyValue('farms').then(
      data => {
        this.farms = data;
      }
    );
  }
  async getFarmers() {
    await this.storageService.getKeyValue('farmers').then(
      data => {
        this.farmers = data;
      }
    );
  }

  async getRequests() {
    await this.storageService.getKeyValue('requests').then(
      data => {
        this.requests = data;
      }
    );
  }
  async getSeasons() {
    await this.storageService.getKeyValue('seasons').then(
      data => {
        this.seasons = data;
      }
    );
  }
}
