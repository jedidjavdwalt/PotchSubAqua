import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/players.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Player, PlayerData } from 'src/app/models/Player';

@Injectable()
export class PlayersEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) { }

    @Effect()
    GetPlayersByGender$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_PLAYERS_BY_GENDER),
        switchMap((action: actions.RequestGetPlayersByGender) => {
            return this.angularFirestore.collection('/players/', ref => ref
                .where('gender', '==', action.gender)
                .where('ageGroup', '==', action.ageGroup)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetPlayerSuccess(new Player(action.payload.doc.data() as PlayerData));
            }
            return new actions.ClearPlayersState();
        })
    );

    @Effect()
    GetPlayersByAgeGroup$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_PLAYERS_BY_AGE_GROUP),
        switchMap((action: actions.RequestGetPlayersByAgeGroup) => {
            return this.angularFirestore.collection
                ('/players/', ref => ref.where('ageGroup', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetPlayerSuccess(new Player(action.payload.doc.data() as PlayerData));
            }
            return new actions.ClearPlayersState();
        })
    );

    @Effect()
    GetAllPlayers$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_PLAYERS),
        switchMap((action: actions.RequestGetAllPlayers) => {
            return this.angularFirestore.collection
                ('/players/').stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetPlayerSuccess(new Player(action.payload.doc.data() as PlayerData));
            }
            return new actions.ClearPlayersState();
        })
    );
}
