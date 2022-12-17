import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BottleListComponent} from './bottle-list.component';

describe('BottleListComponent', () => {
  let component: BottleListComponent;
  let fixture: ComponentFixture<BottleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
