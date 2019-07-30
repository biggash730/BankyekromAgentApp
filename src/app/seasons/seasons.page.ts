import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MenuController, Events } from '@ionic/angular';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.page.html',
  styleUrls: ['./seasons.page.scss'],
})
export class SeasonsPage implements OnInit {
  records: any[];
  total: number;
  constructor(private router: Router, private storageService: StorageService,
              public menuCtrl: MenuController, public events: Events, private zone: NgZone) {
  }

  ngOnInit() {
    const self = this;
    this.getSeasons();
    this.storageService.farm = null;
    this.events.subscribe('seasons:changed', () => {
      setTimeout(() => {
        this.zone.run(() => {
          self.records = null;
          self.getSeasons();
        });
      }, 500);
    });
  }

  async getSeasons() {
    await this.storageService.getKeyValue('seasons').then(
      data => {
        this.records = data;
        if (data) {
          this.total = data.length;
        }
        console.log(data);
      }
    );
  }
  open(obj: any) {
    this.storageService.season = obj;
    this.router.navigateByUrl(`/season-view`);
  }
}

