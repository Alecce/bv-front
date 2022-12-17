import {TestBed} from '@angular/core/testing';

import {HttpLocalReserveService} from './http-local-reserve.service';

describe('HttpLocalReserveService', () => {
  let service: HttpLocalReserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLocalReserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
