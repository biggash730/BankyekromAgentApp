import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerFormPage } from './farmer-form.page';

describe('FarmerFormPage', () => {
  let component: FarmerFormPage;
  let fixture: ComponentFixture<FarmerFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
