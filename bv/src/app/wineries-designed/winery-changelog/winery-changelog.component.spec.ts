import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WineryChangelogComponent} from '@src/app/wineries-designed/winery-changelog/winery-changelog.component';

describe('WineryChangelogComponent', () => {
  let component: WineryChangelogComponent;
  let fixture: ComponentFixture<WineryChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineryChangelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
