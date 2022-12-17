import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SearcherBonvinoComponent} from './searcher-bonvino.component';

describe('SearcherBonvinoComponent', () => {
  let component: SearcherBonvinoComponent;
  let fixture: ComponentFixture<SearcherBonvinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcherBonvinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcherBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
