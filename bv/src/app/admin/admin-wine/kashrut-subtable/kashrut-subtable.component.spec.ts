import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {KashrutSubtableComponent} from './kashrut-subtable.component';

describe('KashrutSubtableComponent', () => {
  let component: KashrutSubtableComponent;
  let fixture: ComponentFixture<KashrutSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KashrutSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KashrutSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
