import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsProductTableComponent } from './ms-product-table.component';

describe('MsProductTableComponent', () => {
  let component: MsProductTableComponent;
  let fixture: ComponentFixture<MsProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
