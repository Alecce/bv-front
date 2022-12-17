import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganicSubtableComponent} from './organic-subtable.component';

describe('OrganicSubtableComponent', () => {
  let component: OrganicSubtableComponent;
  let fixture: ComponentFixture<OrganicSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
