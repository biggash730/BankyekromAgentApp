import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.page.html',
  styleUrls: ['./request-view.page.scss'],
})
export class RequestViewPage implements OnInit {
  record: any;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.record = this.storageService.request;
  }

  edit() {
    this.router.navigateByUrl(`/request-form`);
  }

}
