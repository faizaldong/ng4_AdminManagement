import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyCardComponent } from './add-company-card.component';

describe('AddCompanyCardComponent', () => {
  let component: AddCompanyCardComponent;
  let fixture: ComponentFixture<AddCompanyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
