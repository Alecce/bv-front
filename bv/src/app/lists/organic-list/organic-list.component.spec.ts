import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrganicListComponent} from './organic-list.component';

describe('OrganicListComponent', () => {
  let component: OrganicListComponent;
  let fixture: ComponentFixture<OrganicListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
