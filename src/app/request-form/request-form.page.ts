import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
})
export class RequestFormPage implements OnInit {

  myForm: FormGroup;
  record: any;
  type: string;
  requests: any[];
  farms: any[];
  services: any[];
  constructor(private formBuilder: FormBuilder, private router: Router,
              private storageService: StorageService, public events: Events, private geolocation: Geolocation) { }

  ngOnInit() {
    this.setupForm();
    this.record = this.storageService.request;
    if (this.record) {
      this.type = 'Edit';
      this.myForm.patchValue(this.record);
      this.myForm.patchValue({
        serviceDate: new Date(this.record.serviceDate).toISOString().substring(0, 10),
        createdAt: new Date(this.record.createdAt).toISOString().substring(0, 10),
        modifiedAt: new Date(this.record.modifiedAt).toISOString().substring(0, 10)
      });
    } else {
      this.type = 'New';
    }
    this.getFarms();
    this.getRequests();
    this.getServices();
  }

  get id() { return this.myForm.get('id'); }
  get serviceDate() { return this.myForm.get('serviceDate'); }
  get notes() { return this.myForm.get('notes'); }
  get serviceId() { return this.myForm.get('serviceId'); }
  get farmId() { return this.myForm.get('farmId'); }

  private setupForm() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      serviceDate: new FormControl('', Validators.required),
      notes: new FormControl(''),
      serviceId: new FormControl('', Validators.required),
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
  getServices() {
    this.storageService.getKeyValue('services').then(
      data => {
        this.services = data;
      }
    );
  }
  getRequests() {
    this.storageService.getKeyValue('requests').then(
      data => {
        this.requests = data;
        if (this.requests == null) {
          this.requests = [];
        }
      }
    );
  }

  onFormSubmit(form: any) {
    const farm = this.getFarm(form.farmId);
    const serv = this.getService(form.serviceId);
    if (this.type === 'Edit') {
      const index = this.requests.findIndex(x => x.id === form.id);
      this.requests[index].modifiedAt = new Date();
      this.requests[index].location = farm.location;
      this.requests[index].latitude = farm.latitude;
      this.requests[index].longitude = farm.longitude;
      this.requests[index].town = farm.town;
      this.requests[index].serviceId = form.serviceId;
      this.requests[index].service = serv.name;
      this.requests[index].notes = form.notes;
      this.requests[index].serviceDate = form.serviceDate;
      this.requests[index].farmId = form.farmId;
      this.requests[index].farmCode = form.farmCode;
      this.requests[index].ghanaPostGps = form.ghanaPostGps;
      this.requests[index].farmerId = farm.farmerId;
      this.requests[index].farmer = farm.farmer;
      this.requests[index].phoneNumber = farm.phoneNumber;
      this.storageService.setKeyValue('requests', this.requests);
      this.storageService.presentToast('Updated Successful');
    } else {
      const ID = new Date().getTime();
      const rec = {
        id: ID,
        eId: ID,
        modifiedAt: new Date(),
        createdAt: new Date(),
        notes: form.notes,
        serviceDate: form.serviceDate,
        serviceId: form.serviceId,
        service: serv.name,
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
      this.requests.push(rec);
      this.storageService.setKeyValue('requests', this.requests);
      this.storageService.presentToast('Saved Successful');
    }
    this.events.publish('requests:changed');
    this.storageService.request = null;
    this.router.navigate(['/requests']);
  }

  getFarm(id) {
    const res = this.farms.find(x => {
      return x.id === +id;
    });
    return res;
  }
  getService(id) {
    const res = this.services.find(x => {
      return x.id === +id;
    });
    return res;
  }

}

