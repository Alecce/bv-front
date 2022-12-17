import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VineyardSubtableComponent} from './vineyard-subtable.component';

describe('VineyardSubtableComponent', () => {
  let component: VineyardSubtableComponent;
  let fixture: ComponentFixture<VineyardSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VineyardSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
