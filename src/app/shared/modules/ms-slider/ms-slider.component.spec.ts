import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSliderComponent } from './ms-slider.component';

describe('MsHottestReleaseSliderComponent', () => {
  let component: MsSliderComponent;
  let fixture: ComponentFixture<MsSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
