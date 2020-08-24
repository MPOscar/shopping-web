import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSectionTitleComponent } from './ms-section-title.component';

describe('MsSectionTitleComponent', () => {
  let component: MsSectionTitleComponent;
  let fixture: ComponentFixture<MsSectionTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsSectionTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
