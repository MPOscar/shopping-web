import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsBannerComponent } from './ms-banner.component';

describe('MsBannerComponent', () => {
  let component: MsBannerComponent;
  let fixture: ComponentFixture<MsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
