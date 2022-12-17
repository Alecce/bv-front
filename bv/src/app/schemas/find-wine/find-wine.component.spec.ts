import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FindWineComponent} from '@src/app/schemas/find-wine/find-wine.component';

describe('FindWineComponent', () => {
  let component: FindWineComponent;
  let fixture: ComponentFixture<FindWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
