import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextComplicatedComponent} from '@src/app/language/text-complicated/text-complicated.component';

describe('TextComplicatedComponent', () => {
  let component: TextComplicatedComponent;
  let fixture: ComponentFixture<TextComplicatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextComplicatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComplicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
