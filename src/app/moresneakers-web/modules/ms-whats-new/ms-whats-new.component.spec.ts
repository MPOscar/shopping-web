import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsWhatsNewComponent } from './ms-whats-new.component';

describe('MsWhatsNewComponent', () => {
  let component: MsWhatsNewComponent;
  let fixture: ComponentFixture<MsWhatsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsWhatsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
