import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardCreateDesignedComponent} from '@src/app/vineyard-designed/vineyard-create-designed/vineyard-create-designed.component';

describe('VineyardCreateDesignedComponent', () => {
  let component: VineyardCreateDesignedComponent;
  let fixture: ComponentFixture<VineyardCreateDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardCreateDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardCreateDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
