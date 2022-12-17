import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryHistoryComponent} from '@src/app/wineries-designed/winery-history/winery-history.component';

describe('WineryHistoryComponent', () => {
  let component: WineryHistoryComponent;
  let fixture: ComponentFixture<WineryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
