import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryDeletedComponent} from '@src/app/wineries-designed/winery-deleted/winery-deleted.component';

describe('WineryDeletedComponent', () => {
  let component: WineryDeletedComponent;
  let fixture: ComponentFixture<WineryDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryDeletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
