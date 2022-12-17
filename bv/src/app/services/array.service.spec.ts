import {TestBed} from '@angular/core/testing';

import {ArrayService} from './array.service';

describe('ArrayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrayService = TestBed.get(ArrayService);
    expect(service).toBeTruthy();
  });
});
