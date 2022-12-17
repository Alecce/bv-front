import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TemperatureInputBonvinoComponent} from '@src/app/schemas/temperature-input-bonvino/temperature-input-bonvino.component';

describe('TemperatureInputBonvinoComponent', () => {
  let component: TemperatureInputBonvinoComponent;
  let fixture: ComponentFixture<TemperatureInputBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureInputBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureInputBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
