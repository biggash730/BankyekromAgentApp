import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-form',
  templateUrl: './farmer-form.page.html',
  styleUrls: ['./farmer-form.page.scss'],
})
export class FarmerFormPage implements OnInit {
record: any;
type: string;
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.record = this.storageService.farmer;
    if (this.record) {
      this.type = 'Edit';
    } else {
      this.type = 'New';
    }
  }

}
