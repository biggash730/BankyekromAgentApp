import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-season-view',
  templateUrl: './season-view.page.html',
  styleUrls: ['./season-view.page.scss'],
})
export class SeasonViewPage implements OnInit {
  record: any;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.record = this.storageService.season;
  }

  edit() {
    this.router.navigateByUrl(`/season-form`);
  }

}