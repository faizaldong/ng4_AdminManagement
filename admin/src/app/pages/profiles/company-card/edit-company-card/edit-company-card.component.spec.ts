import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyCardComponent } from './edit-company-card.component';

describe('EditCompanyCardComponent', () => {
  let component: EditCompanyCardComponent;
  let fixture: ComponentFixture<EditCompanyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
