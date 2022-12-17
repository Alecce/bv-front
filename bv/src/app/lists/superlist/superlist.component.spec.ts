import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperlistComponent} from './superlist.component';

describe('SuperlistComponent', () => {
  let component: SuperlistComponent;
  let fixture: ComponentFixture<SuperlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
