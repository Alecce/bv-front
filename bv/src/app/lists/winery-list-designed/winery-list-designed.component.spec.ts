import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryListDesignedComponent} from '@src/app/lists/winery-list-designed/winery-list-designed.component';

describe('WineryListDesignedComponent', () => {
  let component: WineryListDesignedComponent;
  let fixture: ComponentFixture<WineryListDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryListDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryListDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
