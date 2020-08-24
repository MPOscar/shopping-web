import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsOurPartnersComponent } from './ms-our-partners.component';

describe('MsOurPartnersComponent', () => {
  let component: MsOurPartnersComponent;
  let fixture: ComponentFixture<MsOurPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsOurPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsOurPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
