import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VeganListComponent} from './vegan-list.component';

describe('VeganListComponent', () => {
  let component: VeganListComponent;
  let fixture: ComponentFixture<VeganListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VeganListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeganListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
