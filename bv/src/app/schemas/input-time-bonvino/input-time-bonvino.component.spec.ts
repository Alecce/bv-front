import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InputTimeBonvinoComponent} from './input-time-bonvino.component';

describe('InputTimeBonvinoComponent', () => {
  let component: InputTimeBonvinoComponent;
  let fixture: ComponentFixture<InputTimeBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTimeBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimeBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
