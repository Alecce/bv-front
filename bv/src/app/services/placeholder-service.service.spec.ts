import {TestBed} from '@angular/core/testing';

import {PlaceholderServiceService} from './placeholder-service.service';

describe('PlaceholderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceholderServiceService = TestBed.get(PlaceholderServiceService);
    expect(service).toBeTruthy();
  });
});
