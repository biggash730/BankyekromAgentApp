import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.page.html',
  styleUrls: ['./farmers.page.scss'],
})
export class FarmersPage implements OnInit {
  records: any[];
  total: number;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private router: Router, private storageService: StorageService, public menuCtrl: MenuController) {
  }

  ngOnInit() {
    this.getFarmers();
    this.storageService.farmer = null;
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.records.length === this.total) {
        event.target.disabled = true;
      }
    }, 500);
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

  addNew() {

  }
}
