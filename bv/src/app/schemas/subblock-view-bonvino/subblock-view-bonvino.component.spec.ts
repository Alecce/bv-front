import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubblockViewBonvinoComponent} from '@src/app/schemas/subblock-view-bonvino/subblock-view-bonvino.component';

describe('SubblockViewBonvinoComponent', () => {
  let component: SubblockViewBonvinoComponent;
  let fixture: ComponentFixture<SubblockViewBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubblockViewBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubblockViewBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
