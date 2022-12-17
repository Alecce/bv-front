import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardBasicDesignedComponent} from '@src/app/vineyard-designed/vineyard-basic-designed/vineyard-basic-designed.component';

describe('VineyardBasicDesignedComponent', () => {
  let component: VineyardBasicDesignedComponent;
  let fixture: ComponentFixture<VineyardBasicDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardBasicDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardBasicDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
