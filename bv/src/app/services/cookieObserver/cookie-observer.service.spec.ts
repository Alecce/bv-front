import {TestBed} from '@angular/core/testing';

import {CookieObserverService} from './cookie-observer.service';

describe('CookieObserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieObserverService = TestBed.get(CookieObserverService);
    expect(service).toBeTruthy();
  });
});
