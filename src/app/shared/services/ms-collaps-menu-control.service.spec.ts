import { TestBed } from '@angular/core/testing';

import { MsCollapsMenuControlService } from './ms-collaps-menu-control.service';

describe('MsCollapsMenuControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsCollapsMenuControlService = TestBed.get(MsCollapsMenuControlService);
    expect(service).toBeTruthy();
  });
});
