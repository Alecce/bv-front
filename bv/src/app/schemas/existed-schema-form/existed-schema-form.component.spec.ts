import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExistedSchemaFormComponent} from '@src/app/schemas/existed-schema-form/existed-schema-form.component';

describe('ExistedSchemaFormComponent', () => {
  let component: ExistedSchemaFormComponent;
  let fixture: ComponentFixture<ExistedSchemaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistedSchemaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistedSchemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
