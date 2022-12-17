import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdditionalSchemaComponent} from 'additional-schema.component';

describe('AdditionalSchemaComponent', () => {
  let component: AdditionalSchemaComponent;
  let fixture: ComponentFixture<AdditionalSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
