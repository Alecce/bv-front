import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesSimplestoreSubscreenComponent} from './wines-simplestore-subscreen.component';

describe('WinesSimplestoreSubscreenComponent', () => {
  let component: WinesSimplestoreSubscreenComponent;
  let fixture: ComponentFixture<WinesSimplestoreSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesSimplestoreSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesSimplestoreSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
