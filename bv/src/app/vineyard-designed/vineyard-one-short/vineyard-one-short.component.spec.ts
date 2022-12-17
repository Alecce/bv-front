import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VineyardOneShortComponent} from './vineyard-one-short.component';

describe('VineyardOneShortComponent', () => {
  let component: VineyardOneShortComponent;
  let fixture: ComponentFixture<VineyardOneShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VineyardOneShortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VineyardOneShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
