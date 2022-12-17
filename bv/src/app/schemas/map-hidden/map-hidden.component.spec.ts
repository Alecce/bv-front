import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapHiddenComponent} from '@src/app/schemas/map-hidden/map-hidden.component';

describe('MapHiddenComponent', () => {
  let component: MapHiddenComponent;
  let fixture: ComponentFixture<MapHiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHiddenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
