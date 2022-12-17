import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ScrollBonvinoComponent} from './scroll-bonvino.component';

describe('ScrollBonvinoComponent', () => {
  let component: ScrollBonvinoComponent;
  let fixture: ComponentFixture<ScrollBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
