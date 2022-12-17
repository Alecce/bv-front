import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PlaceOfOriginComponent} from './place-of-origin.component';

describe('PlaceOfOriginComponent', () => {
  let component: PlaceOfOriginComponent;
  let fixture: ComponentFixture<PlaceOfOriginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceOfOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOfOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
