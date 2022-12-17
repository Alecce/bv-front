import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdditionalSearchSchemaComponent} from '@src/app/schemas/additional-search-schema/additional-search-schema.component';

describe('AdditionalSearchSchemaComponent', () => {
  let component: AdditionalSearchSchemaComponent;
  let fixture: ComponentFixture<AdditionalSearchSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalSearchSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalSearchSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
