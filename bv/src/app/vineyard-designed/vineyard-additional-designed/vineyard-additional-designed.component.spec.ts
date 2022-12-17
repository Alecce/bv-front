import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardAdditionalDesignedComponent} from '@src/app/vineyard-designed/vineyard-additional-designed/vineyard-additional-designed.component';

describe('VineyardAdditionalDesignedComponent', () => {
  let component: VineyardAdditionalDesignedComponent;
  let fixture: ComponentFixture<VineyardAdditionalDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardAdditionalDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardAdditionalDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
