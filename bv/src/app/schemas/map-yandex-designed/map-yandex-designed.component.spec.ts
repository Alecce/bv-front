import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MapYandexDesignedComponent} from './map-yandex-designed.component';

describe('MapYandexDesignedComponent', () => {
  let component: MapYandexDesignedComponent;
  let fixture: ComponentFixture<MapYandexDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapYandexDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapYandexDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
