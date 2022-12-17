import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RadioBonvinoComponent} from './radio-bonvino.component';

describe('RadioBonvinoComponent', () => {
  let component: RadioBonvinoComponent;
  let fixture: ComponentFixture<RadioBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
