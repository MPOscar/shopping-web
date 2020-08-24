import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionShopsListViewComponent } from './collection-shops-list-view.component';

describe('ShopsListViewComponent', () => {
  let component: CollectionShopsListViewComponent;
  let fixture: ComponentFixture<CollectionShopsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionShopsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionShopsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
