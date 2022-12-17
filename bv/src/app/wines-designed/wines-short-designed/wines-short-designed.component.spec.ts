import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WinesShortDesignedComponent} from 'wines-short-designed.component';

describe('WinesShortDesignedComponent', () => {
  let component: WinesShortDesignedComponent;
  let fixture: ComponentFixture<WinesShortDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinesShortDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinesShortDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
