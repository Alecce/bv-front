import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperimageComponent} from './superimage.component';

describe('SuperimageComponent', () => {
  let component: SuperimageComponent;
  let fixture: ComponentFixture<SuperimageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
