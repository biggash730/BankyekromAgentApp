import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmFormPage } from './farm-form.page';

describe('FarmFormPage', () => {
  let component: FarmFormPage;
  let fixture: ComponentFixture<FarmFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
