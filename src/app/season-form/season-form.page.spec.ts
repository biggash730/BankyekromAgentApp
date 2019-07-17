import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonFormPage } from './season-form.page';

describe('SeasonFormPage', () => {
  let component: SeasonFormPage;
  let fixture: ComponentFixture<SeasonFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
