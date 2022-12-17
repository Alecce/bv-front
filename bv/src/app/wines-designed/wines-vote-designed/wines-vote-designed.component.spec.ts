import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WinesVoteDesignedComponent} from './wines-vote-designed.component';

describe('WinesVoteDesignedComponent', () => {
  let component: WinesVoteDesignedComponent;
  let fixture: ComponentFixture<WinesVoteDesignedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WinesVoteDesignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesVoteDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
