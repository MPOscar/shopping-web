import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewCollapsMenuComponent } from './whats-new-collaps-menu.component';

describe('WhatsNewCollapsMenuComponent', () => {
  let component: WhatsNewCollapsMenuComponent;
  let fixture: ComponentFixture<WhatsNewCollapsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsNewCollapsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNewCollapsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
