import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHottestReleaseSliderComponent } from './ms-slider.component';

describe('MsHottestReleaseSliderComponent', () => {
  let component: MsHottestReleaseSliderComponent;
  let fixture: ComponentFixture<MsHottestReleaseSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsHottestReleaseSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHottestReleaseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
