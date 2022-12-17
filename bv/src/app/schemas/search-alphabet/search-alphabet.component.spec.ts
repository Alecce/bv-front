import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SearchAlphabetComponent} from './search-alphabet.component';

describe('SearchAlphabetComponent', () => {
  let component: SearchAlphabetComponent;
  let fixture: ComponentFixture<SearchAlphabetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAlphabetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAlphabetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
