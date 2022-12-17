import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonRowComponent} from '@src/app/schemas/button-row/button-row.component';

describe('ButtonRowComponent', () => {
  let component: ButtonRowComponent;
  let fixture: ComponentFixture<ButtonRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
