import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MapSubtableComponent} from './map-subtable.component';

describe('MapSubtableComponent', () => {
  let component: MapSubtableComponent;
  let fixture: ComponentFixture<MapSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
