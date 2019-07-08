import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as actions from '../../store/actions/users.actions';
import * as usersSelectors from '../../store/selectors/users.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  login() {
    this.userService.login();
    // this.router.navigateByUrl('dashboard');
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
