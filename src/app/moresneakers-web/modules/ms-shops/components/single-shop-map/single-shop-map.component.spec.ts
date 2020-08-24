import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShopMapComponent } from './single-shop-map.component';

describe('SingleShopMapComponent', () => {
  let component: SingleShopMapComponent;
  let fixture: ComponentFixture<SingleShopMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShopMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShopMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
