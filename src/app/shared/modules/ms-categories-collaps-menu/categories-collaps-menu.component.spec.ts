import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCollapsMenuComponent } from './categories-collaps-menu.component';

describe('CategoriesCollapsMenuComponent', () => {
  let component: CategoriesCollapsMenuComponent;
  let fixture: ComponentFixture<CategoriesCollapsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCollapsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCollapsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
