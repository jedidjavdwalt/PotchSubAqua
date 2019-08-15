import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as usersActions from '../../store/actions/users.actions';
import * as usersSelectors from '../../store/selectors/users.selectors';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  navigateHome() {
    this.router.navigateByUrl('home');
  }

  loginClicked() {
    this.store.dispatch(new usersActions.LoginUser());
  }

  sliceAppState() {
    this.store.select(usersSelectors.loggedInUser).subscribe(loggedInUser => {
      if (loggedInUser) {
        this.router.navigateByUrl('dashboard');
      }
    });
  }

  ngOnInit() {
    this.sliceAppState();
  }
}
