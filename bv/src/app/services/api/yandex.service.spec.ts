import {TestBed} from '@angular/core/testing';

import {YandexService} from './yandex.service';

describe('YandexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YandexService = TestBed.get(YandexService);
    expect(service).toBeTruthy();
  });
});
