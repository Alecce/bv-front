import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineriesMenuComponent} from './wineries-menu.component';

describe('WineriesMenuComponent', () => {
  let component: WineriesMenuComponent;
  let fixture: ComponentFixture<WineriesMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineriesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineriesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
