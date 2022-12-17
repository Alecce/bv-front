import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SupermapGoogleComponent} from './supermap-google.component';

describe('SupermapGoogleComponent', () => {
  let component: SupermapGoogleComponent;
  let fixture: ComponentFixture<SupermapGoogleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupermapGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupermapGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
