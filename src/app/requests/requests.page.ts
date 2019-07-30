import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MenuController, Events } from '@ionic/angular';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  records: any[];
  total: number;
  constructor(private router: Router, private storageService: StorageService,
              public menuCtrl: MenuController, public events: Events, private zone: NgZone) {
  }

  ngOnInit() {
    const self = this;
    this.getRequests();
    this.storageService.farm = null;
    this.events.subscribe('requests:changed', () => {
      setTimeout(() => {
        this.zone.run(() => {
          self.records = null;
          self.getRequests();
        });
      }, 500);
    });
  }

  async getRequests() {
    await this.storageService.getKeyValue('requests').then(
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
    this.storageService.request = obj;
    this.router.navigateByUrl(`/request-view`);
  }
}
