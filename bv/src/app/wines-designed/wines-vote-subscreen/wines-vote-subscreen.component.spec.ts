import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesVoteSubscreenComponent} from './wines-vote-subscreen.component';

describe('WinesVoteSubscreenComponent', () => {
  let component: WinesVoteSubscreenComponent;
  let fixture: ComponentFixture<WinesVoteSubscreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesVoteSubscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesVoteSubscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
