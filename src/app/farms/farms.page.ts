import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MenuController, Events } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.page.html',
  styleUrls: ['./farms.page.scss'],
})
export class FarmsPage implements OnInit {
  records: any[];
  total: number;
  filter: string;
  constructor(private router: Router, private storageService: StorageService,
              public menuCtrl: MenuController, public events: Events, private zone: NgZone) {
  }

  ngOnInit() {
    const self = this;
    this.getFarms();
    this.storageService.farm = null;
    this.events.subscribe('farms:changed', () => {
      setTimeout(() => {
        this.zone.run(() => {
          self.records = null;
          self.getFarms();
        });
      }, 500);
    });
  }

  async getFarms() {
    await this.storageService.getKeyValue('farms').then(
      data => {
        this.records = data;
        if (data) {
          this.total = data.length;
        }
      }
    );
  }
  open(obj: any) {
    this.storageService.farm = obj;
    this.router.navigateByUrl(`/farm-view`);
  }
}
