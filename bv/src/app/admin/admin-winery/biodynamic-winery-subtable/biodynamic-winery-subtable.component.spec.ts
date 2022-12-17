import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BiodynamicWinerySubtableComponent} from './biodynamic-winery-subtable.component';

describe('BiodynamicWinerySubtableComponent', () => {
  let component: BiodynamicWinerySubtableComponent;
  let fixture: ComponentFixture<BiodynamicWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiodynamicWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodynamicWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
