import {TestBed} from '@angular/core/testing';

import {MobileOptionsService} from './mobile-options.service';

describe('MobileOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileOptionsService = TestBed.get(MobileOptionsService);
    expect(service).toBeTruthy();
  });
});
