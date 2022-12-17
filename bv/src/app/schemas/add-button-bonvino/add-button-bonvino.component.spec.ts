import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonBonvinoComponent } from './add-button-bonvino.component';

describe('AddButtonBonvinoComponent', () => {
  let component: AddButtonBonvinoComponent;
  let fixture: ComponentFixture<AddButtonBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddButtonBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
