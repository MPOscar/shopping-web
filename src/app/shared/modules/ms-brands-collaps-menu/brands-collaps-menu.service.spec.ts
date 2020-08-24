import { TestBed } from '@angular/core/testing';

import { BrandsCollapsMenuService } from './brands-collaps-menu.service';

describe('BrandsCollapsMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandsCollapsMenuService = TestBed.get(BrandsCollapsMenuService);
    expect(service).toBeTruthy();
  });
});
