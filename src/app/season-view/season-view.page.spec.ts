import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonViewPage } from './season-view.page';

describe('SeasonViewPage', () => {
  let component: SeasonViewPage;
  let fixture: ComponentFixture<SeasonViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
