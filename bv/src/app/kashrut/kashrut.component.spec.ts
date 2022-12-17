import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {KashrutComponent} from './kashrut.component';

describe('KashrutComponent', () => {
  let component: KashrutComponent;
  let fixture: ComponentFixture<KashrutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KashrutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KashrutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
