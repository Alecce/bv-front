import {TestBed} from '@angular/core/testing';

import {HttpMemoryService} from './http-memory.service';

describe('HttpMemoryService', () => {
  let service: HttpMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
