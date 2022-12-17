import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WineOneSubscreenComponent} from './wine-one-subscreen.component';

describe('WineOneSubscreenComponent', () => {
  let component: WineOneSubscreenComponent;
  let fixture: ComponentFixture<WineOneSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WineOneSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineOneSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
