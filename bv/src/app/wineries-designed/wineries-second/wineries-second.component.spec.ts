import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineriesSecondComponent} from '@src/app/wineries-designed/wineries-second/wineries-second.component';

describe('WineriesSecondComponent', () => {
  let component: WineriesSecondComponent;
  let fixture: ComponentFixture<WineriesSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineriesSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineriesSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
