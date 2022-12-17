import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {KashrutWinerySubtableComponent} from './kashrut-winery-subtable.component';

describe('KashrutWinerySubtableComponent', () => {
  let component: KashrutWinerySubtableComponent;
  let fixture: ComponentFixture<KashrutWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KashrutWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KashrutWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
