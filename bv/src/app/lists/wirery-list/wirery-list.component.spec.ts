import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WireryListComponent} from './wirery-list.component';

describe('WireryListComponent', () => {
  let component: WireryListComponent;
  let fixture: ComponentFixture<WireryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WireryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WireryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
