import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormPage } from './request-form.page';

describe('RequestFormPage', () => {
  let component: RequestFormPage;
  let fixture: ComponentFixture<RequestFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
