import { TestBed } from '@angular/core/testing';

import { WhatsNewCollapsMenuService } from './whats-new-collaps-menu.service';

describe('WhatsNewCollapsMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhatsNewCollapsMenuService = TestBed.get(WhatsNewCollapsMenuService);
    expect(service).toBeTruthy();
  });
});
