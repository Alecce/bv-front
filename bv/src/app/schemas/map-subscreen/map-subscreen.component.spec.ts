import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapSubscreenComponent} from '@src/app/schemas/map-subscreen/map-subscreen.component';

describe('MapSubscreenComponent', () => {
  let component: MapSubscreenComponent;
  let fixture: ComponentFixture<MapSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
