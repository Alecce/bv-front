import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VeganWinerySubtableComponent} from './vegan-winery-subtable.component';

describe('VeganWinerySubtableComponent', () => {
  let component: VeganWinerySubtableComponent;
  let fixture: ComponentFixture<VeganWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VeganWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeganWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
