import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyCardsComponent } from './all-company-cards.component';

describe('AllCompanyCardsComponent', () => {
  let component: AllCompanyCardsComponent;
  let fixture: ComponentFixture<AllCompanyCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCompanyCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompanyCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
