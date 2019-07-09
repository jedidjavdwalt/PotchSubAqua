import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/users.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserData } from 'src/app/models/User';
import * as firebase from 'firebase';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
        private angularFireAuth: AngularFireAuth,
    ) { }

    @Effect()
    LoginUser$ = this.actions$.pipe(
        ofType(actions.LOGIN_USER),
        switchMap((action: actions.LoginUser) => {
            return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(userCredential => new actions.GetUser(userCredential.user.uid))
                .catch(error => alert(error));
        })
    );

    @Effect()
    GetUser$ = this.actions$.pipe(
        ofType(actions.GET_USER),
        switchMap((action: actions.GetUser) => {
            return this.angularFirestore.collection('/users/').doc(action.payload).get();
        }),
        map(user => {
            if (user) {
                return new actions.SetUser(new User(user.data() as UserData));
            }
            return new actions.UnimplementedAction();
        })
    );

    @Effect()
    LogoutUser$ = this.actions$.pipe(
        ofType(actions.LOGOUT_USER),
        switchMap((action: actions.LogoutUser) => {
            return this.angularFireAuth.auth.signOut()
                .then(result => new actions.RemoveUser())
                .catch(error => alert(error));
        })
    );
}
