import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsAdvertisementComponent } from './ms-advertisement.component';

describe('MsAdvertisementComponent', () => {
  let component: MsAdvertisementComponent;
  let fixture: ComponentFixture<MsAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
