import { TestBed, inject } from '@angular/core/testing';

import { BreadService } from './bread.service';

describe('BreadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadService]
    });
  });

  it('should be created', inject([BreadService], (service: BreadService) => {
    expect(service).toBeTruthy();
  }));
});
