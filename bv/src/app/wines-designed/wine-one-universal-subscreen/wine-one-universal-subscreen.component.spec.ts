import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineOneUniversalSubscreenComponent} from '@src/app/wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component';

describe('WineOneUniversalSubscreenComponent', () => {
  let component: WineOneUniversalSubscreenComponent;
  let fixture: ComponentFixture<WineOneUniversalSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineOneUniversalSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineOneUniversalSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
