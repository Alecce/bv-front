import {TestBed} from '@angular/core/testing';

import {WineListSearchbarServiceService} from './wine-list-searchbar-service.service';

describe('WineListSearchbarServiceService', () => {
  let service: WineListSearchbarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineListSearchbarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
