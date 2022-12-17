import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GrapesWinerySubtableComponent} from './grapes-winery-subtable.component';

describe('GrapesWinerySubtableComponent', () => {
  let component: GrapesWinerySubtableComponent;
  let fixture: ComponentFixture<GrapesWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapesWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapesWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
