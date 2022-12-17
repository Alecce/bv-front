import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ImageSubtableComponent} from './image-subtable.component';

describe('ImageSubtableComponent', () => {
  let component: ImageSubtableComponent;
  let fixture: ComponentFixture<ImageSubtableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSubtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSubtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
