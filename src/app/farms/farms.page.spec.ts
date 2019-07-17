import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsPage } from './farms.page';

describe('FarmsPage', () => {
  let component: FarmsPage;
  let fixture: ComponentFixture<FarmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
