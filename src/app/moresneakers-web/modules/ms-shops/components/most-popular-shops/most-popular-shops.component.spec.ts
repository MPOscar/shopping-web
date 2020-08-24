import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularShopsComponent } from './most-popular-shops.component';

describe('MostPopularShopsComponent', () => {
  let component: MostPopularShopsComponent;
  let fixture: ComponentFixture<MostPopularShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopularShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
