import { TestBed, async, inject } from '@angular/core/testing';

import { AppRoutingGuard } from './app-routing.guard';

describe('AppRoutingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppRoutingGuard]
    });
  });

  it('should ...', inject([AppRoutingGuard], (guard: AppRoutingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
