import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineDescriptionSubscreenComponent} from '@src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component';

describe('WineDescriptionSubscreenComponent', () => {
  let component: WineDescriptionSubscreenComponent;
  let fixture: ComponentFixture<WineDescriptionSubscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineDescriptionSubscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDescriptionSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
