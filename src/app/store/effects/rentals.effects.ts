import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/rentals.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Rental, RentalData } from 'src/app/models/Rental';

@Injectable()
export class RentalsEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) { }

    @Effect()
    GetRentalByActionRequired$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_RENTALS_BY_ACTION_REQUIRED),
        switchMap((action: actions.RequestGetRentalsByActionRequired) => {
            return this.angularFirestore.collection('/rentals/', ref => ref
                .where('actionRequired', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetRentalSuccess(new Rental(action.payload.doc.data() as RentalData));
            }
            return new actions.ClearRentalsState();
        })
    );

    @Effect()
    GetRentalByType$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_RENTALS_BY_TYPE),
        switchMap((action: actions.RequestGetRentalsByType) => {
            return this.angularFirestore.collection
                ('/rentals/', ref => ref.where('type', '==', action.payload)).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetRentalSuccess(new Rental(action.payload.doc.data() as RentalData));
            }
            return new actions.ClearRentalsState();
        })
    );
}
