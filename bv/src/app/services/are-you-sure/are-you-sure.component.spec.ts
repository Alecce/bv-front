import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AreYouSureComponent} from './are-you-sure.component';

describe('AreYouSureComponent', () => {
  let component: AreYouSureComponent;
  let fixture: ComponentFixture<AreYouSureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreYouSureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreYouSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
