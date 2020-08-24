import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHottestReleasesComponent } from './ms-hottest-releases.component';

describe('MsHottestReleasesComponent', () => {
  let component: MsHottestReleasesComponent;
  let fixture: ComponentFixture<MsHottestReleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsHottestReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHottestReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
