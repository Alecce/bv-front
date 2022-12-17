import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginInputBonvinoComponent} from '@src/app/schemas/origin-input-bonvino/origin-input-bonvino.component';

describe('OriginInputBonvinoComponent', () => {
  let component: OriginInputBonvinoComponent;
  let fixture: ComponentFixture<OriginInputBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginInputBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginInputBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
