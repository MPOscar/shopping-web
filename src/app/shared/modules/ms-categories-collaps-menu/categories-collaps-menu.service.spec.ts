import { TestBed } from '@angular/core/testing';

import { CategoriesCollapsMenuService } from './categories-collaps-menu.service';

describe('CategoriesCollapsMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesCollapsMenuService = TestBed.get(CategoriesCollapsMenuService);
    expect(service).toBeTruthy();
  });
});
