import {TestBed} from '@angular/core/testing';

import {CloseSubscreenSecviceService} from './close-subscreen-secvice.service';

describe('CloseSubscreenSecviceService', () => {
  let service: CloseSubscreenSecviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseSubscreenSecviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
