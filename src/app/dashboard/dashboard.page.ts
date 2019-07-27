import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApisService } from '../services/apis.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private apisService: ApisService,
              private storageService: StorageService, public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

}
