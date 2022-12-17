import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineOneUniversalComponent} from '@src/app/wines-designed/wine-one-universal/wine-one-universal.component';

describe('WineOneUniversalComponent', () => {
  let component: WineOneUniversalComponent;
  let fixture: ComponentFixture<WineOneUniversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineOneUniversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineOneUniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
