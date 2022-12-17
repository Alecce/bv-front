import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MapGoogleDesignedComponent} from './map-google-designed.component';

describe('MapGoogleDesignedComponent', () => {
  let component: MapGoogleDesignedComponent;
  let fixture: ComponentFixture<MapGoogleDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapGoogleDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGoogleDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
