import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressPage } from './user-address.page';

describe('UserAddressPage', () => {
  let component: UserAddressPage;
  let fixture: ComponentFixture<UserAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
