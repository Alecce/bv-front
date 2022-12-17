import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {KashrutListComponent} from './kashrut-list.component';

describe('KashrutListComponent', () => {
  let component: KashrutListComponent;
  let fixture: ComponentFixture<KashrutListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KashrutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KashrutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
