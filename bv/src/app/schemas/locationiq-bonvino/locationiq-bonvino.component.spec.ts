import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationiqBonvinoComponent} from './locationiq-bonvino.component';

describe('LocationiqBonvinoComponent', () => {
  let component: LocationiqBonvinoComponent;
  let fixture: ComponentFixture<LocationiqBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationiqBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationiqBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
