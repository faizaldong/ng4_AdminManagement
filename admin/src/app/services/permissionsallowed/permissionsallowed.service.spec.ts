import { TestBed, inject } from '@angular/core/testing';

import { PermissionsallowedService } from './permissionsallowed.service';

describe('PermissionsallowedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsallowedService]
    });
  });

  it('should be created', inject([PermissionsallowedService], (service: PermissionsallowedService) => {
    expect(service).toBeTruthy();
  }));
});
