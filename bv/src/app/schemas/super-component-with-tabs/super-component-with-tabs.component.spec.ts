import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SuperComponentWithTabsComponent} from './super-component-with-tabs.component';

describe('SuperComponentWithTabsComponent', () => {
  let component: SuperComponentWithTabsComponent;
  let fixture: ComponentFixture<SuperComponentWithTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperComponentWithTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperComponentWithTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
