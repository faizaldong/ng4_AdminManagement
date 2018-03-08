import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpObservableComponent } from './http-observable.component';

describe('HttpObservableComponent', () => {
  let component: HttpObservableComponent;
  let fixture: ComponentFixture<HttpObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
