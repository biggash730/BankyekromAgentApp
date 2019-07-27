import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder, private router: Router, private storageService: StorageService) { }

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

  onFormSubmit(form: NgForm) {
    // this.apisService.login(form)
    //   .subscribe(res => {
    //     if (res.success) {
    //       this.storageService.setLoggedIn();
    //       this.storageService.setCurrentUser(res.data);
    //       this.storageService.setToken(res.data.token);
    //       this.router.navigate(['/setup']);
    //       this.presentToast('Login Successful');
    //     }
    //   }, (err) => {
    //     console.log(err);
    //   });
  }

}
