import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BengatContactsComponent} from '@src/app/schemas/bengat-contacts/bengat-contacts.component';

describe('BengatContactsComponent', () => {
  let component: BengatContactsComponent;
  let fixture: ComponentFixture<BengatContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BengatContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BengatContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
