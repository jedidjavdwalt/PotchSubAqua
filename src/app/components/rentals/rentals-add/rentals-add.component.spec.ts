import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsAddComponent } from './rentals-add.component';

describe('RentalsAddComponent', () => {
  let component: RentalsAddComponent;
  let fixture: ComponentFixture<RentalsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
