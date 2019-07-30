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
  totalFarmers = 0;
  farms: any[];
  totalFarms = 0;
  requests: any[];
  totalRequests = 0;
  seasons: any[];
  totalSeasons = 0;
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
    setTimeout(() => {
      this.sortLists();
      this.getLists();
    }, 2000);
  }

  sortLists() {
    this.farmers.sort((a, b) => {
      a = new Date(a.modifiedAt);
      b = new Date(b.modifiedAt);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    this.farms.sort((a, b) => {
      a = new Date(a.modifiedAt);
      b = new Date(b.modifiedAt);
      return a > b ? -1 : a < b ? 1 : 0;
    });
  }

  getLists() {
    this.farmers = this.farmers.slice(0, 4);
    this.farms = this.farms.slice(0, 4);
  }

  async getFarms() {
    await this.storageService.getKeyValue('farms').then(
      data => {
        this.farms = data;
        if (data) {
          this.totalFarms = data.length;
        }
      }
    );
  }
  async getFarmers() {
    await this.storageService.getKeyValue('farmers').then(
      data => {
        this.farmers = data;
        if (data) {
          this.totalFarmers = data.length;
        }
      }
    );
  }

  async getRequests() {
    await this.storageService.getKeyValue('requests').then(
      data => {
        this.requests = data;
        if (data) {
          this.totalRequests = data.length;
        }
      }
    );
  }
  async getSeasons() {
    await this.storageService.getKeyValue('seasons').then(
      data => {
        this.seasons = data;
        if (data) {
          this.totalSeasons = data.length;
        }
      }
    );
  }
}
