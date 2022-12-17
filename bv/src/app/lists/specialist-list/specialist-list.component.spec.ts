import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SpecialistListComponent} from './specialist-list.component';

describe('SpecialistListComponent', () => {
  let component: SpecialistListComponent;
  let fixture: ComponentFixture<SpecialistListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
