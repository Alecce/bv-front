import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IconBonvinoComponent} from './icon-bonvino.component';

describe('IconBonvinoComponent', () => {
  let component: IconBonvinoComponent;
  let fixture: ComponentFixture<IconBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IconBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
