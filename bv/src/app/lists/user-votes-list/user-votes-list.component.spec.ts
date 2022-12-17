import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UserVotesListComponent} from './user-votes-list.component';

describe('UserVotesListComponent', () => {
  let component: UserVotesListComponent;
  let fixture: ComponentFixture<UserVotesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
