import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineDescriptionComponent} from '@src/app/wines-designed/wine-description/wine-description.component';

describe('WineDescriptionComponent', () => {
  let component: WineDescriptionComponent;
  let fixture: ComponentFixture<WineDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
