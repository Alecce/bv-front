import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlocksConstructorComponent} from '@src/app/admin/blocks-constructor/blocks-constructor.component';

describe('BlocksConstructorComponent', () => {
  let component: BlocksConstructorComponent;
  let fixture: ComponentFixture<BlocksConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksConstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
