import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PopUpBonvinoComponent} from 'pop-up-bonvino.component';

describe('PopUpBonvinoComponent', () => {
  let component: PopUpBonvinoComponent;
  let fixture: ComponentFixture<PopUpBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
