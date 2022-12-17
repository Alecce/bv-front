import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuSchemaComponent} from 'menu-schema.component';

describe('MenuSchemaComponent', () => {
  let component: MenuSchemaComponent;
  let fixture: ComponentFixture<MenuSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
