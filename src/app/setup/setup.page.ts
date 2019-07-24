import { Component, OnInit } from '@angular/core';

import { ApisService } from '../services/apis.service';
import { StorageService } from '../services/storage.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  activity: string;
  constructor(private router: Router, private apisService: ApisService, private databaseService: DatabaseService) {
    this.activity = 'Syncing Data';
    this.pullVarieties();
  }

  ngOnInit() {
  }

  pullVarieties() {
    this.activity = 'Pulling Varieties';
    this.apisService.getVarieties()
      .subscribe(res => {
        if (res.success) {
          this.databaseService.createBulk(res.data, 'varieties');
          this.activity = 'Finished Pulling Varieties';
        }
      }, (err) => {
        console.log(err);
      });

  }

}
