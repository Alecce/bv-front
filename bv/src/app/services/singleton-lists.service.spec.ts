import {TestBed} from '@angular/core/testing';

import {SingletonListsService} from './singleton-lists.service';

describe('SingletonListsService', () => {
  let service: SingletonListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingletonListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
