import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AwardOneRowComponent} from '@src/app/schemas/award-one-row/award-one-row.component';

describe('AwardOneRowComponent', () => {
  let component: AwardOneRowComponent;
  let fixture: ComponentFixture<AwardOneRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardOneRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardOneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
