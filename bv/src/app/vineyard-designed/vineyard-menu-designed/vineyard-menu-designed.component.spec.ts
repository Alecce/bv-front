import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardMenuDesignedComponent} from '@src/app/vineyard-designed/vineyard-menu-designed/vineyard-menu-designed.component';

describe('VineyardMenuDesignedComponent', () => {
  let component: VineyardMenuDesignedComponent;
  let fixture: ComponentFixture<VineyardMenuDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardMenuDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardMenuDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
