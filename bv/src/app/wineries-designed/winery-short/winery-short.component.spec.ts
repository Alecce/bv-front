import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryShortComponent} from '@src/app/wineries-designed/winery-short/winery-short.component';

describe('WineryShortComponent', () => {
  let component: WineryShortComponent;
  let fixture: ComponentFixture<WineryShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
