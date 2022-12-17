import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SupermapOpenLayersComponent} from './supermap-open-layers.component';

describe('SupermapOpenLayersComponent', () => {
  let component: SupermapOpenLayersComponent;
  let fixture: ComponentFixture<SupermapOpenLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupermapOpenLayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupermapOpenLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
