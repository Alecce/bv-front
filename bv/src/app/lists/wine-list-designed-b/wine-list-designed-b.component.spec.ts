import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineListDesignedBComponent} from './wine-list-designed-b.component';

describe('WineListDesignedBComponent', () => {
  let component: WineListDesignedBComponent;
  let fixture: ComponentFixture<WineListDesignedBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineListDesignedBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineListDesignedBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
