import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsListViewComponent } from './shops-list-view.component';

describe('ShopsListViewComponent', () => {
  let component: ShopsListViewComponent;
  let fixture: ComponentFixture<ShopsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
