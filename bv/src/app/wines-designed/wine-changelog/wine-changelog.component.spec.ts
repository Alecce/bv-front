import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineChangelogComponent} from '@src/app/wines-designed/wine-changelog/wine-changelog.component';

describe('WineChangelogComponent', () => {
  let component: WineChangelogComponent;
  let fixture: ComponentFixture<WineChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineChangelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
