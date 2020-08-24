import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShopPageComponent } from './single-shop-page.component';

describe('SingleShopPageComponent', () => {
  let component: SingleShopPageComponent;
  let fixture: ComponentFixture<SingleShopPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShopPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
