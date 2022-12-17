import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardSecondDesignedComponent} from './vineyard-second-designed.component';

describe('VineyardSecondDesignedComponent', () => {
  let component: VineyardSecondDesignedComponent;
  let fixture: ComponentFixture<VineyardSecondDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardSecondDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardSecondDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
