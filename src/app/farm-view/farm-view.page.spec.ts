import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmViewPage } from './farm-view.page';

describe('FarmViewPage', () => {
  let component: FarmViewPage;
  let fixture: ComponentFixture<FarmViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
