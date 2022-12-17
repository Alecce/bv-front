import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {VineyardWinerySubtableComponent} from './vineyard-winery-subtable.component';

describe('VineyardWinerySubtableComponent', () => {
  let component: VineyardWinerySubtableComponent;
  let fixture: ComponentFixture<VineyardWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VineyardWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
