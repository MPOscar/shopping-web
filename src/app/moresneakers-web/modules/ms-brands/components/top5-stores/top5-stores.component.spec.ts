import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5StoresComponent } from './top5-stores.component';

describe('Top5StoresComponent', () => {
  let component: Top5StoresComponent;
  let fixture: ComponentFixture<Top5StoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5StoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5StoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
