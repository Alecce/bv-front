import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineListNavigationComponent} from './wine-list-navigation.component';

describe('WineListNavigationComponent', () => {
  let component: WineListNavigationComponent;
  let fixture: ComponentFixture<WineListNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineListNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineListNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
