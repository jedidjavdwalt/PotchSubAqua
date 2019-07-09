import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import * as userSelectors from './store/selectors/users.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin();
  }

  checkLogin(): Observable<boolean> {
    return this.store.select(userSelectors.loggedInUser).pipe(
      map(loggedInUser => {
        if (loggedInUser) {
          return true;
        } else {
          this.router.navigateByUrl('home');
          return false;
        }
      })
    );
  }
}
