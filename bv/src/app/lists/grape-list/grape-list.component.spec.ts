import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GrapeListComponent} from './grape-list.component';

describe('GrapeListComponent', () => {
  let component: GrapeListComponent;
  let fixture: ComponentFixture<GrapeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
