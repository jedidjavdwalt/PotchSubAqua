import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import * as actions from '../../store/actions/snorkel.actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { InventoryItem, InventoryItemData } from 'src/app/models/InventoryItem';

@Injectable()
export class SnorkelEffects {

    constructor(
        private actions$: Actions,
        private angularFirestore: AngularFirestore,
    ) {

    }

    @Effect()
    GetAllSnorkels$ = this.actions$.pipe(
        ofType(actions.REQUEST_GET_ALL_SNORKELS),
        switchMap((action: actions.RequestGetAllSnorkels) => {
            return this.angularFirestore.collection
                ('inventory', ref => ref.where('type', '==', 'Snorkel').orderBy('number')).stateChanges();
        }),
        mergeMap(actions => actions),
        map(action => {
            if (action.type === 'added') {
                return new actions.GetSnorkelSuccess(new InventoryItem(action.payload.doc.data() as InventoryItemData));
            }
            return new actions.GetSnorkelError();
        })
    );
}
