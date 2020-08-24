import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsShopsCollapsMenuComponent } from './ms-shops-collaps-menu.component';

describe('MsShopsCollapsMenuComponent', () => {
  let component: MsShopsCollapsMenuComponent;
  let fixture: ComponentFixture<MsShopsCollapsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsShopsCollapsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsShopsCollapsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
