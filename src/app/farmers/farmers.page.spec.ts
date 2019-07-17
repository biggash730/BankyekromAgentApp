import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersPage } from './farmers.page';

describe('FarmersPage', () => {
  let component: FarmersPage;
  let fixture: ComponentFixture<FarmersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
