import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlassBonvinoComponent} from './glass-bonvino.component';

describe('GlassBonvinoComponent', () => {
  let component: GlassBonvinoComponent;
  let fixture: ComponentFixture<GlassBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
