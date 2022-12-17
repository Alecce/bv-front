import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SpecialistSubscreenComponent} from './specialist-subscreen.component';

describe('SpecialistSubscreenComponent', () => {
  let component: SpecialistSubscreenComponent;
  let fixture: ComponentFixture<SpecialistSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
