import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShopDetailsComponent } from './single-shop-details.component';

describe('SingleShopDetailsComponent', () => {
  let component: SingleShopDetailsComponent;
  let fixture: ComponentFixture<SingleShopDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShopDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
