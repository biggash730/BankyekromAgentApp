import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, Events } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.page.html',
  styleUrls: ['./farmers.page.scss'],
})
export class FarmersPage implements OnInit {
  records: any[];
  total: number;
  constructor(private router: Router, private storageService: StorageService, public menuCtrl: MenuController, public events: Events) {
  }

  ngOnInit() {
    this.getFarmers();
    this.storageService.farmer = null;
    this.events.subscribe('farmers:changed', () => {
      this.getFarmers();
    });
  }

  getFarmers() {
    this.storageService.getKeyValue('farmers').then(
      data => {
        this.records = data;
        this.total = data.length;
      }
    );
  }
  open(obj: any) {
    this.storageService.farmer = obj;
    this.router.navigateByUrl(`/farmer-view`);
  }
}
