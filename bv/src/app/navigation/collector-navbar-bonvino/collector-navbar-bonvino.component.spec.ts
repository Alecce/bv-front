import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectorNavbarBonvinoComponent} from './collector-navbar-bonvino.component';

describe('CollectorNavbarBonvinoComponent', () => {
  let component: CollectorNavbarBonvinoComponent;
  let fixture: ComponentFixture<CollectorNavbarBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorNavbarBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorNavbarBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
