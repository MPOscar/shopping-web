import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsReleasePageShopsComponent } from './ms-release-page-shops.component';

describe('MsReleasePageShopsComponent', () => {
  let component: MsReleasePageShopsComponent;
  let fixture: ComponentFixture<MsReleasePageShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsReleasePageShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsReleasePageShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
