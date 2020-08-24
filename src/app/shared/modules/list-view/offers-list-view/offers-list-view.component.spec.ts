import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListViewComponent } from './offers-list-view.component';

describe('CategoriesListViewComponent', () => {
  let component: OffersListViewComponent;
  let fixture: ComponentFixture<OffersListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
