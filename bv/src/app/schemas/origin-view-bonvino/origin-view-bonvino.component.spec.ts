import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OriginViewBonvinoComponent} from '@src/app/schemas/origin-view-bonvino/origin-view-bonvino.component';

describe('OriginViewBonvinoComponent', () => {
  let component: OriginViewBonvinoComponent;
  let fixture: ComponentFixture<OriginViewBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginViewBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginViewBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
