import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdditionalListDesignedComponent} from '@src/app/lists/additional-list-designed/additional-list-designed.component';

describe('AdditionalListDesignedComponent', () => {
  let component: AdditionalListDesignedComponent;
  let fixture: ComponentFixture<AdditionalListDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalListDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalListDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
