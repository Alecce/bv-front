import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuMobileBonvinoComponent} from './menu-mobile-bonvino.component';

describe('MenuMobileBonvinoComponent', () => {
  let component: MenuMobileBonvinoComponent;
  let fixture: ComponentFixture<MenuMobileBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMobileBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMobileBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
