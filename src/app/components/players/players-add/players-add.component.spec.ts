import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersAddComponent } from './players-add.component';

describe('PlayersAddComponent', () => {
  let component: PlayersAddComponent;
  let fixture: ComponentFixture<PlayersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
