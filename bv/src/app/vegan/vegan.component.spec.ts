import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VeganComponent} from './vegan.component';

describe('VeganComponent', () => {
  let component: VeganComponent;
  let fixture: ComponentFixture<VeganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VeganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
