import {TestBed} from '@angular/core/testing';

import {HttpMultiloadService} from './http-multiload.service';

describe('HttpMultiloadService', () => {
  let service: HttpMultiloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMultiloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
