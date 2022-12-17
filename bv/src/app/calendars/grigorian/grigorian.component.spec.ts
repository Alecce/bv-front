import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GrigorianComponent} from './grigorian.component';

describe('GrigorianComponent', () => {
  let component: GrigorianComponent;
  let fixture: ComponentFixture<GrigorianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrigorianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrigorianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
