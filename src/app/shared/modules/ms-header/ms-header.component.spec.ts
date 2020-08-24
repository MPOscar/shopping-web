import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHeaderComponent } from './ms-header.component';

describe('MsHottestReleaseSliderComponent', () => {
  let component: MsHeaderComponent;
  let fixture: ComponentFixture<MsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
