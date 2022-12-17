import {TestBed} from '@angular/core/testing';

import {DownloadDataServiceService} from './download-data-service.service';

describe('DownloadDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadDataServiceService = TestBed.get(DownloadDataServiceService);
    expect(service).toBeTruthy();
  });
});
