import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryShortSubscreenComponent} from '@src/app/wineries-designed/winery-short-subscreen/winery-short-subscreen.component';

describe('WineryShortSubscreenComponent', () => {
  let component: WineryShortSubscreenComponent;
  let fixture: ComponentFixture<WineryShortSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryShortSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryShortSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
