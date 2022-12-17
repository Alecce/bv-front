import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineAutodecriptionComponent} from '@src/app/wines-designed/wine-autodecription/wine-autodecription.component';

describe('WineAutodecriptionComponent', () => {
  let component: WineAutodecriptionComponent;
  let fixture: ComponentFixture<WineAutodecriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineAutodecriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineAutodecriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
