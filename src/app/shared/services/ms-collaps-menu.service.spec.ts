import { TestBed } from '@angular/core/testing';

import { MsCollapsMenuService } from './ms-collaps-menu.service';

describe('MsCollapsMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsCollapsMenuService = TestBed.get(MsCollapsMenuService);
    expect(service).toBeTruthy();
  });
});
