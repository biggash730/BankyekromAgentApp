import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-farm-view',
  templateUrl: './farm-view.page.html',
  styleUrls: ['./farm-view.page.scss'],
})
export class FarmViewPage implements OnInit {
farmerId: number;
record: any;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.record = this.storageService.farm;
  }

  edit() {
    this.router.navigateByUrl(`/farm-form`);
  }

}
