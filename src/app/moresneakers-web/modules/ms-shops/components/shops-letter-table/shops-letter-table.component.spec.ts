import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsLetterTableComponent } from './shops-letter-table.component';

describe('ShopsLetterTableComponent', () => {
  let component: ShopsLetterTableComponent;
  let fixture: ComponentFixture<ShopsLetterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsLetterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsLetterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
