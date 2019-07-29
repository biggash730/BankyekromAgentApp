import { Component, OnInit, ViewChild } from '@angular/core';
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
  constructor(private router: Router, private storageService: StorageService, public menuCtrl: MenuController, public events: Events) {
  }

  ngOnInit() {
    this.getFarms();
    this.storageService.farm = null;
    this.events.subscribe('farms:changed', () => {
      this.getFarms();
    });
  }

  getFarms() {
    this.storageService.getKeyValue('farms').then(
      data => {
        this.records = data;
        this.total = data.length;
        // console.log(data);
      }
    );
  }
  open(obj: any) {
    this.storageService.farm = obj;
    this.router.navigateByUrl(`/farm-view`);
  }
}
