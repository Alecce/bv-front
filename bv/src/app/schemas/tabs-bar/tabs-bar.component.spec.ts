import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TabsBarComponent} from '@src/app/schemas/tabs-bar/tabs-bar.component';

describe('TabsBarComponent', () => {
  let component: TabsBarComponent;
  let fixture: ComponentFixture<TabsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
