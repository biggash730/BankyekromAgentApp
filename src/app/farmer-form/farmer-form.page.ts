import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-farmer-form',
  templateUrl: './farmer-form.page.html',
  styleUrls: ['./farmer-form.page.scss'],
})
export class FarmerFormPage implements OnInit {

  myForm: FormGroup;
  record: any;
  type: string;
  genders = ['Male', 'Female'];
  farmers: any[];
  constructor(private formBuilder: FormBuilder, private router: Router, private storageService: StorageService, public events: Events) { }

  ngOnInit() {
    this.setupForm();
    this.record = this.storageService.farmer;
    if (this.record) {
      this.type = 'Edit';
      this.myForm.patchValue(this.record);
      this.myForm.patchValue({
        dateOfBirth: new Date(this.record.dateOfBirth).toISOString().substring(0, 10),
        createdAt: new Date(this.record.createdAt).toISOString().substring(0, 10),
        modifiedAt: new Date(this.record.modifiedAt).toISOString().substring(0, 10)
      });
    } else {
      this.type = 'New';
    }
    this.getFarmers();
  }

  get id() { return this.myForm.get('id'); }
  get phoneNumber() { return this.myForm.get('phoneNumber'); }
  get name() { return this.myForm.get('name'); }
  get gender() { return this.myForm.get('gender'); }
  get residentialAddress() { return this.myForm.get('residentialAddress'); }
  get town() { return this.myForm.get('town'); }
  get ghanaPostGps() { return this.myForm.get('ghanaPostGps'); }
  get dateOfBirth() { return this.myForm.get('dateOfBirth'); }

  private setupForm() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      phoneNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      residentialAddress: new FormControl(''),
      town: new FormControl('', Validators.required),
      ghanaPostGps: new FormControl(''),
      dateOfBirth: new FormControl(null),
      createdAt: new FormControl(null),
      createdBy: new FormControl(null),
      modifiedAt: new FormControl(null),
      modifiedBy: new FormControl(null)
    });
  }

  getFarmers() {
    this.storageService.getKeyValue('farmers').then(
      data => {
        this.farmers = data;
      }
    );
  }

  onFormSubmit(form: any) {

    if (this.type === 'Edit') {
      const index = this.farmers.findIndex(x => x.id === form.id);
      // const rec = this.farmers[index];
      this.farmers[index].modifiedAt = new Date();
      this.farmers[index].name = form.name;
      this.farmers[index].phoneNumber = form.phoneNumber;
      this.farmers[index].dateOfBirth = new Date(form.dateOfBirth);
      this.farmers[index].residentialAddress = form.residentialAddress;
      this.farmers[index].town = form.town;
      this.farmers[index].gender = form.gender;
      this.farmers[index].ghanaPostGps = form.ghanaPostGps;
      this.storageService.setKeyValue('farmers', this.farmers);
      this.storageService.presentToast('Updated Successful');
    } else {
      const ID = new Date().getTime();
      const rec =  {
        id : ID,
        eId : ID,
        modifiedAt : new Date(),
        createdAt : new Date(),
        name : form.name,
        phoneNumber : form.phoneNumber,
        dateOfBirth : new Date(form.dateOfBirth),
        residentialAddress : form.residentialAddress,
        town : form.town,
        gender : form.gender,
        ghanaPostGps : form.ghanaPostGps,
        syncedAt: null
      };
      this.farmers.push(rec);
      this.storageService.setKeyValue('farmers', this.farmers);
      this.storageService.presentToast('Saved Successful');
    }
    this.events.publish('farmers:changed');
    this.storageService.farmer = null;
    this.router.navigate(['/farmers']);
  }

}
