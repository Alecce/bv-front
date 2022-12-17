import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperformComponent} from './superform.component';

describe('SuperformComponent', () => {
  let component: SuperformComponent;
  let fixture: ComponentFixture<SuperformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
