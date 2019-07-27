import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-farmer-view',
  templateUrl: './farmer-view.page.html',
  styleUrls: ['./farmer-view.page.scss'],
})
export class FarmerViewPage implements OnInit {
farmerId: number;
record: any;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.record = this.storageService.farmer;
    console.log(this.record);
  }

  edit() {
    this.router.navigateByUrl(`/farmer-form`);
  }

}
