import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardOneDesignedComponent} from '@src/app/vineyard-designed/vineyard-one-designed/vineyard-one-designed.component';

describe('VineyardOneDesignedComponent', () => {
  let component: VineyardOneDesignedComponent;
  let fixture: ComponentFixture<VineyardOneDesignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardOneDesignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardOneDesignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
