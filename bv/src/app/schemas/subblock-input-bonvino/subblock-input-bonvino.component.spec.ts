import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubblockInputBonvinoComponent} from '@src/app/schemas/subblock-input-bonvino/subblock-input-bonvino.component';

describe('SubblockInputBonvinoComponent', () => {
  let component: SubblockInputBonvinoComponent;
  let fixture: ComponentFixture<SubblockInputBonvinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubblockInputBonvinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubblockInputBonvinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
