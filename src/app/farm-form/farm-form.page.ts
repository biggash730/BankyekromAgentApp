import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.page.html',
  styleUrls: ['./farm-form.page.scss'],
})
export class FarmFormPage implements OnInit {

  myForm: FormGroup;
  record: any;
  type: string;
  farms: any[];
  farmers: any[];
  districts: any[];
  constructor(private formBuilder: FormBuilder, private router: Router,
              private storageService: StorageService, public events: Events, private geolocation: Geolocation) { }

  ngOnInit() {
    this.setupForm();
    this.record = this.storageService.farm;
    if (this.record) {
      this.type = 'Edit';
      console.log(this.record);
      this.myForm.patchValue(this.record);
      this.myForm.patchValue({
        createdAt: new Date(this.record.createdAt).toISOString().substring(0, 10),
        modifiedAt: new Date(this.record.modifiedAt).toISOString().substring(0, 10)
      });
    } else {
      this.type = 'New';
    }
    this.getfarms();
    this.getFarmers();
    this.getDistricts();
  }

  get id() { return this.myForm.get('id'); }
  get numberOfAcres() { return this.myForm.get('numberOfAcres'); }
  get longitude() { return this.myForm.get('longitude'); }
  get latitude() { return this.myForm.get('latitude'); }
  get location() { return this.myForm.get('location'); }
  get town() { return this.myForm.get('town'); }
  get ghanaPostGps() { return this.myForm.get('ghanaPostGps'); }
  get districtId() { return this.myForm.get('districtId'); }
  get farmerId() { return this.myForm.get('farmerId'); }

  private setupForm() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      numberOfAcres: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
      latitude: new FormControl(0, Validators.required),
      location: new FormControl(''),
      town: new FormControl('', Validators.required),
      ghanaPostGps: new FormControl(''),
      districtId: new FormControl(''),
      farmerId: new FormControl(''),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    });
  }

  setLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.myForm.patchValue({
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      });
    }).catch((error) => {
      this.storageService.presentToast('Error getting location');
    });
  }

  getfarms() {
    this.storageService.getKeyValue('farms').then(
      data => {
        this.farms = data;
      }
    );
  }
  getFarmers() {
    this.storageService.getKeyValue('farmers').then(
      data => {
        this.farmers = data;
      }
    );
  }
  getDistricts() {
    this.storageService.getKeyValue('districts').then(
      data => {
        this.districts = data;
      }
    );
  }

  onFormSubmit(form: any) {
    const frmer = this.getFarmer(form.farmerId);
    const dist = this.getDistrict(form.districtId);
    if (this.type === 'Edit') {
      const index = this.farms.findIndex(x => x.id === form.id);
      this.farms[index].modifiedAt = new Date();
      this.farms[index].location = form.location;
      this.farms[index].latitude = form.latitude;
      this.farms[index].longitude = form.longitude;
      this.farms[index].numberOfAcres = form.numberOfAcres;
      this.farms[index].town = form.town;
      this.farms[index].districtId = form.districtId;
      this.farms[index].district = dist.name;
      this.farms[index].region = dist.region;
      this.farms[index].farmerId = form.farmerId;
      this.farms[index].farmer = frmer.name;
      this.farms[index].phoneNumber = frmer.phoneNumber;
      this.farms[index].ghanaPostGps = form.ghanaPostGps;
      this.storageService.setKeyValue('farms', this.farms);
      this.storageService.presentToast('Updated Successful');
    } else {
      const ID = new Date().getTime();
      const rec = {
        id: ID,
        eId: ID,
        code: ID,
        modifiedAt: new Date(),
        createdAt: new Date(),
        location: form.location,
        latitude: form.latitude,
        longitude: form.longitude,
        numberOfAcres: form.numberOfAcres,
        town: form.town,
        districtId: form.districtId,
        district: dist.name,
        region: dist.region,
        farmerId: form.farmerId,
        farmer: frmer.name,
        phoneNumber: frmer.phoneNumber,
        ghanaPostGps: form.ghanaPostGps,
        syncedAt: null
      };
      this.farms.push(rec);
      this.storageService.setKeyValue('farms', this.farms);
      this.storageService.presentToast('Saved Successful');
    }
    this.events.publish('farms:changed');
    this.storageService.farm = null;
    this.router.navigate(['/farms']);
  }

  getFarmer(id) {
    const res = this.farmers.find(x => {
      return x.id === +id;
    });
    return res;
  }
  getDistrict(id) {
    const res = this.districts.find(x => {
      return x.id === +id;
    });
    return res;
  }

}
