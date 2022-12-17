import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BiodinamicListComponent} from './biodinamic-list.component';

describe('BiodinamicListComponent', () => {
  let component: BiodinamicListComponent;
  let fixture: ComponentFixture<BiodinamicListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiodinamicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodinamicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
