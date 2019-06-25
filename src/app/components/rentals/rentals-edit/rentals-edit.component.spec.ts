import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsEditComponent } from './rentals-edit.component';

describe('RentalsEditComponent', () => {
  let component: RentalsEditComponent;
  let fixture: ComponentFixture<RentalsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
