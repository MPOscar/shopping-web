import { TestBed } from '@angular/core/testing';

import { MsShopsCollapsMenuService } from './ms-shops-collaps-menu.service';

describe('MsShopsCollapsMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsShopsCollapsMenuService = TestBed.get(MsShopsCollapsMenuService);
    expect(service).toBeTruthy();
  });
});
