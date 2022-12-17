import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonOneRowComponent} from '@src/app/schemas/person-one-row/person-one-row.component';

describe('PersonOneRowComponent', () => {
  let component: PersonOneRowComponent;
  let fixture: ComponentFixture<PersonOneRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonOneRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonOneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
