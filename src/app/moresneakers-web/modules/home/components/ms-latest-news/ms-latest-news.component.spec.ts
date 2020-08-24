import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLatestNewsComponent } from './ms-latest-news.component';

describe('MsLatestNewsComponent', () => {
  let component: MsLatestNewsComponent;
  let fixture: ComponentFixture<MsLatestNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsLatestNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsLatestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
