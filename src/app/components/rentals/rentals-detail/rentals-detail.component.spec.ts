import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsDetailComponent } from './rentals-detail.component';

describe('RentalsDetailComponent', () => {
  let component: RentalsDetailComponent;
  let fixture: ComponentFixture<RentalsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
