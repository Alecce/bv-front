import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubrouterComponent} from '@src/app/schemas/subrouter/subrouter.component';

describe('SubrouterComponent', () => {
  let component: SubrouterComponent;
  let fixture: ComponentFixture<SubrouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubrouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
