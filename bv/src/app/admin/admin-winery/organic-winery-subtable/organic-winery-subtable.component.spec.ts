import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganicWinerySubtableComponent} from './organic-winery-subtable.component';

describe('OrganicWinerySubtableComponent', () => {
  let component: OrganicWinerySubtableComponent;
  let fixture: ComponentFixture<OrganicWinerySubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicWinerySubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicWinerySubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
