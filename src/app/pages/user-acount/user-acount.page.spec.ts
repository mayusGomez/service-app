import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcountPage } from './user-acount.page';

describe('UserAcountPage', () => {
  let component: UserAcountPage;
  let fixture: ComponentFixture<UserAcountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAcountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
