import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as actions from '../../store/actions/users.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private angularFirestore: AngularFirestore,
  ) { }

  login() {
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.store.dispatch(new actions.RequestGetUser(result.user.uid));
      })
      .catch(error => {
        alert(error);
      });
  }

  logout() {
    return this.angularFireAuth.auth.signOut()
      .then(result => {
        this.store.dispatch(new actions.ClearLoggedInUser());
      })
      .catch(error => {
        alert(error);
      });
  }
}
