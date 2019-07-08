import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/users.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserData } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
        private angularFireAuth: AngularFireAuth,
        private usersService: UsersService,
    ) { }

    @Effect()
    RequestGetUser$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_USER),
        switchMap((action: actions.RequestGetUser) => {
            return this.angularFirestore.collection('/users/').doc(action.payload).get();
        }),
        map(user => {
            if (user) {
                return new actions.GetUserSuccess(new User(user.data() as UserData));
            }
            return new actions.UnimplementedAction();
        })
    );
}
