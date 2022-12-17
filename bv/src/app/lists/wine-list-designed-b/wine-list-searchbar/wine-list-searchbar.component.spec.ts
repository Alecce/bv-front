import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineListSearchbarComponent} from './wine-list-searchbar.component';

describe('WineListSearchbarComponent', () => {
  let component: WineListSearchbarComponent;
  let fixture: ComponentFixture<WineListSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineListSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineListSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
