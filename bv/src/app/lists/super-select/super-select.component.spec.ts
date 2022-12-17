import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperSelectComponent} from './super-select.component';

describe('SuperSelectComponent', () => {
  let component: SuperSelectComponent;
  let fixture: ComponentFixture<SuperSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
