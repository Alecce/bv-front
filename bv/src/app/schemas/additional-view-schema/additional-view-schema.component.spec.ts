import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdditionalViewSchemaComponent} from 'additional-view-schema.component';

describe('AdditionalViewSchemaComponent', () => {
  let component: AdditionalViewSchemaComponent;
  let fixture: ComponentFixture<AdditionalViewSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalViewSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalViewSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
