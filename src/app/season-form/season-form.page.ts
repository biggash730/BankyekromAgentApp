import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-season-form',
  templateUrl: './season-form.page.html',
  styleUrls: ['./season-form.page.scss'],
})
export class SeasonFormPage implements OnInit {

  myForm: FormGroup;
  record: any;
  type: string;
  seasons: any[];
  farms: any[];
  varieties: any[];
  constructor(private formBuilder: FormBuilder, private router: Router,
              private storageService: StorageService, public events: Events, private geolocation: Geolocation) { }

  ngOnInit() {
    this.setupForm();
    this.record = this.storageService.request;
    if (this.record) {
      this.type = 'Edit';
      this.myForm.patchValue(this.record);
      this.myForm.patchValue({
        datePlanted: new Date(this.record.datePlanted).toISOString().substring(0, 10),
        createdAt: new Date(this.record.createdAt).toISOString().substring(0, 10),
        modifiedAt: new Date(this.record.modifiedAt).toISOString().substring(0, 10)
      });
    } else {
      this.type = 'New';
    }
    this.getFarms();
    this.getSeasons();
    this.getVarieties();
  }

  get id() { return this.myForm.get('id'); }
  get datePlanted() { return this.myForm.get('datePlanted'); }
  get notes() { return this.myForm.get('notes'); }
  get varietyId() { return this.myForm.get('varietyId'); }
  get farmId() { return this.myForm.get('farmId'); }

  private setupForm() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      datePlanted: new FormControl('', Validators.required),
      notes: new FormControl(''),
      varietyId: new FormControl('', Validators.required),
      farmId: new FormControl('', Validators.required),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    });
  }

  getFarms() {
    this.storageService.getKeyValue('farms').then(
      data => {
        this.farms = data;
      }
    );
  }
  getVarieties() {
    this.storageService.getKeyValue('varieties').then(
      data => {
        this.varieties = data;
      }
    );
  }
  getSeasons() {
    this.storageService.getKeyValue('seasons').then(
      data => {
        this.seasons = data;
        if (this.seasons == null) {
          this.seasons = [];
        }
      }
    );
  }

  onFormSubmit(form: any) {
    const farm = this.getFarm(form.farmId);
    const variet = this.getVariety(form.varietyId);
    if (this.type === 'Edit') {
      const index = this.seasons.findIndex(x => x.id === form.id);
      this.seasons[index].modifiedAt = new Date();
      this.seasons[index].location = farm.location;
      this.seasons[index].latitude = farm.latitude;
      this.seasons[index].longitude = farm.longitude;
      this.seasons[index].town = farm.town;
      this.seasons[index].varietyId = form.varietyId;
      this.seasons[index].variety = variet.name;
      this.seasons[index].notes = form.notes;
      this.seasons[index].datePlanted = form.datePlanted;
      this.seasons[index].farmId = form.farmId;
      this.seasons[index].farmCode = form.farmCode;
      this.seasons[index].ghanaPostGps = form.ghanaPostGps;
      this.seasons[index].farmerId = farm.farmerId;
      this.seasons[index].farmer = farm.farmer;
      this.seasons[index].phoneNumber = farm.phoneNumber;
      this.storageService.setKeyValue('seasons', this.seasons);
      this.storageService.presentToast('Updated Successful');
    } else {
      const ID = new Date().getTime();
      const rec = {
        id: ID,
        eId: ID,
        modifiedAt: new Date(),
        createdAt: new Date(),
        notes: form.notes,
        datePlanted: form.datePlanted,
        varietyId: form.serviceId,
        variety: variet.name,
        farmId: form.farmId,
        farmCode: farm.code,
        latitude: farm.latitude,
        longitude: farm.longitude,
        location: farm.location,
        ghanaPostGps: farm.ghanaPostGps,
        farmerId: farm.farmerId,
        town: farm.town,
        farmer: farm.farmer,
        phoneNumber: farm.phoneNumber,
        syncedAt: null
      };
      this.seasons.push(rec);
      this.storageService.setKeyValue('seasons', this.seasons);
      this.storageService.presentToast('Saved Successful');
    }
    this.events.publish('seasons:changed');
    this.storageService.season = null;
    this.router.navigate(['/seasons']);
  }

  getFarm(id) {
    const res = this.farms.find(x => {
      return x.id === +id;
    });
    return res;
  }
  getVariety(id) {
    const res = this.varieties.find(x => {
      return x.id === +id;
    });
    return res;
  }

}

