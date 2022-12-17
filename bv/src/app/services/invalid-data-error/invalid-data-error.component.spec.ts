import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InvalidDataErrorComponent} from './invalid-data-error.component';

describe('InvalidDataErrorComponent', () => {
  let component: InvalidDataErrorComponent;
  let fixture: ComponentFixture<InvalidDataErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidDataErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidDataErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
