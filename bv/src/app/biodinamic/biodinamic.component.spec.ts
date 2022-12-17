import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BiodinamicComponent} from './biodinamic.component';

describe('BiodinamicComponent', () => {
  let component: BiodinamicComponent;
  let fixture: ComponentFixture<BiodinamicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiodinamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
